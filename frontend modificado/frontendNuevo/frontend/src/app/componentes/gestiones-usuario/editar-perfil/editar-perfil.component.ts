import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { UsuarioDAOService } from 'src/app/DAO/UsuarioDAO/usuario-dao.service';
import { UsuarioDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/DAO/TokenServicio/token-storage.service';

//corregido html y ts-------------

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent {
usuario:UsuarioDTO={
  username:"",
  password:"",
  id:0,
  email:"",
  rol:"",
  fotoRuta:"",
  descripcion:"",
  foto:new File([],""),
  seguidores:0,
  seguidos:0
}
currentUser:any;
mensaje!:string;
contactForm!:FormGroup;
password!:string;
selectedFiles?: FileList;
  currentFile?: File;
  cambioValor:boolean=false;
  validacion:number=0;
  contadorCambios:number=0;
  activarBoton:boolean=false

constructor(private fb: FormBuilder,public usuarioDAO:UsuarioDAOService, public toastr: ToastrService,private tokenStorage:TokenStorageService){}
ngOnInit(): void {
 
  this.currentUser=this.tokenStorage.getUser();//cargo el usuario
  this.cargarDatosUsuario(this.currentUser.id);//busco todos su datos

  this.contactForm=this.initForm();//inicio el formulario


}

initForm(): FormGroup {//inicio el formulario
 
  return this.fb.group({

   
    email: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.email]],
    password: ["", [Validators.required, Validators.minLength(5)]],
    descripcion: ["", [Validators.required]]
    
   
  })
}


cargarDatosUsuario(id:any){
  this.usuarioDAO.buscarUsuarioPorId(id)//busco el usuario por id
  .subscribe({
    next: (data) => {
      
      this.usuario.password=data[0].password;
      this.usuario.email=data[0].email;
      this.usuario.username=data[0].username;
      this.usuario.id=data[0].id;
      this.usuario.descripcion=data[0].descripcion;
      this.usuario.fotoRuta=data[0].fotoRuta;
     
     
     this.contactForm.get("email")?.setValue(this.usuario.email);//pongo los datos en el formulario
     this.contactForm.get("password")?.setValue(this.usuario.password);
     this.contactForm.get("descripcion")?.setValue(this.usuario.descripcion);
     
      
      
      
    },
    error: (e) => console.error(e)
  });
}

selectFile(event: any): void {//selecciono archivo de perfil
  this.valueChange("file")
  this.selectedFiles = event.target.files;
}

editarDatos(){
  this.usuario.email=this.contactForm.value.email;
  this.usuario.password=this.contactForm.value.password;
  this.usuario.descripcion=this.contactForm.value.descripcion//cojo los nuevos campos del formulario
 


  var file: File | null;

  if (this.selectedFiles) {
    file = this.selectedFiles.item(0);//si hay algun archivo

    if (file) {
      this.currentFile = file;

      console.log(this.currentFile)

      this.usuario.foto = this.currentFile;//asigno la foto al usuario

    }
  }

      this.usuarioDAO.actualizarUsuario(this.usuario.id,this.usuario)//guardo cambios
      .subscribe({
        next: (data) => {
          this.mensaje=data.status;
          this.toastr.success( 'Datos actualizados');
         
        },
        error: (e) => console.error(e)
      });
    
  


  
}

valueChange(entrada:any){
  this.contadorCambios++;
  if(this.contadorCambios>3){
    this.cambioValor=true;
  }

  this.validacion=0;
 
  var controlErrors: ValidationErrors = this.contactForm?.get('email')?.errors as ValidationErrors;
  if (controlErrors == null) {
    this.validacion++
  }

  controlErrors = this.contactForm?.get('password')?.errors as ValidationErrors;
  if (controlErrors == null) {
    this.validacion++
  }

  controlErrors = this.contactForm?.get('descripcion')?.errors as ValidationErrors;
  if (controlErrors == null) {
    this.validacion++
  }

  if(this.validacion==3 && this.cambioValor==true){
    this.activarBoton=true;
    console.log("activado")
  }else{
    this.activarBoton=false;
    console.log("desactivado")
  }



  /*Object.keys(this.contactForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.contactForm?.get(key)?.errors as ValidationErrors;
    if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
       console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
      });
      this.validacion=false;
    }else{
      this.validacion=true;
    }


  });*/



 
}

}
