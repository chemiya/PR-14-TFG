import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnadirPublicacionComponent } from './anadir-publicacion/anadir-publicacion.component';
import { BuscarRecetaComponent } from './buscar-receta/buscar-receta.component';
import { CrearRecetaComponent } from './crear-receta/crear-receta.component';
import { DetallePublicacionComponent } from './detalle-publicacion/detalle-publicacion.component';
import { DetalleRecetaComponent } from './detalle-receta/detalle-receta.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { FavoritasRecetasComponent } from './favoritas-recetas/favoritas-recetas.component';
import { IdentificacionUsuarioComponent } from './identificacion-usuario/identificacion-usuario.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { MuroPublicacionesComponent } from './muro-publicaciones/muro-publicaciones.component';
import { DescripcionAplicacionComponent } from './descripcion-aplicacion/descripcion-aplicacion.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { SeguidoresUsuarioComponent } from './seguidores-usuario/seguidores-usuario.component';
import { SeguidosUsuarioComponent } from './seguidos-usuario/seguidos-usuario.component';
import { DetalleAlimentoComponent } from './detalle-alimento/detalle-alimento.component';
import { BuscarAlimentoComponent } from './buscar-alimento/buscar-alimento.component';
import { BuscarUsuarioComponent } from './buscar-usuario/buscar-usuario.component';

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
{path:'anadirPublicacion', component:AnadirPublicacionComponent},
{path:'favoritas', component:FavoritasRecetasComponent},
{path:'editarPerfil', component:EditarPerfilComponent},
{path:'seguidos', component:SeguidosUsuarioComponent},
{path:'seguidores', component:SeguidoresUsuarioComponent},
{path:'detallesReceta/:id', component:DetalleRecetaComponent},
{path:'principal', component:DescripcionAplicacionComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
