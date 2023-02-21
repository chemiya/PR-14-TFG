import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { RecetaDAOService } from 'src/app/DAO/RecetaDAO/receta-dao.service';
import { RecetaDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/DAO/TokenServicio/token-storage.service';


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
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
 
  this.currentUser=this.tokenStorage.getUser();
  
  this.buscarFavoritas()
}
buscarFavoritas(){
  this.recetaDAO.getFavoritas(this.currentUser.id)//busco todos
  .subscribe({
    next: (data) => {
      this.recetasFavoritas = data;//los guardo en el array
      console.log(data);
    },
    error: (e) => console.error(e)
  });
}



detallesReceta(id:any){
  console.log(id)
  this.router.navigate(['/detallesReceta/'+id]);
}
}
