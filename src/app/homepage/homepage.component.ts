import { Component } from '@angular/core';
import { PlatformModule } from '@angular/cdk/platform';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,MatTooltipModule,PlatformModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {

}
