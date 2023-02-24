import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { PublicacionDAOService } from 'src/app/DAO/PublicacionDAO/publicacion-dao.service';
import { ComentarioDTO, PublicacionDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/DAO/TokenServicio/token-storage.service';

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

constructor(private fb:FormBuilder,private publicacionDAO:PublicacionDAOService, public toastr: ToastrService,private route: ActivatedRoute,private router:Router, private tokenService:TokenStorageService){}


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
  this.publicacionDAO.getComentariosPublicacion(this.route.snapshot.params["id"])//busco todos los comentarios
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
  this.publicacionDAO.getPublicacionPorId(id)
      .subscribe({
        next: (data) => {
          this.publicacion=data[0];//la guardo
          console.log(this.publicacion)
        },
        error: (e) => console.error(e)
      });
}




detalleReceta(id:any){//voy a la receta concreta
  this.router.navigate(["detallesReceta/"+id])
}

detalleUsuario(id:any){//voy a l usuario concreto
  this.router.navigate(["detallesUsuario/"+id])
}

guardarComentario(){//guardo el comentario
  
  var comentarioEnvio={//lo proceso
    comentario:this.formularioComentario.value.comentarioNuevo,
    idUsuario:this.currentUser.id 

  }

  
  this.publicacionDAO.guardarComentario(comentarioEnvio,this.route.snapshot.params["id"])//lo guardo
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
