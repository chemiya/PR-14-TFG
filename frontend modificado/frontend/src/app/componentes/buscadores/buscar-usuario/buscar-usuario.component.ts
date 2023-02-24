import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioDAOService } from 'src/app/DAO/UsuarioDAO/usuario-dao.service';
import {  UsuarioDTO } from 'src/app/modelo/app.model';

//corregido html y ts-----------------

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
       
        this.usuarios.forEach(usuario=>{//cada uno limito su descripcion
          if(usuario.descripcion.length>50){
            usuario.descripcion=usuario.descripcion.substring(0,50)+"..."
          }
          
        })
      },
      error: (e) => console.error(e)
    });
  }

  ngOnInit(): void {
    
    this.formularioUsername = this.initForm();//inicio formulario
   }
  
  detallesUsuario(id:any){//voy al usuario concreto
    this.router.navigate(['/detallesUsuario/'+id]);
  }

  initForm(): FormGroup {//Inicio formulario
    return this.fb.group({
      username: ['', [Validators.required]],

    })
  }
}
