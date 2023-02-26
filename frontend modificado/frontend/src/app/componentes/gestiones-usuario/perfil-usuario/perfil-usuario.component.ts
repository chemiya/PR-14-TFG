import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PublicacionDAOService } from 'src/app/DAO/PublicacionDAO/publicacion-dao.service';

import { UsuarioDAOService } from 'src/app/DAO/UsuarioDAO/usuario-dao.service';
import { PublicacionDTO, UsuarioDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/DAO/TokenServicio/token-storage.service';
import { SeguidorDAOService } from 'src/app/DAO/SeguidorDAO/seguidor-dao.service';


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

  constructor(private token: TokenStorageService,private seguidorDAO:SeguidorDAOService, private publicacionDAO:PublicacionDAOService, private usuarioDAO:UsuarioDAOService, private router:Router) { }
  //coge los datos del storage
  ngOnInit(): void {
    this.currentUser = this.token.getUser();//cargo el usuario
    this.getUsuarioPorId(this.currentUser.id)//busco mis datos
    this.getNumeroSeguidos(this.currentUser.id);//busco los numeros de seguidos y seguidores
    this.getNumeroSeguidores(this.currentUser.id);
    this.getMisPublicaciones(this.currentUser.id);//busco mis publicaciones

  }

  getUsuarioPorId(id:any){
    this.usuarioDAO.buscarUsuarioPorId(id)//busco las datos de mi usuario
    .subscribe({
      next: (data) => {
     console.log(data)
        this.usuario=data[0]//lo guardo
       
      },
      error: (e) => console.error(e)
    });
  }

  getMisPublicaciones(id:any){
    this.publicacionDAO.buscarMisPublicaciones(id)//busco mis publicaciones
    .subscribe({
      next: (data) => {
     console.log(data)
        this.publicaciones=data;//las guardo
       
      },
      error: (e) => console.error(e)
    });
  }

 getNumeroSeguidos(id:any){
    this.seguidorDAO.buscarNumeroSeguidos(id)//busco el numero
    .subscribe({
      next: (data) => {
     
        this.numeroSeguidos=(data[0].seguidos)//lo guardo
       
      },
      error: (e) => console.error(e)
    });
  }

  getNumeroSeguidores(id:any){
    this.seguidorDAO.buscarNumeroSeguidores(id)//busco el numero
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
