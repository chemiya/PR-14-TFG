import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UsuarioServicioService } from 'src/app/Servicios/UsuarioServicio/usuario-servicio.service';

import { TokenStorageService } from 'src/app/Servicios/TokenServicio/token-storage.service';
import { AuthService } from 'src/app/Servicios/GuardaServicio/auth.service';
import { UsuarioDTO } from 'src/app/DTO/UsuarioDTO';


//corregido html y ts-------------------

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent {

  contactForm!: FormGroup;
  encontradoUsername: boolean = false;
  encontradoEmail: boolean = false;

  constructor(private usuarioServicio: UsuarioServicioService,private authServicio:AuthService, public toastr: ToastrService, private fb: FormBuilder, private router: Router, private tokenStorage: TokenStorageService) { }



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

  ngOnInit(): void {

    this.contactForm = this.initForm();//inicio el formulario
  }

  initForm(): FormGroup {//inicio del formilario
    return this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],//5-50 caracteres y obligatorio
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],//5-50 caracteres y obligatorio
      confirmPassword: ['', []],// coincidir
      email: ['', [Validators.required, Validators.email]]/*obligatorio y formato de email */
     


    },
      {
        validator: this.ConfirmedValidator('password', 'confirmPassword')//para validar que las contraseñas coinciden
      })
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];//cojo los campos del formulario
      const matchingControl = formGroup.controls[matchingControlName];

      if (control.value !== matchingControl.value) {//si los valores no coinciden
        matchingControl.setErrors({ confirmedValidator: true });//en el campo de repetir pongo error
        console.log("no coinciden")
      } else {
        matchingControl.setErrors(null);
      }
    };
  }


  submit() {

    if (this.encontradoEmail != true || this.encontradoUsername != true) {//se permite el registro si no hay repetidos

      //guardo los campos
      this.usuario.username = this.contactForm.value.username;
      this.usuario.email = this.contactForm.value.email;
      this.usuario.password = this.contactForm.value.password;
      console.log(this.usuario);

      this.authServicio.registro(this.usuario)//registro el usuario
        .subscribe({
          next: (res) => {
            console.log(res.status)
            this.router.navigate(['/identificacion']).then(() => {//navego al login
              this.toastr.success('Te has registrado con éxito');
            });

          },
          error: (e) => console.error(e)
        });
    }
  }


  valueChangeEmail(entrada: any) {
    this.usuarioServicio.comprobarEmailRepetido(this.contactForm.value.email)//compruebo email repetido
      .subscribe({
        next: (res) => {
          if (res.status == "encontrado") {
            this.encontradoEmail = true;//pongo a viso
          } else {
            this.encontradoEmail = false;
          }


        },
        error: (e) => console.error(e)
      });
  }

  valueChangeUsername(entrada: any) {
    this.usuarioServicio.comprobarUsernameRepetido(this.contactForm.value.username)//compruebo username repetido
      .subscribe({
        next: (res) => {
          if (res.status == "encontrado") {
            this.encontradoUsername = true;//Pongo aviso
          } else {
            this.encontradoUsername = false;
          }


        },
        error: (e) => console.error(e)
      });
  }
}

