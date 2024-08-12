import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationComponent } from "./navigation/navigation.component";
import { DarkModeService } from "./services/dark-mode.service";
import { DOCUMENT } from '@angular/common';

import { FullscreenOverlayContainer, OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { animate, group, query, style, transition, trigger } from '@angular/animations';
const LIN=
  `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 512 512" viewBox="0 0 512 512" id="linkedin"><path fill="currentColor" d="M464.1,16H47.9C30.3,16,16,30.3,16,47.9v416.1c0,17.6,14.3,31.9,31.9,31.9h416.1c17.6,0,31.9-14.3,31.9-31.9
		V47.9C496,30.3,481.7,16,464.1,16z M171.8,426.6H96.8V214.5h74.9V426.6z M134.3,157.6c-20.7,0-37.5-16.8-37.5-37.5
		c0-20.7,16.8-37.5,37.5-37.5c20.7,0,37.5,16.8,37.5,37.5C171.8,140.8,155,157.6,134.3,157.6z M431.3,429.3h-74.9v-88
		c0-15.2-12.3-27.4-27.4-27.4c-15.1,0-27.4,12.3-27.4,27.4v85.3h-74.9V214.5h74.9v42.1c7.9-3.7,16-6.8,24.4-9
		c15.5-4.2,31.6-5.2,47.4-2.8c10.6,1.6,21.8,4.3,31.1,9.7c16.6,9.7,26.8,29.1,26.8,48.2C431.3,302.6,431.3,429.3,431.3,429.3z"></path></svg>
`;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavigationComponent, OverlayModule],
  providers: [{ provide: OverlayContainer, useClass: FullscreenOverlayContainer }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'luisfigueredo_ssr';
  light_class = 'light-theme';
  dark_class = 'dark-theme';
  @HostBinding('class') className = 'light-theme';
  constructor(@Inject(DOCUMENT) private document: Document,private darkModeService: DarkModeService, private overlay: OverlayContainer,private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIconLiteral('lin', sanitizer.bypassSecurityTrustHtml(LIN));
  }
  ngOnInit(): void {
    this.darkModeService.miEventoSubject.subscribe((changeTo) => {
      this.className = changeTo ? this.dark_class : this.light_class;
      if (changeTo === true) {
        this.overlay.getContainerElement().classList.add(this.dark_class);
        this.document.body.style.backgroundColor = "#8A98EB";

      }
      else {
        this.overlay.getContainerElement().classList.add(this.light_class);
        this.overlay.getContainerElement().classList.remove(this.dark_class);
        this.document.body.style.backgroundColor = "#8A98EB";
      }
    })
    if (typeof (this.document as any).defaultView.matchMedia !== 'undefined' &&
      (this.document as any).defaultView.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.darkModeService.ChangeColor(true);
    }
  }
  getIconUrl(iconName: string): string {
    return `${iconName}`; // Adjust path as needed
  }

  ngOnDestroy(): void {
    this.darkModeService.miEventoSubject.unsubscribe();
  }

  getState(outlet:any) {
    // Changing the activatedRouteData.state triggers the animation
    return outlet.activatedRouteData.state;
  }
}
