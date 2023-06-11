import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UsuarioServicioService } from 'src/app/Servicios/UsuarioServicio/usuario-servicio.service';

import { TokenStorageService } from 'src/app/Servicios/TokenServicio/token-storage.service';
import { SeguidorServicioService } from 'src/app/Servicios/SeguidorServicio/seguidor-servicio.service';
import { UsuarioDTO } from 'src/app/DTO/UsuarioDTO';

//corregido html y ts------------------

@Component({
  selector: 'app-seguidos-usuario',
  templateUrl: './seguidos-usuario.component.html',
  styleUrls: ['./seguidos-usuario.component.css']
})
export class SeguidosUsuarioComponent {
usuariosSeguidos!:UsuarioDTO[];
constructor(private usuarioServicio:UsuarioServicioService,private seguidorServicio:SeguidorServicioService, public toastr: ToastrService,private tokenService:TokenStorageService,private router:Router){}
currentUser:any
mostrarAvisoSeguidos:boolean=false;
ngOnInit(): void {
  
this.currentUser=this.tokenService.getUser();//cojo el usuario
  this.getUsuariosSeguidos();//cojo sus seguidos

}

getUsuariosSeguidos(){
  this.seguidorServicio.buscarUsuariosSeguidos(this.currentUser.id)//busco todos sus seguidos
      .subscribe({
        next: (data) => {
          this.usuariosSeguidos = data;//los guardo en el array
          if(this.usuariosSeguidos.length==0){
            this.mostrarAvisoSeguidos=true;
          }
        },
        error: (e) => console.error(e)
      });
}



detallesUsuario(idSeguido:any){//voy al usuario concreto
  this.router.navigate(['/detallesUsuario/'+idSeguido]);
}
}
