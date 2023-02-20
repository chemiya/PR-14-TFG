import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConexionAPIService } from 'src/app/conexion-api.service';
import { PublicacionDAOService } from 'src/app/DAO/PublicacionDAO/publicacion-dao.service';
import { UsuarioDAOService } from 'src/app/DAO/UsuarioDAO/usuario-dao.service';
import { PublicacionDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/token-storage.service';


@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent {
username!:string;
id!:number;
seguidos!:number;
seguidores!:number;
currentUser!:any
mensaje!:string
publicaciones!:PublicacionDTO[];
botonSeguimiento:boolean=true;
constructor(private conexionAPI:ConexionAPIService, public usuarioDAO:UsuarioDAOService, public publicacionDAO:PublicacionDAOService, public toastr: ToastrService,private route: ActivatedRoute,private router:Router,private tokenService:TokenStorageService){}
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
  this.conexionAPI.comprobarSeguimiento(id,this.currentUser.id)//busco todos
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
         this.username=data[0].username;
         this.id=data[0].id;
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
  this.conexionAPI.seguirUsuario(idSeguido,this.currentUser.id)//busco todos
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
  this.conexionAPI.eliminarSeguimiento(id,this.currentUser.id)//busco todos
  .subscribe({
    next: (data) => {
      
      this.botonSeguimiento=true;
      this.toastr.success( 'Has dejado de seguir a este usuario');
    },
    error: (e) => console.error(e)
  });
}

}
