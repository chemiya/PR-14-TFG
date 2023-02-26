import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { RecetaDAOService } from 'src/app/DAO/RecetaDAO/receta-dao.service';
import { RecetaDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/DAO/TokenServicio/token-storage.service';

//corregido html y ts----------------------------------

@Component({
  selector: 'app-favoritas-recetas',
  templateUrl: './favoritas-recetas.component.html',
  styleUrls: ['./favoritas-recetas.component.css']
})
export class FavoritasRecetasComponent {
  recetasFavoritas!:RecetaDTO[];
currentUser:any;

constructor(private recetaDAO:RecetaDAOService,public toastr: ToastrService,private tokenStorage:TokenStorageService,private router:Router){}
ngOnInit(): void {
  
 
  this.currentUser=this.tokenStorage.getUser();//busco el usuario
  
  this.buscarFavoritas()//busco sus favoritas
}
buscarFavoritas(){
  this.recetaDAO.buscarFavoritas(this.currentUser.id)//busco sus favoritas
  .subscribe({
    next: (data) => {
      this.recetasFavoritas = data;//las guardo
      console.log(data);
    },
    error: (e) => console.error(e)
  });
}



detallesReceta(id:any){//voy a la receta concreta
  console.log(id)
  this.router.navigate(['/detallesReceta/'+id]);
}
}
