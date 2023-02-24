import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioDAOService } from 'src/app/DAO/UsuarioDAO/usuario-dao.service';
import {  UsuarioDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/DAO/TokenServicio/token-storage.service';

//corregido html y ts---------------------------

@Component({
  selector: 'app-identificacion-usuario',
  templateUrl: './identificacion-usuario.component.html',
  styleUrls: ['./identificacion-usuario.component.css']
})
export class IdentificacionUsuarioComponent {
 usuario:UsuarioDTO={
  id:0,
  username:"",
  password:"",
  email:"",
  rol:"",
  foto:new File([],""),
  fotoRuta:"",
  descripcion:"",
  seguidores:0,
  seguidos:0
 }
 mensaje!:String

contactForm!:FormGroup;

 constructor(private fb: FormBuilder,private usuarioDAO:UsuarioDAOService, private router:Router, private tokenStorage: TokenStorageService){}

 ngOnInit(): void {
  
  this.contactForm = this.initForm();//inicio el formulario
 }


 initForm(): FormGroup {//inicio del formulario
  return this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
   
    
   
  })
}


 submit(){


  //cojo loscampos del fomrulario
  this.usuario.username=this.contactForm.value.username;
  this.usuario.email=this.contactForm.value.email;
  this.usuario.password=this.contactForm.value.password;
  console.log(this.usuario);

  this.usuarioDAO.identificacion(this.usuario)//identifico al usuario
  .subscribe({
    next: (res) => {
      console.log(res)
    if(res.status=="usuario y contrasena incorrectos"){//incorrecto muestro mensaje
this.mensaje="usuario y contrasena incorrectos";

    }else{
      this.tokenStorage.saveToken(res.token);//guardo el usuario
      this.tokenStorage.saveUser(res);
      if(res.rol=="user"){//usuario voy a las publicaciones
        this.router.navigate(['/muroPublicaciones']);
      }else{//admin voy al panel admin
        this.router.navigate(['/admin']);
      }
     
    }
    
      
      
    },
    error: (e) => console.error(e)
  });
}
 }

