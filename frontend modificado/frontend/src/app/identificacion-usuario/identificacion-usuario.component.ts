import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConexionAPIService } from '../conexion-api.service';
import { Usuario } from '../modelo/app.model';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-identificacion-usuario',
  templateUrl: './identificacion-usuario.component.html',
  styleUrls: ['./identificacion-usuario.component.css']
})
export class IdentificacionUsuarioComponent {
 usuario:Usuario={
  id:0,
  username:"",
  password:"",
  email:"",
  rol:""
 }
 mensaje!:String

contactForm!:FormGroup;

 constructor(private fb: FormBuilder,private conexionAPI:ConexionAPIService, private router:Router, private tokenStorage: TokenStorageService){}

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
  console.log(this.contactForm.value);
  this.usuario.username=this.contactForm.value.username;
  this.usuario.email=this.contactForm.value.email;
  this.usuario.password=this.contactForm.value.password;
  console.log(this.usuario);

  this.conexionAPI.identificacion(this.usuario)//lo llamo para que lo guarde
  .subscribe({
    next: (res) => {
      console.log(res)
    if(res.message=="usuario y contrasena incorrectos"){
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

