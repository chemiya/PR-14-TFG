import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IdentificacionUsuarioComponent } from './identificacion-usuario/identificacion-usuario.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { DescripcionAplicacionComponent } from './descripcion-aplicacion/descripcion-aplicacion.component';
import { MuroPublicacionesComponent } from './muro-publicaciones/muro-publicaciones.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { BuscarRecetaComponent } from './buscar-receta/buscar-receta.component';
import { CrearRecetaComponent } from './crear-receta/crear-receta.component';
import { AnadirPublicacionComponent } from './anadir-publicacion/anadir-publicacion.component';
import { DetalleRecetaComponent } from './detalle-receta/detalle-receta.component';
import { DetallePublicacionComponent } from './detalle-publicacion/detalle-publicacion.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FavoritasRecetasComponent } from './favoritas-recetas/favoritas-recetas.component';
import { SeguidosUsuarioComponent } from './seguidos-usuario/seguidos-usuario.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { SeguidoresUsuarioComponent } from './seguidores-usuario/seguidores-usuario.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetalleAlimentoComponent } from './detalle-alimento/detalle-alimento.component';
import { BuscarAlimentoComponent } from './buscar-alimento/buscar-alimento.component';
import { BuscarUsuarioComponent } from './buscar-usuario/buscar-usuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { CartaRecetaComponent } from './cartas/carta-receta/carta-receta.component';
import { VistaAdminComponent } from './vista-admin/vista-admin.component';
import {MatTabsModule} from '@angular/material/tabs';
import { TablaRecetaComponent } from './tabla-receta/tabla-receta.component';
import { TablaAlimentoComponent } from './tabla-alimento/tabla-alimento.component';
import { TablaUsuarioComponent } from './tabla-usuario/tabla-usuario.component';
import { TablaPublicacionComponent } from './tabla-publicacion/tabla-publicacion.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { CrearAlimentoComponent } from './crear-alimento/crear-alimento.component';

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
    AnadirPublicacionComponent,
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
    CrearAlimentoComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
