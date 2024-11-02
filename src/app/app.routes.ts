import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layouts/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { MesaComponent } from './pages/mesa/mesa/mesa.component';
import { MesaListadoComponent } from './pages/mesa/mesa-listado/mesa-listado.component';
import { MesaPlatoComponent } from './pages/mesa/mesa-plato/mesa-plato.component';
import { MesaMantenimientoComponent } from './pages/mesa/mesa-mantenimiento/mesa-mantenimiento.component';
import { RolListaComponent } from './pages/roles/rol-lista/rol-lista.component';
import { UsuarioListaComponent } from './pages/usuarios/usuario-lista/usuario-lista.component';
import { AuthGuard } from './core/guard/auth.guard';
import { LoginComponent } from './pages/auth/login/login.component';
import { AuthPasscreateComponent } from './pages/auth/auth-passcreate/auth-passcreate.component';
import { AuthPassresetComponent } from './pages/auth/auth-passreset/auth-passreset.component';
import { MaestraListaComponent } from './maestras/maestra-lista/maestra-lista.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'Mesa-listado',
        component: MesaListadoComponent,
      },
      {
        path: 'Mesa-plato',
        component: MesaPlatoComponent,
      },
      {
        path: 'Mesa',
        component: MesaComponent,
      },
      {
        path: 'Mesa-mantenimiento',
        component: MesaMantenimientoComponent,
      },
      {
        path: 'Roles',
        component: RolListaComponent,
      },
      {
        path: 'Usuarios',
        component: UsuarioListaComponent,
      },
      {
        path: 'Maestra',
        component: MaestraListaComponent,
      },
    ],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'pass-create',
        component: AuthPasscreateComponent,
      },
      {
        path: 'pass-reset',
        component: AuthPassresetComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth/login',  // Redirige cualquier ruta desconocida a login
  },
];
