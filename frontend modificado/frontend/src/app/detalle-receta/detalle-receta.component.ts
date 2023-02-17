import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionAPIService } from '../conexion-api.service';
import { Receta, ResumenAlimentoReceta, ResumenPublicacion, ResumenReceta } from '../modelo/app.model';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-detalle-receta',
  templateUrl: './detalle-receta.component.html',
  styleUrls: ['./detalle-receta.component.css']
})
export class DetalleRecetaComponent {
receta!:ResumenReceta;
currentUser:any;
mensaje!:string;
alimentosReceta!:ResumenAlimentoReceta[];
publicaciones!:ResumenPublicacion[];
botonFavorita:boolean=true;
constructor(private conexionAPI:ConexionAPIService,private route: ActivatedRoute,private router:Router,private tokenStorage:TokenStorageService){}
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
  this.conexionAPI.comprobarFavorita(id,this.currentUser.id)//busco todos
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
  this.conexionAPI.getPublicacionesReceta(id)//busco todos
      .subscribe({
        next: (data) => {
         this.publicaciones=data;
         console.log(data)
   
        },
        error: (e) => console.error(e)
      });
}

getRecetaPorId(id:number){
  this.conexionAPI.getRecetaPorId(id)//busco todos
      .subscribe({
        next: (data) => {
          this.receta=data[0];
          console.log(data[0])
        },
        error: (e) => console.error(e)
      });
}

getAlimentosReceta(id:number){
  this.conexionAPI.getAlimentosReceta(id)//busco todos
      .subscribe({
        next: (data) => {
          this.alimentosReceta=data;
          console.log(this.alimentosReceta)
         
        },
        error: (e) => console.error(e)
      });
}
anadirFavorita(id:any){
  const idRecetaJSON={
    idReceta:id
  }
  this.conexionAPI.anadirFavorita(this.currentUser.id,idRecetaJSON)//busco todos
  .subscribe({
    next: (data) => {
      
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
  this.conexionAPI.eliminarFavorita(this.currentUser.id,idReceta)//busco todos
  .subscribe({
    next: (data) => {
      this.botonFavorita=true;
    },
    error: (e) => console.error(e)
  });
}


detallePublicacion(id:any){
  this.router.navigate(['/detallesPublicacion/'+id]);
}
}
