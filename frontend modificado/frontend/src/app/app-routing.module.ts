import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BuscarRecetaComponent } from './componentes/buscadores/vistas-buscar/buscar-receta/buscar-receta.component';
import { CrearRecetaComponent } from './componentes/creadores/crear-receta/crear-receta.component';
import { DetallePublicacionComponent } from './componentes/detalles/detalle-publicacion/detalle-publicacion.component';
import { DetalleRecetaComponent } from './componentes/detalles/detalle-receta/detalle-receta.component';
import { DetalleUsuarioComponent } from './componentes/detalles/detalle-usuario/detalle-usuario.component';
import { EditarPerfilComponent } from './componentes/gestiones-usuario/editar-perfil/editar-perfil.component';
import { FavoritasRecetasComponent } from './componentes/gestiones-usuario/favoritas-recetas/favoritas-recetas.component';
import { IdentificacionUsuarioComponent } from './componentes/sin-identificar/identificacion-usuario/identificacion-usuario.component';
import { PerfilUsuarioComponent } from './componentes/gestiones-usuario/perfil-usuario/perfil-usuario.component';
import { MuroPublicacionesComponent } from './componentes/gestiones-usuario/muro-publicaciones/muro-publicaciones.component';
import { DescripcionAplicacionComponent } from './componentes/sin-identificar/descripcion-aplicacion/descripcion-aplicacion.component';
import { RegistroUsuarioComponent } from './componentes/sin-identificar/registro-usuario/registro-usuario.component';
import { SeguidoresUsuarioComponent } from './componentes/gestiones-usuario/seguidores-usuario/seguidores-usuario.component';
import { SeguidosUsuarioComponent } from './componentes/gestiones-usuario/seguidos-usuario/seguidos-usuario.component';
import { DetalleAlimentoComponent } from './componentes/detalles/detalle-alimento/detalle-alimento.component';
import { BuscarAlimentoComponent } from './componentes/buscadores/vistas-buscar/buscar-alimento/buscar-alimento.component';
import { BuscarUsuarioComponent } from './componentes/buscadores/vistas-buscar/buscar-usuario/buscar-usuario.component';
import { VistaAdminComponent } from './componentes/admin-vistas/vista-admin/vista-admin.component';
import { CrearAlimentoComponent } from './componentes/creadores/crear-alimento/crear-alimento.component';
import { CrearPublicacionComponent } from './componentes/creadores/crear-publicacion/crear-publicacion.component';

const routes: Routes = [{ path:'', redirectTo:'/principal', pathMatch:'full'},//ruta basica
{path:'identificacion' , component: IdentificacionUsuarioComponent},//ruta y al componente al que dirigen y editar con el id
{path:'registro', component:RegistroUsuarioComponent},
{path:'muroPublicaciones', component:MuroPublicacionesComponent},
{path:'detallesPublicacion/:id', component:DetallePublicacionComponent},
{path:'detallesUsuario/:id', component:DetalleUsuarioComponent},
{path:'detallesAlimento/:id', component:DetalleAlimentoComponent},
{path:'miPerfil', component:PerfilUsuarioComponent},
{path:'buscarReceta', component:BuscarRecetaComponent},
{path:'buscarAlimento', component:BuscarAlimentoComponent},
{path:'buscarUsuario', component:BuscarUsuarioComponent},
{path:'crearReceta', component:CrearRecetaComponent},
{path:'anadirPublicacion', component:CrearPublicacionComponent},
{path:'favoritas', component:FavoritasRecetasComponent},
{path:'editarPerfil', component:EditarPerfilComponent},
{path:'seguidos', component:SeguidosUsuarioComponent},
{path:'seguidores', component:SeguidoresUsuarioComponent},
{path:'detallesReceta/:id', component:DetalleRecetaComponent},
{path:'admin', component:VistaAdminComponent},
{path:'crearAlimento/nuevo', component:CrearAlimentoComponent},
{path:'crearAlimento/:id/editar', component:CrearAlimentoComponent},

{path:'principal', component:DescripcionAplicacionComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
