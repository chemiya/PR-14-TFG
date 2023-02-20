import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConexionAPIService } from 'src/app/conexion-api.service';
import { UsuarioDAOService } from 'src/app/DAO/UsuarioDAO/usuario-dao.service';
import { UsuarioDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/token-storage.service';


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
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.contactForm = this.initForm();
}

initForm(): FormGroup {
  return this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.email]],
    
   
  })
}


   submit(){
    console.log(this.contactForm.value);
    this.usuario.username=this.contactForm.value.username;
    this.usuario.email=this.contactForm.value.email;
    this.usuario.password=this.contactForm.value.password;
    console.log(this.usuario);
   
    this.usuarioDAO.registro(this.usuario)//lo llamo para que lo guarde
    .subscribe({
      next: (res) => {
      console.log(res.status)
        this.router.navigate(['/identificacion']).then(() => {
          this.toastr.success('Te has registrado con exito');
        });
        
      },
      error: (e) => console.error(e)
    });
  }
}
