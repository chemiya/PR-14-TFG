import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UsuarioDAOService } from 'src/app/DAO/UsuarioDAO/usuario-dao.service';
import { UsuarioDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/DAO/TokenServicio/token-storage.service';


//corregido html y ts-------------------

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent {
  
  contactForm!: FormGroup;

  
   constructor(private usuarioDAO:UsuarioDAOService,public toastr: ToastrService,private fb: FormBuilder, private router:Router, private tokenStorage: TokenStorageService){}
  
  

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

ngOnInit(): void {
 
  this.contactForm = this.initForm();//inicio el formulario
}

initForm(): FormGroup {//inicio del formilario
  return this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.email]],
    
   
  })
}


   submit(){
    
    
    //guardo los campos
    this.usuario.username=this.contactForm.value.username;
    this.usuario.email=this.contactForm.value.email;
    this.usuario.password=this.contactForm.value.password;
    console.log(this.usuario);
   
    this.usuarioDAO.registro(this.usuario)//registro el usuario
    .subscribe({
      next: (res) => {
      console.log(res.status)
        this.router.navigate(['/identificacion']).then(() => {//navego al login
          this.toastr.success('Te has registrado con exito');
        });
        
      },
      error: (e) => console.error(e)
    });
  }
}

