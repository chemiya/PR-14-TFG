import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { PublicacionServicioService } from 'src/app/Servicios/PublicacionServicio/publicacion-servicio.service';
import { RecetaServicioService } from 'src/app/Servicios/RecetaServicio/receta-servicio.service';

import { TokenStorageService } from 'src/app/Servicios/TokenServicio/token-storage.service';
import { FavoritaServicioService } from 'src/app/Servicios/FavoritaServicio/favorita-servicio.service';
import { AlimentoRecetaServicioService } from 'src/app/Servicios/AlimentoRecetaServicio/alimento-receta-servicio.service';
import { PasoServicioService } from 'src/app/Servicios/PasoServicio/paso-servicio.service';
import { RecetaDTO } from 'src/app/DTO/RecetaDTO';
import { AlimentoRecetaDTO } from 'src/app/DTO/AlimentoRecetaDTO';
import { PublicacionDTO } from 'src/app/DTO/PublicacionDTO';
import { PasoDTO } from 'src/app/DTO/PasoDTO';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBodyComponent } from '../../cartas/dialog-body/dialog-body.component';

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
sinPublicaciones:boolean=false
botonesEditarEliminar=false;
constructor(private publicacionServicio: PublicacionServicioService,private dialog:MatDialog,private favoritaServicio:FavoritaServicioService,private alimentoRecetaServicio:AlimentoRecetaServicioService, private pasoServicio:PasoServicioService, private recetaServicio:RecetaServicioService, public toastr: ToastrService,private route: ActivatedRoute,private router:Router,private tokenStorage:TokenStorageService){}
ngOnInit(): void {
  
  this.getRecetaPorId(this.route.snapshot.params["id"]);//busco receta concreta
  this.currentUser=this.tokenStorage.getUser();//cargoel usuario
  this.getAlimentosReceta(this.route.snapshot.params["id"]);//busco los alimentos de la receta
  this.comprobarFavorita(this.route.snapshot.params["id"]);//miro si es favorita del usuario
  this.getPublicacionesReceta(this.route.snapshot.params["id"])//cojo sus publicaciones enlazadas
  this.getPasosReceta(this.route.snapshot.params["id"])//Busco sus pasos

}

comprobarFavorita(id:any){
  this.favoritaServicio.comprobarFavorita(id,this.currentUser.id)//compruebo si es favorita
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
  this.publicacionServicio.buscarPublicacionesReceta(id)//busco las publicaciones enlazadas
      .subscribe({
        next: (data) => {
         this.publicaciones=data;//las guardo
        if(this.publicaciones.length==0){
          this.sinPublicaciones=true;
        }
   
        },
        error: (e) => console.error(e)
      });
}

getRecetaPorId(id:number){
  this.recetaServicio.buscarRecetaPorId(id)//busco la receta concreta
      .subscribe({
        next: (data) => {
          if(data.length==0){
            console.log("error")
            this.router.navigate(['/muroPublicaciones']);
          }else{
            this.receta=data[0];//ña guardo
            
            if(this.receta.usernameUsuario.toString()==this.currentUser.username.toString()){
            
              this.botonesEditarEliminar=true
            }
          }

          
         
       
        },
        error: (e) => console.error(e)
      });
}

getPasosReceta(id:number){
  this.pasoServicio.buscarPasosReceta(id)//busco los pasos de la receta
      .subscribe({
        next: (data) => {
          this.pasos=data;//los guardo
          
         
        },
        error: (e) => console.error(e)
      });
}

getAlimentosReceta(id:number){
  this.alimentoRecetaServicio.buscarAlimentosReceta(id)//busco sus alimentos de la receta
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
  this.favoritaServicio.guardarFavorita(this.currentUser.id,idRecetaJSON)//la guardo favorita
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
  this.favoritaServicio.borrarFavorita(this.currentUser.id,idReceta)//la quito de favoritas
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

editarReceta(){
  this.router.navigate(['/crearReceta/'+this.receta.id]); 
}

openDialog(id: any, titulo: any,event:Event): void {//creo el dialog
  event.stopPropagation();
  const dialogConfig = new MatDialogConfig();
  dialogConfig.data = {//pogno el mensaje
    texto:"¿deseas eliminar la receta "+titulo+" con el id "+id+"?",
    titulo:"Eliminar receta"
  }

  const dialogRef = this.dialog.open(DialogBodyComponent, dialogConfig);//abro el dialog

  dialogRef.afterClosed().subscribe(//al cerrar
    data => {
      if (data == "si") {//si recibo mensaje de si
        this.recetaServicio.borrarReceta(id)//borro el alimento
          .subscribe({
            next: (data) => {
              this.router.navigate(["/miPerfil"]).then(() => {//voy a la pantalla principal
                this.toastr.success('Receta eliminada');
              })
            },
            error: (e) => console.error(e)
          });
      }
    }
  );


}
}
