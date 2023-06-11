import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { PublicacionServicioService } from 'src/app/Servicios/PublicacionServicio/publicacion-servicio.service';

import { TokenStorageService } from 'src/app/Servicios/TokenServicio/token-storage.service';
import { ComentarioServicioService } from 'src/app/Servicios/ComentarioServicio/comentario-servicio.service';
import { PublicacionDTO } from 'src/app/DTO/PublicacionDTO';
import { ComentarioDTO } from 'src/app/DTO/ComentarioDTO';

//corregido html y ts------------

@Component({
  selector: 'app-detalle-publicacion',
  templateUrl: './detalle-publicacion.component.html',
  styleUrls: ['./detalle-publicacion.component.css']
})
export class DetallePublicacionComponent {
publicacion!:PublicacionDTO;
comentarios!:ComentarioDTO[];
mostrarMensajeNinguno:boolean=false;

comentarioNuevo!:string
currentUser!:any
formularioComentario!:FormGroup;
fechaTexto!:string
tieneAlimento:boolean=false;

constructor(private fb:FormBuilder,private comentarioServicio:ComentarioServicioService, private publicacionServicio:PublicacionServicioService, public toastr: ToastrService,private route: ActivatedRoute,private router:Router, private tokenService:TokenStorageService){}


ngOnInit(): void {
 
  this.getPublicacionPorId(this.route.snapshot.params["id"]);//busco los datos concretos
  this.getComentarios();//Busco sus comentarios de la publicacion
  this.currentUser=this.tokenService.getUser();//cargo el usuario
  this.formularioComentario = this.initForm();//inicio el formulario
}



 initForm(): FormGroup {//Inicio el formualrio
  return this.fb.group({
    comentarioNuevo: ['', [Validators.required]],

  })
}



getComentarios(){
  this.comentarioServicio.buscarComentariosPublicacion(this.route.snapshot.params["id"])//busco todos los comentarios
      .subscribe({
        next: (data) => {
          this.comentarios=data;//los guardo
          console.log(data)
          if(this.comentarios.length==0){
            this.mostrarMensajeNinguno=true;//si no hay ninguno
          }
          
        },
        error: (e) => console.error(e)
      });
}

getPublicacionPorId(id:number){//Busco la publicacion por id
  this.publicacionServicio.buscarPublicacionPorId(id)
      .subscribe({
        next: (data) => {
          if(data.length==0){
            console.log("error")
            this.router.navigate(['/muroPublicaciones']);
          }else{
            this.publicacion=data[0];//la guardo
        

            if(this.publicacion.nombreAlimento!=null){
              this.tieneAlimento=true;
            }

          
          this.fechaTexto=this.publicacion.fechapublicacion.toString()
          var sitioT=this.fechaTexto.indexOf("T")
          var fecha=this.fechaTexto.substring(0,sitioT)
          var hora=this.fechaTexto.substring(sitioT+1,this.fechaTexto.length-5)
          
          this.fechaTexto=fecha +" a las "+hora

          }


          

          
        },
        error: (e) => console.error(e)
      });
}




detalleReceta(id:any){//voy a la receta concreta
  this.router.navigate(["detallesReceta/"+id])
}

detalleAlimento(id:any){//voy a la receta concreta
  this.router.navigate(["detallesAlimento/"+id])
}

detalleUsuario(id:any){//voy a l usuario concreto
  this.router.navigate(["detallesUsuario/"+id])
}

guardarComentario(){//guardo el comentario
  
  var comentarioEnvio={//lo proceso
    comentario:this.formularioComentario.value.comentarioNuevo,
    idUsuario:this.currentUser.id 

  }

  
  this.comentarioServicio.guardarComentario(comentarioEnvio,this.route.snapshot.params["id"])//lo guardo
  .subscribe({
    next: (data) => {
      console.log(data)
      this.toastr.success( 'Comentario guardado');
      this.getComentarios();
      
    },
    error: (e) => console.error(e)
  });
}


}
