import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConexionAPIService } from 'src/app/conexion-api.service';
import { UsuarioDAOService } from 'src/app/DAO/UsuarioDAO/usuario-dao.service';
import {  UsuarioDTO } from 'src/app/modelo/app.model';


@Component({
  selector: 'app-buscar-usuario',
  templateUrl: './buscar-usuario.component.html',
  styleUrls: ['./buscar-usuario.component.css']
})
export class BuscarUsuarioComponent {
  usuarios!:UsuarioDTO[];
  username!:string;
  formularioUsername!:FormGroup;
  constructor(private fb: FormBuilder,private usuarioDAO:UsuarioDAOService,private router:Router){}
  
  busqueda(){
    this.usuarioDAO.buscarUsuarios(this.formularioUsername.value.username)//busco todos
    .subscribe({
      next: (data) => {
        this.usuarios = data;//los guardo en el array
       
        this.usuarios.forEach(usuario=>{
          if(usuario.descripcion.length>50){
            usuario.descripcion=usuario.descripcion.substring(0,50)+"..."
          }
          
        })
      },
      error: (e) => console.error(e)
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.formularioUsername = this.initForm();
   }
  
  detallesUsuario(id:any){
    this.router.navigate(['/detallesUsuario/'+id]);
  }

  initForm(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required]],
   
     
      
     
    })
  }
}
