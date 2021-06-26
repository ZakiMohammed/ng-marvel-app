import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { CharacterListComponent } from './components/character-list/character-list.component';

const routes: Routes = [
  { path: 'characters', component: CharacterListComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: 'characters', pathMatch: 'full' },
  { path: '**', component: CharacterListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
