import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioServicioService } from 'src/app/Servicios/UsuarioServicio/usuario-servicio.service';

import { TokenStorageService } from 'src/app/Servicios/TokenServicio/token-storage.service';
import { SeguidorServicioService } from 'src/app/Servicios/SeguidorServicio/seguidor-servicio.service';
import { UsuarioDTO } from 'src/app/DTO/UsuarioDTO';


//corregido html y ts-------------------

@Component({
  selector: 'app-seguidores-usuario',
  templateUrl: './seguidores-usuario.component.html',
  styleUrls: ['./seguidores-usuario.component.css']
})
export class SeguidoresUsuarioComponent {
  usuarioSeguidores!:UsuarioDTO[];
  constructor(private usuarioServicio:UsuarioServicioService,private seguidorServicio:SeguidorServicioService, private router:Router,private tokenService:TokenStorageService){}
  currentUser:any
  mostrarAvisoSeguidores:boolean=false;
  ngOnInit(): void {
    
  this.currentUser=this.tokenService.getUser();//cojo el usuario
    this.getUsuarioSeguidores(this.currentUser.id);//cojo sus seguidores
  
  }
  
  getUsuarioSeguidores(id:any){
    this.seguidorServicio.buscarUsuarioSeguidores(id)//busco sus seguidores
        .subscribe({
          next: (data) => {
            this.usuarioSeguidores = data;//los guardo en el array
            if(this.usuarioSeguidores.length==0){
              this.mostrarAvisoSeguidores=true;
            }
          },
          error: (e) => console.error(e)
        });
  }


  detalleUsuario(id:any){//voy a un usuario concreto
    this.router.navigate(['/detallesUsuario/'+id]);
  }
}
