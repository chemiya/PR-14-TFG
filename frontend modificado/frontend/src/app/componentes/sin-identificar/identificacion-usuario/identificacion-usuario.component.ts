import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioDAOService } from 'src/app/DAO/UsuarioDAO/usuario-dao.service';
import {  UsuarioDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/DAO/TokenServicio/token-storage.service';


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
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.contactForm = this.initForm();
 }


 initForm(): FormGroup {
  return this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
   
    
   
  })
}


 submit(){
  //console.log(this.contactForm.value);
  this.usuario.username=this.contactForm.value.username;
  this.usuario.email=this.contactForm.value.email;
  this.usuario.password=this.contactForm.value.password;
  console.log(this.usuario);

  this.usuarioDAO.identificacion(this.usuario)//lo llamo para que lo guarde
  .subscribe({
    next: (res) => {
      console.log(res)
    if(res.status=="usuario y contrasena incorrectos"){
this.mensaje="usuario y contrasena incorrectos";

    }else{
      this.tokenStorage.saveToken(res.token);
      this.tokenStorage.saveUser(res);
      if(res.rol=="user"){
        this.router.navigate(['/muroPublicaciones']);
      }else{
        this.router.navigate(['/admin']);
      }
     
    }
    
      
      
    },
    error: (e) => console.error(e)
  });
}
 }

