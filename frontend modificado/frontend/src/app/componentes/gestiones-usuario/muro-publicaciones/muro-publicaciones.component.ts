import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PublicacionDAOService } from 'src/app/DAO/PublicacionDAO/publicacion-dao.service';
import { PublicacionDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/DAO/TokenServicio/token-storage.service';


//corregido html y ts----------------------

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
  this.currentUser=this.tokenStorage.getUser();//cargo el usuario
  this.getPublicaciones();//busco las publicaciones de los seguidos
}

getPublicaciones(){
  this.publicacionDAO.buscarPublicacionesSeguidos(this.currentUser.id)//busco las publicaciones de los que sigue
      .subscribe({
        next: (data) => {
          this.publicaciones = data;//las guardo
          console.log(this.publicaciones)
          if(this.publicaciones.length==0){//si no hay ninguna muestro mensaje
            this.mostrarMensajeNinguna=true;
          }
        },
        error: (e) => console.error(e)
      });
}

detallesPublicacion(id:number){//voy a una publicacion concreta
  this.router.navigate(['/detallesPublicacion/'+id]);
}

}
