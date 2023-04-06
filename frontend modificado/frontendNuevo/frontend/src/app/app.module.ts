import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IdentificacionUsuarioComponent } from './componentes/sin-identificar/identificacion-usuario/identificacion-usuario.component';
import { RegistroUsuarioComponent } from './componentes/sin-identificar/registro-usuario/registro-usuario.component';
import { DescripcionAplicacionComponent } from './componentes/sin-identificar/descripcion-aplicacion/descripcion-aplicacion.component';
import { MuroPublicacionesComponent } from './componentes/gestiones-usuario/muro-publicaciones/muro-publicaciones.component';
import { PerfilUsuarioComponent } from './componentes/gestiones-usuario/perfil-usuario/perfil-usuario.component';
import { BuscarRecetaComponent } from './componentes/buscadores/vistas-buscar/buscar-receta/buscar-receta.component';
import { CrearRecetaComponent } from './componentes/creadores/crear-receta/crear-receta.component';

import { DetalleRecetaComponent } from './componentes/detalles/detalle-receta/detalle-receta.component';
import { DetallePublicacionComponent } from './componentes/detalles/detalle-publicacion/detalle-publicacion.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FavoritasRecetasComponent } from './componentes/gestiones-usuario/favoritas-recetas/favoritas-recetas.component';
import { SeguidosUsuarioComponent } from './componentes/gestiones-usuario/seguidos-usuario/seguidos-usuario.component';
import { EditarPerfilComponent } from './componentes/gestiones-usuario/editar-perfil/editar-perfil.component';
import { SeguidoresUsuarioComponent } from './componentes/gestiones-usuario/seguidores-usuario/seguidores-usuario.component';
import { DetalleUsuarioComponent } from './componentes/detalles/detalle-usuario/detalle-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetalleAlimentoComponent } from './componentes/detalles/detalle-alimento/detalle-alimento.component';
import { BuscarAlimentoComponent } from './componentes/buscadores/vistas-buscar/buscar-alimento/buscar-alimento.component';
import { BuscarUsuarioComponent } from './componentes/buscadores/vistas-buscar/buscar-usuario/buscar-usuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { CartaRecetaComponent } from './componentes/cartas/carta-receta/carta-receta.component';
import { VistaAdminComponent } from './componentes/admin-vistas/vista-admin/vista-admin.component';
import {MatTabsModule} from '@angular/material/tabs';
import { TablaRecetaComponent } from './componentes/admin-vistas/tabla-receta/tabla-receta.component';
import { TablaAlimentoComponent } from './componentes/admin-vistas/tabla-alimento/tabla-alimento.component';
import { TablaUsuarioComponent } from './componentes/admin-vistas/tabla-usuario/tabla-usuario.component';
import { TablaPublicacionComponent } from './componentes/admin-vistas/tabla-publicacion/tabla-publicacion.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogBodyComponent } from './componentes/cartas/dialog-body/dialog-body.component';
import { CrearAlimentoComponent } from './componentes/creadores/crear-alimento/crear-alimento.component';
import { CrearPublicacionComponent } from './componentes/creadores/crear-publicacion/crear-publicacion.component';
import { CartaPublicacionComponent } from './componentes/cartas/carta-publicacion/carta-publicacion.component';
import { CartaComentarioComponent } from './componentes/cartas/carta-comentario/carta-comentario.component';
import { CartaAlimentoComponent } from './componentes/cartas/carta-alimento/carta-alimento.component';
import { CartaAlimentoRecetaComponent } from './componentes/cartas/carta-alimento-receta/carta-alimento-receta.component';
import { CartaUsuarioComponent } from './componentes/cartas/carta-usuario/carta-usuario.component';
import { BuscadorRecetaComponent } from './componentes/buscadores/componentes-buscar/buscador-receta/buscador-receta.component';
import { BuscadorAlimentoComponent } from './componentes/buscadores/componentes-buscar/buscador-alimento/buscador-alimento.component';
import { BuscadorUsuarioComponent } from './componentes/buscadores/componentes-buscar/buscador-usuario/buscador-usuario.component';
import { AuthService } from './DAO/GuardaServicio/auth.service';
import { AuthGuard } from './DAO/GuardaServicio/auth.guard';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './DAO/GuardaServicio/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    IdentificacionUsuarioComponent,
    RegistroUsuarioComponent,
    DescripcionAplicacionComponent,
    MuroPublicacionesComponent,
    PerfilUsuarioComponent,
    BuscarRecetaComponent,
    CrearRecetaComponent,
    CrearPublicacionComponent,
    DetalleRecetaComponent,
    DetallePublicacionComponent,
    FavoritasRecetasComponent,
    SeguidosUsuarioComponent,
    EditarPerfilComponent,
    SeguidoresUsuarioComponent,
    DetalleUsuarioComponent,
    DetalleAlimentoComponent,
    BuscarAlimentoComponent,
    BuscarUsuarioComponent,
    CartaRecetaComponent,
    VistaAdminComponent,
    TablaRecetaComponent,
    TablaAlimentoComponent,
    TablaUsuarioComponent,
    TablaPublicacionComponent,
    DialogBodyComponent,
    CrearAlimentoComponent,
    CartaPublicacionComponent,
    CartaComentarioComponent,
    CartaAlimentoComponent,
    CartaAlimentoRecetaComponent,
    CartaUsuarioComponent,
    BuscadorRecetaComponent,
    BuscadorAlimentoComponent,
    BuscadorUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
    MatDialogModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
  ],
  providers: [AuthService, AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
