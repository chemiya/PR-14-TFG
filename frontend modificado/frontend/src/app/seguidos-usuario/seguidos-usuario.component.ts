import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionAPIService } from '../conexion-api.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-seguidos-usuario',
  templateUrl: './seguidos-usuario.component.html',
  styleUrls: ['./seguidos-usuario.component.css']
})
export class SeguidosUsuarioComponent {
usuariosSeguidos:any=[];
constructor(private conexionAPI:ConexionAPIService,private tokenService:TokenStorageService,private router:Router){}
currentUser:any
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
this.currentUser=this.tokenService.getUser();
  this.getUsuariosSeguidos(this.currentUser.id);

}

getUsuariosSeguidos(id:any){
  this.conexionAPI.getUsuariosSeguidos(id)//busco todos
      .subscribe({
        next: (data) => {
          this.usuariosSeguidos = data;//los guardo en el array
          console.log(data);
        },
        error: (e) => console.error(e)
      });
}

eliminarSeguimiento(id:any,event:Event){
  event.stopPropagation();
  this.conexionAPI.eliminarSeguimiento(id,this.currentUser.id)//busco todos
  .subscribe({
    next: (data) => {
      
      console.log(data);
      this.getUsuariosSeguidos(this.currentUser.id);
    },
    error: (e) => console.error(e)
  });
}

detallesUsuario(idSeguido:any){
  this.router.navigate(['/detallesUsuario/'+idSeguido]);
}
}
