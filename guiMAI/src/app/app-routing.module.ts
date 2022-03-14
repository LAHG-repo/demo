import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/components/main/main.component';
import { HomeComponent } from './home/components/home/home.component';
import { HomeRoutingModule } from './home/home-routing.module';

const routes: Routes = [
  { path:'main', component: MainComponent},
  //{ path: 'notificacion', loadChildren: () => import('./notificacion/notificacion.module').then(m => m.NotificacionModule) },
  //{ path:'**', redirectTo: '/main', pathMatch: 'full'},
  { path:'recuperacion', component: MainComponent, data: {esPasswordRecuperacion: true}},
  { path:'**', redirectTo: '/main', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled' }),
    HomeRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
