import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { RecetaServicioService } from 'src/app/Servicios/RecetaServicio/receta-servicio.service';

import { TokenStorageService } from 'src/app/Servicios/TokenServicio/token-storage.service';
import { FavoritaServicioService } from 'src/app/Servicios/FavoritaServicio/favorita-servicio.service';
import { RecetaDTO } from 'src/app/DTO/RecetaDTO';

//corregido html y ts----------------------------------

@Component({
  selector: 'app-favoritas-recetas',
  templateUrl: './favoritas-recetas.component.html',
  styleUrls: ['./favoritas-recetas.component.css']
})
export class FavoritasRecetasComponent {
  recetasFavoritas!:RecetaDTO[];
currentUser:any;
mostrarAvisoFavoritas:boolean=false;

constructor(private recetaServicio:RecetaServicioService,private favoritaServicio:FavoritaServicioService, public toastr: ToastrService,private tokenStorage:TokenStorageService,private router:Router){}
ngOnInit(): void {
  
 
  this.currentUser=this.tokenStorage.getUser();//busco el usuario
  
  this.buscarFavoritas()//busco sus favoritas
}
buscarFavoritas(){
  this.favoritaServicio.buscarFavoritas(this.currentUser.id)//busco sus favoritas
  .subscribe({
    next: (data) => {
      this.recetasFavoritas = data;//las guardo
      if(this.recetasFavoritas.length==0){
        this.mostrarAvisoFavoritas=true;
      }
    },
    error: (e) => console.error(e)
  });
}



detallesReceta(id:any){//voy a la receta concreta
  console.log(id)
  this.router.navigate(['/detallesReceta/'+id]);
}
}
