import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificacionMainComponent } from './components/notificacion-main/notificacion-main.component';

const routes: Routes = [{ path: '', component: NotificacionMainComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificacionRoutingModule { }
