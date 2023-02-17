import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionAPIService } from '../conexion-api.service';
import { Publicacion, ResumenPublicacion } from '../modelo/app.model';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent {
  currentUser: any;
  numeroSeguidos!:number;
  numeroSeguidores!:number;
  publicaciones!:ResumenPublicacion[];

  constructor(private token: TokenStorageService,private conexionAPI:ConexionAPIService,private router:Router) { }
  //coge los datos del storage
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.getNumeroSeguidos(this.currentUser.id);
    this.getNumeroSeguidores(this.currentUser.id);
    this.getMisPublicaciones(this.currentUser.id);

  }

  getMisPublicaciones(id:any){
    this.conexionAPI.getMisPublicaciones(id)//busco todos
    .subscribe({
      next: (data) => {
     console.log(data)
        this.publicaciones=data;
       
      },
      error: (e) => console.error(e)
    });
  }

 getNumeroSeguidos(id:any){
    this.conexionAPI.getNumeroSeguidos(id)//busco todos
    .subscribe({
      next: (data) => {
     
        this.numeroSeguidos=(data[0].seguidos)
       
      },
      error: (e) => console.error(e)
    });
  }

  getNumeroSeguidores(id:any){
    this.conexionAPI.getNumeroSeguidores(id)//busco todos
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
