import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { PublicacionDAOService } from 'src/app/DAO/PublicacionDAO/publicacion-dao.service';
import { ComentarioDTO, PublicacionDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/DAO/TokenServicio/token-storage.service';



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
  this.publicacionDAO.getComentariosPublicacion(this.route.snapshot.params["id"])//busco todos
      .subscribe({
        next: (data) => {
          this.comentarios=data;
          console.log(data)
          if(this.comentarios.length==0){
            this.mostrarMensajeNinguno=true;
          }
          
        },
        error: (e) => console.error(e)
      });
}

getPublicacionPorId(id:number){
  this.publicacionDAO.getPublicacionPorId(id)//busco todos
      .subscribe({
        next: (data) => {
          this.publicacion=data[0];
          console.log(this.publicacion)
        },
        error: (e) => console.error(e)
      });
}




detalleReceta(id:any){
  this.router.navigate(["detallesReceta/"+id])
}

detalleUsuario(id:any){
  this.router.navigate(["detallesUsuario/"+id])
}

guardarComentario(){
  
  var comentarioEnvio={
    comentario:this.formularioComentario.value.comentarioNuevo,
    
    idUsuario:this.currentUser.id 

  }

  
  this.publicacionDAO.guardarComentario(comentarioEnvio,this.route.snapshot.params["id"])//busco todos
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
