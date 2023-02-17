import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionAPIService } from '../conexion-api.service';
import { Comentario, Publicacion, ResumenPublicacion } from '../modelo/app.model';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-detalle-publicacion',
  templateUrl: './detalle-publicacion.component.html',
  styleUrls: ['./detalle-publicacion.component.css']
})
export class DetallePublicacionComponent {
publicacion!:ResumenPublicacion;
comentarios!:Comentario[];
mostrarMensajeNinguno:boolean=false;

comentarioNuevo!:string
currentUser!:any
formularioComentario!:FormGroup;

constructor(private fb:FormBuilder,private conexionAPI:ConexionAPIService,private route: ActivatedRoute,private router:Router, private tokenService:TokenStorageService){}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getPublicacionPorId(this.route.snapshot.params["id"]);
  this.getComentarios();
  this.currentUser=this.tokenService.getUser();
  this.formularioComentario = this.initForm();
}



 initForm(): FormGroup {
  return this.fb.group({
    comentarioNuevo: ['', [Validators.required]],
 
   
    
   
  })
}

getComentarios(){
  this.conexionAPI.getComentariosPublicacion(this.route.snapshot.params["id"])//busco todos
      .subscribe({
        next: (data) => {
          this.comentarios=data;
          if(this.comentarios.length==0){
            this.mostrarMensajeNinguno=true;
          }
          
        },
        error: (e) => console.error(e)
      });
}

getPublicacionPorId(id:number){
  this.conexionAPI.getPublicacionPorId(id)//busco todos
      .subscribe({
        next: (data) => {
          this.publicacion=data[0];
          console.log(this.publicacion)
        },
        error: (e) => console.error(e)
      });
}


detalleUsuario(id:any){
  this.router.navigate(["detallesUsuario/"+id])
}

detalleReceta(id:any){
  this.router.navigate(["detallesReceta/"+id])
}

guardarComentario(){
  
  var comentarioEnvio={
    comentario:this.formularioComentario.value.comentarioNuevo,
    
    idUsuario:this.currentUser.id 

  }

  
  this.conexionAPI.guardarComentario(comentarioEnvio,this.route.snapshot.params["id"])//busco todos
  .subscribe({
    next: (data) => {
      console.log(data)
      this.getComentarios();
      
    },
    error: (e) => console.error(e)
  });
}


}
