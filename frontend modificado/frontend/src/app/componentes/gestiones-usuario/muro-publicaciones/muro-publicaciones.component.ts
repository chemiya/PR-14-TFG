import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionAPIService } from 'src/app/conexion-api.service';
import { PublicacionDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/token-storage.service';


@Component({
  selector: 'app-muro-publicaciones',
  templateUrl: './muro-publicaciones.component.html',
  styleUrls: ['./muro-publicaciones.component.css']
})
export class MuroPublicacionesComponent {
publicaciones?:PublicacionDTO[];
currentUser:any;
mostrarMensajeNinguna:boolean=false;
constructor(private conexionAPI:ConexionAPIService,private router:Router,private tokenStorage:TokenStorageService){}

ngOnInit(): void {
  this.currentUser=this.tokenStorage.getUser();
  this.getPublicaciones();//busco los tutoriales
}

getPublicaciones(){
  this.conexionAPI.getPublicacionesSeguidos(this.currentUser.id)//busco todos
      .subscribe({
        next: (data) => {
          this.publicaciones = data;//los guardo en el array
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