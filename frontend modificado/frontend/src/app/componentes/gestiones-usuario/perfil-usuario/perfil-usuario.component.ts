import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PublicacionDAOService } from 'src/app/DAO/PublicacionDAO/publicacion-dao.service';

import { UsuarioDAOService } from 'src/app/DAO/UsuarioDAO/usuario-dao.service';
import { PublicacionDTO, UsuarioDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/DAO/TokenServicio/token-storage.service';


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

  constructor(private token: TokenStorageService,private publicacionDAO:PublicacionDAOService, private usuarioDAO:UsuarioDAOService, private router:Router) { }
  //coge los datos del storage
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.getUsuarioPorId(this.currentUser.id)
    this.getNumeroSeguidos(this.currentUser.id);
    this.getNumeroSeguidores(this.currentUser.id);
    this.getMisPublicaciones(this.currentUser.id);

  }

  getUsuarioPorId(id:any){
    this.usuarioDAO.getUsuarioPorId(id)//busco todos
    .subscribe({
      next: (data) => {
     console.log(data)
        this.usuario=data[0]
       
      },
      error: (e) => console.error(e)
    });
  }

  getMisPublicaciones(id:any){
    this.publicacionDAO.getMisPublicaciones(id)//busco todos
    .subscribe({
      next: (data) => {
     console.log(data)
        this.publicaciones=data;
       
      },
      error: (e) => console.error(e)
    });
  }

 getNumeroSeguidos(id:any){
    this.usuarioDAO.getNumeroSeguidos(id)//busco todos
    .subscribe({
      next: (data) => {
     
        this.numeroSeguidos=(data[0].seguidos)
       
      },
      error: (e) => console.error(e)
    });
  }

  getNumeroSeguidores(id:any){
    this.usuarioDAO.getNumeroSeguidores(id)//busco todos
    .subscribe({
      next: (data) => {
        this.numeroSeguidores=(data[0].seguidores)
       
      },
      error: (e) => console.error(e)
    });
  }

  detallePublicacion(id:any){
    this.router.navigate(['/detallesPublicacion/'+id]);
  }

  verFavoritas(){
    this.router.navigate(['/favoritas']);
  }

  verSeguidores(){
    this.router.navigate(['/seguidores']);
  }

  verSeguidos(){
    this.router.navigate(['/seguidos']);
  }

  editarPerfil(){
    this.router.navigate(['/editarPerfil']);
  }

}
