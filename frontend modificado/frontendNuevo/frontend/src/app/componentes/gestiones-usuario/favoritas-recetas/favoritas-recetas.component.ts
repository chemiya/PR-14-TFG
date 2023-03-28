import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { RecetaDAOService } from 'src/app/DAO/RecetaDAO/receta-dao.service';
import { RecetaDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/DAO/TokenServicio/token-storage.service';
import { FavoritaDAOService } from 'src/app/DAO/FavoritaDAO/favorita-dao.service';

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

constructor(private recetaDAO:RecetaDAOService,private favoritaDAO:FavoritaDAOService, public toastr: ToastrService,private tokenStorage:TokenStorageService,private router:Router){}
ngOnInit(): void {
  
 
  this.currentUser=this.tokenStorage.getUser();//busco el usuario
  
  this.buscarFavoritas()//busco sus favoritas
}
buscarFavoritas(){
  this.favoritaDAO.buscarFavoritas(this.currentUser.id)//busco sus favoritas
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
