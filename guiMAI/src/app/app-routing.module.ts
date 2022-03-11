import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/components/main/main.component';

const routes: Routes = [
  { path:'main', component: MainComponent},
  { path: 'notificacion', loadChildren: () => import('./notificacion/notificacion.module').then(m => m.NotificacionModule) },
  { path:'**', redirectTo: '/main', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
