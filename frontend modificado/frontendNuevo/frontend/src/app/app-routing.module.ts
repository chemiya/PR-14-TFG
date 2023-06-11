import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BuscarRecetaComponent } from './componentes/buscadores/vistas-buscar/buscar-receta/buscar-receta.component';
import { CrearRecetaComponent } from './componentes/creadores/crear-receta/crear-receta.component';
import { DetallePublicacionComponent } from './componentes/detalles/detalle-publicacion/detalle-publicacion.component';
import { DetalleRecetaComponent } from './componentes/detalles/detalle-receta/detalle-receta.component';
import { DetalleUsuarioComponent } from './componentes/detalles/detalle-usuario/detalle-usuario.component';
import { EditarPerfilComponent } from './componentes/gestiones-usuario/editar-perfil/editar-perfil.component';
import { FavoritasRecetasComponent } from './componentes/gestiones-usuario/favoritas-recetas/favoritas-recetas.component';

import { PerfilUsuarioComponent } from './componentes/gestiones-usuario/perfil-usuario/perfil-usuario.component';
import { MuroPublicacionesComponent } from './componentes/gestiones-usuario/muro-publicaciones/muro-publicaciones.component';
import { SeguidoresUsuarioComponent } from './componentes/gestiones-usuario/seguidores-usuario/seguidores-usuario.component';
import { SeguidosUsuarioComponent } from './componentes/gestiones-usuario/seguidos-usuario/seguidos-usuario.component';
import { DetalleAlimentoComponent } from './componentes/detalles/detalle-alimento/detalle-alimento.component';
import { BuscarAlimentoComponent } from './componentes/buscadores/vistas-buscar/buscar-alimento/buscar-alimento.component';
import { BuscarUsuarioComponent } from './componentes/buscadores/vistas-buscar/buscar-usuario/buscar-usuario.component';
import { VistaAdminComponent } from './componentes/admin-vistas/vista-admin/vista-admin.component';
import { CrearAlimentoComponent } from './componentes/creadores/crear-alimento/crear-alimento.component';
import { CrearPublicacionComponent } from './componentes/creadores/crear-publicacion/crear-publicacion.component';
import { AuthGuard } from './Servicios/GuardaServicio/auth.guard';
import { IdentificacionComponent } from './componentes/sin-identificar/identificacion/identificacion.component';
import { RegistroComponent } from './componentes/sin-identificar/registro/registro.component';
import { DescripcionComponent } from './componentes/sin-identificar/descripcion/descripcion.component';

const routes: Routes = [
//ruta basica
//ruta y al componente al que dirigen y editar con el id
{path:'identificacionusuario', component:IdentificacionComponent},
{path:'registrousuario', component:RegistroComponent},
{path:'pantallaprincipal', component:DescripcionComponent},

{path:'muroPublicaciones', component:MuroPublicacionesComponent, canActivate:[AuthGuard]},
{path:'detallesPublicacion/:id', component:DetallePublicacionComponent, canActivate:[AuthGuard]},
{path:'detallesUsuario/:id', component:DetalleUsuarioComponent, canActivate:[AuthGuard]},
{path:'detallesAlimento/:id', component:DetalleAlimentoComponent, canActivate:[AuthGuard]},
{path:'miPerfil', component:PerfilUsuarioComponent, canActivate:[AuthGuard]},
{path:'buscarReceta', component:BuscarRecetaComponent, canActivate:[AuthGuard]},
{path:'buscarAlimento', component:BuscarAlimentoComponent, canActivate:[AuthGuard]},
{path:'buscarUsuario', component:BuscarUsuarioComponent, canActivate:[AuthGuard]},
{path:'crearReceta', component:CrearRecetaComponent, canActivate:[AuthGuard]},
{path:'anadirPublicacion', component:CrearPublicacionComponent, canActivate:[AuthGuard]},
{path:'favoritas', component:FavoritasRecetasComponent, canActivate:[AuthGuard]},
{path:'editarPerfil', component:EditarPerfilComponent, canActivate:[AuthGuard]},
{path:'seguidos', component:SeguidosUsuarioComponent, canActivate:[AuthGuard]},
{path:'seguidores', component:SeguidoresUsuarioComponent, canActivate:[AuthGuard]},
{path:'detallesReceta/:id', component:DetalleRecetaComponent, canActivate:[AuthGuard]},
{path:'admin', component:VistaAdminComponent, canActivate:[AuthGuard]},
{path:'crearAlimento/nuevo', component:CrearAlimentoComponent, canActivate:[AuthGuard]},
{path:'crearAlimento/:id/editar', component:CrearAlimentoComponent, canActivate:[AuthGuard]},
{ path:'**', redirectTo:'/pantallaprincipal', pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
