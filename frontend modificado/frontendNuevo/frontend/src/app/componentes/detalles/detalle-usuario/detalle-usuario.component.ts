import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { PublicacionServicioService } from 'src/app/Servicios/PublicacionServicio/publicacion-servicio.service';
import { UsuarioServicioService } from 'src/app/Servicios/UsuarioServicio/usuario-servicio.service';

import { TokenStorageService } from 'src/app/Servicios/TokenServicio/token-storage.service';
import { SeguidorServicioService } from 'src/app/Servicios/SeguidorServicio/seguidor-servicio.service';
import { UsuarioDTO } from 'src/app/DTO/UsuarioDTO';
import { PublicacionDTO } from 'src/app/DTO/PublicacionDTO';

//corregido html y ts

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent {


seguidos!:number;
seguidores!:number;
currentUser!:any
usuario!:UsuarioDTO;
mensaje!:string
publicaciones!:PublicacionDTO[];
mostrarAvisoNinguna:boolean=false;
botonSeguimiento:boolean=true;
constructor( public usuarioServicio:UsuarioServicioService,private seguidorServicio:SeguidorServicioService, public publicacionServicio:PublicacionServicioService, public toastr: ToastrService,private route: ActivatedRoute,private router:Router,private tokenService:TokenStorageService){}
ngOnInit(): void {
 
  this.getUsuarioPorId(this.route.snapshot.params["id"]);//busco el usaurio
  this.getNumeroSeguidores(this.route.snapshot.params["id"]);//cuantos seguidores tien
  this.getNumeroSeguidos(this.route.snapshot.params["id"]);//cuantos le siguen
  this.getPublicacionesUsuario(this.route.snapshot.params["id"])//sus publicaciones
  this.currentUser=this.tokenService.getUser();//el usuario en el token
  this.comprobarSeguimiento(this.route.snapshot.params["id"])//a ver si lo siguo ya
}

comprobarSeguimiento(id:any){
  this.seguidorServicio.comprobarSeguimiento(id,this.currentUser.id)//busco si sigo a ese usuario
  .subscribe({
    next: (data) => {
      console.log(data)
     if(data.length==1){
      this.botonSeguimiento=false//desactivo que le pueda seguir
     }

    },
    error: (e) => console.error(e)
  });
}

getPublicacionesUsuario(id:any){
  this.publicacionServicio.buscarPublicacionesUsuario(id)//busco sus publicaciones
      .subscribe({
        next: (data) => {
         this.publicaciones=data;//las guardo
         
         if(data.length==0){
          this.mostrarAvisoNinguna=true;
         }else{
          this.mostrarAvisoNinguna=false;
         }
   
        },
        error: (e) => console.error(e)
      });
}

getUsuarioPorId(id:any){
  this.usuarioServicio.buscarUsuarioPorId(id)//busco el usuario concreto
      .subscribe({
        next: (data) => {
         this.usuario=data[0];//le guardo
        },
        error: (e) => console.error(e)
      });
}

getNumeroSeguidores(id:any){
  this.seguidorServicio.buscarNumeroSeguidores(id)//busco sus seguidores
      .subscribe({
        next: (data) => {
         this.seguidores=data[0].seguidores//guardo el numero
        },
        error: (e) => console.error(e)
      });
}

getNumeroSeguidos(id:any){
  this.seguidorServicio.buscarNumeroSeguidos(id)//busco sus seguidos
      .subscribe({
        next: (data) => {
          this.seguidos=data[0].seguidos//lo guardo el numero
        },
        error: (e) => console.error(e)
      });
}

seguirUsuario(id:any){
 
  const idSeguido={
    idSeguido:id
  }//convierto a json
  console.log(idSeguido)
  this.seguidorServicio.guardarSeguimiento(idSeguido,this.currentUser.id)//guardo el seguimiento
  .subscribe({
    next: (data) => {
      this.botonSeguimiento=false;//desactivo boton
      this.toastr.success( 'Has empezado a seguir a este usuario');//mensaje
    },
    error: (e) => console.error(e)
  });
}

detallePublicacion(id:any){
  this.router.navigate(['/detallesPublicacion/'+id]);//voy a la publicacion concreta
}

dejarSeguir(id:any){
  this.seguidorServicio.borrarSeguimiento(id,this.currentUser.id)//dejo de seguir
  .subscribe({
    next: (data) => {
      
      this.botonSeguimiento=true;//activo el boton
      this.toastr.success( 'Has dejado de seguir a este usuario');
    },
    error: (e) => console.error(e)
  });
}

}
