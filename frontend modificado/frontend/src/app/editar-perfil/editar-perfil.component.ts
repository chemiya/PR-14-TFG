import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConexionAPIService } from '../conexion-api.service';
import { Usuario } from '../modelo/app.model';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent {
usuario:Usuario={
  username:"",
  password:"",
  id:0,
  email:"",
  rol:""
}
currentUser:any;
mensaje!:string;
contactForm!:FormGroup;
password!:string;

constructor(private fb: FormBuilder,public toastr: ToastrService,private conexionAPI:ConexionAPIService,private tokenStorage:TokenStorageService){}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.currentUser=this.tokenStorage.getUser();
  this.cargarDatosUsuario(this.currentUser.id);

  this.contactForm=this.initForm();


}

initForm(): FormGroup {
 
  return this.fb.group({

   
    email: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.email]],
    password: ["", [Validators.required, Validators.minLength(5)]],
    
   
  })
}


cargarDatosUsuario(id:any){
  this.conexionAPI.getUsuarioPorId(id)//busco todos
  .subscribe({
    next: (data) => {
      
      this.usuario.password=data[0].password;
      this.usuario.email=data[0].email;
      this.usuario.username=data[0].username;
      this.usuario.id=data[0].id;
     
     this.contactForm.get("email")?.setValue(this.usuario.email);
     this.contactForm.get("password")?.setValue(this.usuario.password);
     
      
      
      
    },
    error: (e) => console.error(e)
  });
}

editarDatos(){
  this.usuario.email=this.contactForm.value.email;
  this.usuario.password=this.contactForm.value.password;
  this.conexionAPI.editarUsuario(this.usuario.id,this.usuario,)//busco todos
  .subscribe({
    next: (data) => {
      this.mensaje=data.status;
      this.toastr.success( 'Datos actualizados');
     
    },
    error: (e) => console.error(e)
  });
}
}
