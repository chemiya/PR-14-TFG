import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConexionAPIService } from 'src/app/conexion-api.service';
import { UsuarioDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/token-storage.service';


@Component({
  selector: 'app-seguidos-usuario',
  templateUrl: './seguidos-usuario.component.html',
  styleUrls: ['./seguidos-usuario.component.css']
})
export class SeguidosUsuarioComponent {
usuariosSeguidos!:UsuarioDTO[];
constructor(private conexionAPI:ConexionAPIService,public toastr: ToastrService,private tokenService:TokenStorageService,private router:Router){}
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
      this.toastr.success('Has dejado de seguir a ese usuario');
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
