import { Routes } from '@angular/router';
import { HomepageComponent } from "./homepage/homepage.component";
import { SkillsComponent } from "./skills/skills.component";
import { DegreesComponent } from "./degrees/degrees.component";
import { ExperienceComponent } from "./experience/experience.component";
import { AboutComponent } from './about/about.component';
import { NgGdComponent } from './ng-gd/ng-gd.component';
import { TableSkillsComponent } from "./table-skills/table-skills.component";
export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { component: HomepageComponent, path: 'home', data: { state: 'home' } },
    { component: TableSkillsComponent, path: 'skills', data: { state: 'skills' } },
    { component: DegreesComponent, path: 'degrees', data: { state: 'degrees' } },
    { component: ExperienceComponent, path: 'experience', data: { state: 'experience' } },
    { component: NgGdComponent, path: 'ng-gd', data: { state: 'ng-gd' } },
    { component: AboutComponent, path: 'about', data: { state: 'about' } }
];
