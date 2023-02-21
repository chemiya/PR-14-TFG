import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { PublicacionDAOService } from 'src/app/DAO/PublicacionDAO/publicacion-dao.service';
import { UsuarioDAOService } from 'src/app/DAO/UsuarioDAO/usuario-dao.service';
import { PublicacionDTO, UsuarioDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/DAO/TokenServicio/token-storage.service';


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
botonSeguimiento:boolean=true;
constructor( public usuarioDAO:UsuarioDAOService, public publicacionDAO:PublicacionDAOService, public toastr: ToastrService,private route: ActivatedRoute,private router:Router,private tokenService:TokenStorageService){}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getUsuarioPorId(this.route.snapshot.params["id"]);
  this.getNumeroSeguidores(this.route.snapshot.params["id"]);
  this.getNumeroSeguidos(this.route.snapshot.params["id"]);
  this.getPublicacionesUsuario(this.route.snapshot.params["id"])
  this.currentUser=this.tokenService.getUser();
  this.comprobarSeguimiento(this.route.snapshot.params["id"])
}

comprobarSeguimiento(id:any){
  this.usuarioDAO.comprobarSeguimiento(id,this.currentUser.id)//busco todos
  .subscribe({
    next: (data) => {
      console.log(data)
     if(data.length==1){
      this.botonSeguimiento=false
     }

    },
    error: (e) => console.error(e)
  });
}

getPublicacionesUsuario(id:any){
  this.publicacionDAO.getPublicacionesUsuario(id)//busco todos
      .subscribe({
        next: (data) => {
         this.publicaciones=data;
         console.log(data)
   
        },
        error: (e) => console.error(e)
      });
}

getUsuarioPorId(id:any){
  this.usuarioDAO.getUsuarioPorId(id)//busco todos
      .subscribe({
        next: (data) => {
         this.usuario=data[0];
        },
        error: (e) => console.error(e)
      });
}

getNumeroSeguidores(id:any){
  this.usuarioDAO.getNumeroSeguidores(id)//busco todos
      .subscribe({
        next: (data) => {
         this.seguidores=data[0].seguidores
        },
        error: (e) => console.error(e)
      });
}

getNumeroSeguidos(id:any){
  this.usuarioDAO.getNumeroSeguidos(id)//busco todos
      .subscribe({
        next: (data) => {
          this.seguidos=data[0].seguidos
        },
        error: (e) => console.error(e)
      });
}

seguirUsuario(id:any){
 
  const idSeguido={
    idSeguido:id
  }
  console.log(idSeguido)
  this.usuarioDAO.seguirUsuario(idSeguido,this.currentUser.id)//busco todos
  .subscribe({
    next: (data) => {
      this.botonSeguimiento=false;
      this.toastr.success( 'Has empezado a seguir a este usuario');
    },
    error: (e) => console.error(e)
  });
}

detallePublicacion(id:any){
  this.router.navigate(['/detallesPublicacion/'+id]);
}

dejarSeguir(id:any){
  this.usuarioDAO.eliminarSeguimiento(id,this.currentUser.id)//busco todos
  .subscribe({
    next: (data) => {
      
      this.botonSeguimiento=true;
      this.toastr.success( 'Has dejado de seguir a este usuario');
    },
    error: (e) => console.error(e)
  });
}

}
