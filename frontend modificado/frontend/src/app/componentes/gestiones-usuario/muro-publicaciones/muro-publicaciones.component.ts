import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PublicacionDAOService } from 'src/app/DAO/PublicacionDAO/publicacion-dao.service';
import { PublicacionDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/DAO/TokenServicio/token-storage.service';


@Component({
  selector: 'app-muro-publicaciones',
  templateUrl: './muro-publicaciones.component.html',
  styleUrls: ['./muro-publicaciones.component.css']
})
export class MuroPublicacionesComponent {
publicaciones?:PublicacionDTO[];
currentUser:any;
mostrarMensajeNinguna:boolean=false;
constructor(private publicacionDAO:PublicacionDAOService, private router:Router,private tokenStorage:TokenStorageService){}

ngOnInit(): void {
  this.currentUser=this.tokenStorage.getUser();
  this.getPublicaciones();//busco los tutoriales
}

getPublicaciones(){
  this.publicacionDAO.getPublicacionesSeguidos(this.currentUser.id)//busco todos
      .subscribe({
        next: (data) => {
          this.publicaciones = data;//los guardo en el array
          console.log(this.publicaciones)
          if(this.publicaciones.length==0){
            this.mostrarMensajeNinguna=true;
          }
        },
        error: (e) => console.error(e)
      });
}

detallesPublicacion(id:number){
  this.router.navigate(['/detallesPublicacion/'+id]);
}

}
