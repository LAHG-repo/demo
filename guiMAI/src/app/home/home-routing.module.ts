import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotificacionMainComponent } from "../notificacion/components/notificacion-main/notificacion-main.component";
import { RegistroComponent } from "../notificacion/components/registro/registro.component";
import { ExpedientesComponent } from './components/expedientes/expedientes.component';
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
  {
    path: 'home', component: HomeComponent, children: [
      {
        path: 'exp',
        component: ExpedientesComponent,
      },
      {
        path: 'notificacion',
        children:[
          {
            path: 'registro',
            component: RegistroComponent
          }

        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
