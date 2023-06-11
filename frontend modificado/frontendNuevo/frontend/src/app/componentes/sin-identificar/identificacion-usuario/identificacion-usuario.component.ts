import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioServicioService } from 'src/app/Servicios/UsuarioServicio/usuario-servicio.service';

import { TokenStorageService } from 'src/app/Servicios/TokenServicio/token-storage.service';
import { AuthService } from 'src/app/Servicios/GuardaServicio/auth.service';
import { UsuarioDTO } from 'src/app/DTO/UsuarioDTO';

//corregido html y ts---------------------------

@Component({
  selector: 'app-identificacion-usuario',
  templateUrl: './identificacion-usuario.component.html',
  styleUrls: ['./identificacion-usuario.component.css']
})
export class IdentificacionUsuarioComponent {
  usuario: UsuarioDTO = {
    id: 0,
    username: "",
    password: "",
    email: "",
    rol: "",
    foto: new File([], ""),
    fotoRuta: "",
    descripcion: "",
    seguidores: 0,
    seguidos: 0
  }
  mensaje!: String

  contactForm!: FormGroup;

  constructor(private fb: FormBuilder, private authServicio: AuthService, private usuarioServicio: UsuarioServicioService, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {

    this.contactForm = this.initForm();//inicio el formulario
  }


  initForm(): FormGroup {//inicio del formulario
    return this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],



    })
  }


  submit() {


    //cojo loscampos del fomrulario
    this.usuario.username = this.contactForm.value.username;
    this.usuario.email = this.contactForm.value.email;
    this.usuario.password = this.contactForm.value.password;
   

    this.authServicio.identificacion(this.usuario)//identifico al usuario
      .subscribe({
        next: (res) => {
          console.log(res)
          if (res.status == "usuario y contrasena incorrectos") {//incorrecto muestro mensaje
            this.mensaje = "Usuario y contraseña incorrectos";

          } else {
            this.tokenStorage.saveToken(res.token);//guardo el usuario
            this.tokenStorage.saveUser(res);
            if (res.rol == "user") {//usuario voy a las publicaciones
              this.router.navigate(['/muroPublicaciones']);
            } else {//admin voy al panel admin
              this.router.navigate(['/admin']);
            }

          }



        },
        error: (e) => console.error(e)
      });
  }
}

