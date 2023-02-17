import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionAPIService } from '../conexion-api.service';
import { Receta, ResumenReceta } from '../modelo/app.model';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-favoritas-recetas',
  templateUrl: './favoritas-recetas.component.html',
  styleUrls: ['./favoritas-recetas.component.css']
})
export class FavoritasRecetasComponent {
  recetasFavoritas!:ResumenReceta[];
currentUser:any;

constructor(private conexionAPI:ConexionAPIService,private tokenStorage:TokenStorageService,private router:Router){}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
 
  this.currentUser=this.tokenStorage.getUser();
  
  this.buscarFavoritas()
}
buscarFavoritas(){
  this.conexionAPI.getFavoritas(this.currentUser.id)//busco todos
  .subscribe({
    next: (data) => {
      this.recetasFavoritas = data;//los guardo en el array
      console.log(data);
    },
    error: (e) => console.error(e)
  });
}

eliminarFavorita(idReceta:any,event:Event){
  event.stopPropagation();
  this.conexionAPI.eliminarFavorita(this.currentUser.id,idReceta)//busco todos
  .subscribe({
    next: (data) => {
      console.log(data)
      this.buscarFavoritas();
    },
    error: (e) => console.error(e)
  });
}

detallesReceta(id:any){
  console.log(id)
  this.router.navigate(['/detallesReceta/'+id]);
}
}
