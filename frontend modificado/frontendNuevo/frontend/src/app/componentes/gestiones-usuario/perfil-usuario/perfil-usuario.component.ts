import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PublicacionServicioService } from 'src/app/Servicios/PublicacionServicio/publicacion-servicio.service';

import { UsuarioServicioService } from 'src/app/Servicios/UsuarioServicio/usuario-servicio.service';

import { TokenStorageService } from 'src/app/Servicios/TokenServicio/token-storage.service';
import { SeguidorServicioService } from 'src/app/Servicios/SeguidorServicio/seguidor-servicio.service';
import { UsuarioDTO } from 'src/app/DTO/UsuarioDTO';
import { PublicacionDTO } from 'src/app/DTO/PublicacionDTO';


//corregido html y ts--------------------

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent {
  usuario!:UsuarioDTO;
  numeroSeguidos!:number;
  numeroSeguidores!:number;
  publicaciones!:PublicacionDTO[];
  currentUser:any;
  mostrarAvisoPublicaciones:boolean=false;

  constructor(private token: TokenStorageService,private seguidorServicio:SeguidorServicioService, private publicacionServicio:PublicacionServicioService, private usuarioServicio:UsuarioServicioService, private router:Router) { }
  //coge los datos del storage
  ngOnInit(): void {
    this.currentUser = this.token.getUser();//cargo el usuario
    this.getUsuarioPorId(this.currentUser.id)//busco mis datos
    this.getNumeroSeguidos(this.currentUser.id);//busco los numeros de seguidos y seguidores
    this.getNumeroSeguidores(this.currentUser.id);
    this.getMisPublicaciones(this.currentUser.id);//busco mis publicaciones

  }

  getUsuarioPorId(id:any){
    this.usuarioServicio.buscarUsuarioPorId(id)//busco las datos de mi usuario
    .subscribe({
      next: (data) => {
     console.log(data)
        this.usuario=data[0]//lo guardo
       
      },
      error: (e) => console.error(e)
    });
  }

  getMisPublicaciones(id:any){
    this.publicacionServicio.buscarMisPublicaciones(id)//busco mis publicaciones
    .subscribe({
      next: (data) => {
     
        this.publicaciones=data;//las guardo

        if(this.publicaciones.length==0){
          this.mostrarAvisoPublicaciones=true;
        }
       
      },
      error: (e) => console.error(e)
    });
  }

 getNumeroSeguidos(id:any){
    this.seguidorServicio.buscarNumeroSeguidos(id)//busco el numero
    .subscribe({
      next: (data) => {
     
        this.numeroSeguidos=(data[0].seguidos)//lo guardo
       
      },
      error: (e) => console.error(e)
    });
  }

  getNumeroSeguidores(id:any){
    this.seguidorServicio.buscarNumeroSeguidores(id)//busco el numero
    .subscribe({
      next: (data) => {
        this.numeroSeguidores=(data[0].seguidores)//lo guardo
       
      },
      error: (e) => console.error(e)
    });
  }

  detallePublicacion(id:any){///voy a la publicacion concreta
    this.router.navigate(['/detallesPublicacion/'+id]);
  }

  verFavoritas(){//voy a las favoritas
    this.router.navigate(['/favoritas']);
  }

  verSeguidores(){//voy a los seguidores
    this.router.navigate(['/seguidores']);
  }

  verSeguidos(){//voy a los seguidos
    this.router.navigate(['/seguidos']);
  }

  editarPerfil(){//voy a editar perfil
    this.router.navigate(['/editarPerfil']);
  }

}
