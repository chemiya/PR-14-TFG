import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PublicacionServicioService } from 'src/app/Servicios/PublicacionServicio/publicacion-servicio.service';

import { TokenStorageService } from 'src/app/Servicios/TokenServicio/token-storage.service';
import { SeguidorServicioService } from 'src/app/Servicios/SeguidorServicio/seguidor-servicio.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBodyComponent } from '../../cartas/dialog-body/dialog-body.component';
import { UsuarioServicioService } from 'src/app/Servicios/UsuarioServicio/usuario-servicio.service';
import { PublicacionDTO } from 'src/app/DTO/PublicacionDTO';
import { UsuarioDTO } from 'src/app/DTO/UsuarioDTO';


//corregido html y ts----------------------

@Component({
  selector: 'app-muro-publicaciones',
  templateUrl: './muro-publicaciones.component.html',
  styleUrls: ['./muro-publicaciones.component.css']
})
export class MuroPublicacionesComponent {
publicaciones?:PublicacionDTO[];
currentUser:any;
mostrarMensajeNinguna:boolean=false;
mostrarMensajeSeguidos:boolean=false;
numeroSeguidos!:number;
usuario!:UsuarioDTO;

constructor(private publicacionServicio:PublicacionServicioService,private usuarioServicio:UsuarioServicioService, private dialog: MatDialog,private tokenStorageService:TokenStorageService,private seguidorServicio:SeguidorServicioService, private router:Router,private tokenStorage:TokenStorageService){}

ngOnInit(): void {
  this.currentUser=this.tokenStorage.getUser();//cargo el usuario
  this.getPublicaciones();//busco las publicaciones de los seguidosç
  this.getUsuario();
}

getUsuario(){
  this.usuarioServicio.buscarUsuarioPorId(this.currentUser.id)//busco las datos de mi usuario
  .subscribe({
    next: (data) => {
   console.log(data)
      this.usuario=data[0]//lo guardo
     
    },
    error: (e) => console.error(e)
  });
}

getPublicaciones(){
  
  this.seguidorServicio.buscarNumeroSeguidos(this.currentUser.id)//busco el numero
  .subscribe({
    next: (data) => {
      
      this.numeroSeguidos=(data[0].seguidos)//busco cuantos sigue
      if(this.numeroSeguidos>0){
   
        this.publicacionServicio.buscarPublicacionesSeguidos(this.currentUser.id)//busco las publicaciones de los que sigue
            .subscribe({
              next: (data) => {
                this.publicaciones = data;//las guardo
                console.log(this.publicaciones)
                if(this.publicaciones.length==0){//si no hay ninguna muestro mensaje
                  this.mostrarMensajeNinguna=true;
                }
              },
              error: (e) => console.error(e)
            });
          }else{
            this.mostrarMensajeSeguidos=true;
          }
      
     
    },
    error: (e) => console.error(e)
  });


  
  
}

detallesPublicacion(id:number){//voy a una publicacion concreta
  this.router.navigate(['/detallesPublicacion/'+id]);
}




}
