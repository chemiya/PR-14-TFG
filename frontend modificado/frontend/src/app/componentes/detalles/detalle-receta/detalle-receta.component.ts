import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { PublicacionDAOService } from 'src/app/DAO/PublicacionDAO/publicacion-dao.service';
import { RecetaDAOService } from 'src/app/DAO/RecetaDAO/receta-dao.service';
import { AlimentoRecetaDTO, PasoDTO, PublicacionDTO, RecetaDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/DAO/TokenServicio/token-storage.service';

//corregido html y ts---------------
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
pasos!:PasoDTO[];
botonFavorita:boolean=true;
constructor(private publicacionDAO: PublicacionDAOService,private recetaDAO:RecetaDAOService, public toastr: ToastrService,private route: ActivatedRoute,private router:Router,private tokenStorage:TokenStorageService){}
ngOnInit(): void {
  
  this.getRecetaPorId(this.route.snapshot.params["id"]);//busco receta concreta
  this.currentUser=this.tokenStorage.getUser();//cargoel usuario
  this.getAlimentosReceta(this.route.snapshot.params["id"]);//busco los alimentos de la receta
  this.comprobarFavorita(this.route.snapshot.params["id"]);//miro si es favorita del usuario
  this.getPublicacionesReceta(this.route.snapshot.params["id"])//cojo sus publicaciones enlazadas
  this.getPasosReceta(this.route.snapshot.params["id"])//Busco sus pasos

}

comprobarFavorita(id:any){
  this.recetaDAO.comprobarFavorita(id,this.currentUser.id)//compruebo si es favorita
      .subscribe({
        next: (data) => {
          if(data.length==1){
            this.botonFavorita=false;//pongo el boton de quitar de favorita
          }
        },
        error: (e) => console.error(e)
      });
}

getPublicacionesReceta(id:any){
  this.publicacionDAO.getPublicacionesReceta(id)//busco las publicaciones enlazadas
      .subscribe({
        next: (data) => {
         this.publicaciones=data;//las guardo
        
   
        },
        error: (e) => console.error(e)
      });
}

getRecetaPorId(id:number){
  this.recetaDAO.getRecetaPorId(id)//busco la receta concreta
      .subscribe({
        next: (data) => {
          this.receta=data[0];//ña guardo
         
       
        },
        error: (e) => console.error(e)
      });
}

getPasosReceta(id:number){
  this.recetaDAO.getPasosReceta(id)//busco los pasos de la receta
      .subscribe({
        next: (data) => {
          this.pasos=data;//los guardo
          
         
        },
        error: (e) => console.error(e)
      });
}

getAlimentosReceta(id:number){
  this.recetaDAO.getAlimentosReceta(id)//busco sus alimentos de la receta
      .subscribe({
        next: (data) => {
          this.alimentosReceta=data;//los guardo
          
         
        },
        error: (e) => console.error(e)
      });
}

anadirFavorita(id:any){//la guardo como favorita
  const idRecetaJSON={//convierto el id
    idReceta:id
  }
  this.recetaDAO.anadirFavorita(this.currentUser.id,idRecetaJSON)//la guardo favorita
  .subscribe({
    next: (data) => {
      this.toastr.success( 'Receta añadida a favoritas');
      this.botonFavorita=false;//cambio boton
    },
    error: (e) => console.error(e)
  });
}

detallesUsuario(id:any){//voy al usuario concreto
  this.router.navigate(['/detallesUsuario/'+id]);
}

detallesAlimento(id:any){//voy al alimento concreto
  this.router.navigate(['/detallesAlimento/'+id]);
}

eliminarFavorita(idReceta:any){
  this.recetaDAO.borrarFavorita(this.currentUser.id,idReceta)//la quito de favoritas
  .subscribe({
    next: (data) => {
      this.botonFavorita=true;//cambio boton
      this.toastr.success( 'Receta eliminada de favoritas');
    },
    error: (e) => console.error(e)
  });
}


detallePublicacion(id:any){//voy a la puvblicacion concreta
  this.router.navigate(['/detallesPublicacion/'+id]);
}
}
