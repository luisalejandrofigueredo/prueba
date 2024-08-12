import { Component, HostBinding, inject, OnInit, Optional } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ChildrenOutletContexts, RouterLink, RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { DarkModeService } from '../services/dark-mode.service';
import { animate, group, query, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    OverlayModule,
    AsyncPipe,
  ],
  animations: [
    trigger('routerTransition', [
      transition('* <=> *', [    
        query(':enter, :leave',style({ position: 'fixed', width:'100%' }),{optional: true}),
        group([ 
          query(':enter',[
            style({ transform: 'translateX(100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
          ],{optional: true}),
          query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))],{optional: true}),
        ])
      ])
    ])
   ]
})
export class NavigationComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  slide_toggle = new FormControl(false);
  light_class = 'theme-light';
  dark_class = 'theme-dark'
  @HostBinding('class') className = '';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private overlay: OverlayContainer, private darkModeService: DarkModeService,public contexts: ChildrenOutletContexts) { 
    this.className='theme-light';
  }
  ngOnInit(): void {
    this.slide_toggle.valueChanges.subscribe((currentMode) => {
      this.darkModeService.ChangeColor(currentMode!);
    })
    this.slide_toggle.setValue(this.darkModeService.getCurrentColor());
  }
  ngOnDestroy(): void {
    this.darkModeService.miEventoSubject.unsubscribe();
  }
  getState(outlet:any) {
    // Changing the activatedRouteData.state triggers the animation
    return outlet.activatedRouteData.state;
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['state'];
  }

}
