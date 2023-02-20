import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConexionAPIService } from 'src/app/conexion-api.service';
import { PublicacionDAOService } from 'src/app/DAO/PublicacionDAO/publicacion-dao.service';
import { RecetaDAOService } from 'src/app/DAO/RecetaDAO/receta-dao.service';
import { AlimentoRecetaDTO, PublicacionDTO, RecetaDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/token-storage.service';


@Component({
  selector: 'app-detalle-receta',
  templateUrl: './detalle-receta.component.html',
  styleUrls: ['./detalle-receta.component.css']
})
export class DetalleRecetaComponent {
receta!:RecetaDTO;
currentUser:any;
mensaje!:string;
alimentosReceta!:AlimentoRecetaDTO[];
publicaciones!:PublicacionDTO[];
botonFavorita:boolean=true;
constructor(private conexionAPI:ConexionAPIService,private publicacionDAO: PublicacionDAOService,private recetaDAO:RecetaDAOService, public toastr: ToastrService,private route: ActivatedRoute,private router:Router,private tokenStorage:TokenStorageService){}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  console.log(this.route.snapshot.params["id"])
  this.getRecetaPorId(this.route.snapshot.params["id"]);
  this.currentUser=this.tokenStorage.getUser();
  this.getAlimentosReceta(this.route.snapshot.params["id"]);
  this.comprobarFavorita(this.route.snapshot.params["id"]);
  this.getPublicacionesReceta(this.route.snapshot.params["id"])

}

comprobarFavorita(id:any){
  this.recetaDAO.comprobarFavorita(id,this.currentUser.id)//busco todos
      .subscribe({
        next: (data) => {
          if(data.length==1){
            this.botonFavorita=false;
          }
        },
        error: (e) => console.error(e)
      });
}

getPublicacionesReceta(id:any){
  this.publicacionDAO.getPublicacionesReceta(id)//busco todos
      .subscribe({
        next: (data) => {
         this.publicaciones=data;
         console.log(data)
   
        },
        error: (e) => console.error(e)
      });
}

getRecetaPorId(id:number){
  this.recetaDAO.getRecetaPorId(id)//busco todos
      .subscribe({
        next: (data) => {
          this.receta=data[0];
          console.log(data[0])
        },
        error: (e) => console.error(e)
      });
}

getAlimentosReceta(id:number){
  this.recetaDAO.getAlimentosReceta(id)//busco todos
      .subscribe({
        next: (data) => {
          this.alimentosReceta=data;
          console.log("alimentos en la receta:"+this.alimentosReceta[0])
         
        },
        error: (e) => console.error(e)
      });
}
anadirFavorita(id:any){
  const idRecetaJSON={
    idReceta:id
  }
  this.recetaDAO.anadirFavorita(this.currentUser.id,idRecetaJSON)//busco todos
  .subscribe({
    next: (data) => {
      this.toastr.success( 'Receta añadida a favoritas');
      this.botonFavorita=false;
    },
    error: (e) => console.error(e)
  });
}

detallesUsuario(id:any){
  this.router.navigate(['/detallesUsuario/'+id]);
}

detallesAlimento(id:any){
  this.router.navigate(['/detallesAlimento/'+id]);
}

eliminarFavorita(idReceta:any){
  this.recetaDAO.eliminarFavorita(this.currentUser.id,idReceta)//busco todos
  .subscribe({
    next: (data) => {
      this.botonFavorita=true;
      this.toastr.success( 'Receta eliminada de favoritas');
    },
    error: (e) => console.error(e)
  });
}


detallePublicacion(id:any){
  this.router.navigate(['/detallesPublicacion/'+id]);
}
}
