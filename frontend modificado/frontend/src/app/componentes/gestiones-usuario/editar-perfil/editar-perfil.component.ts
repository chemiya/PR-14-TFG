import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { UsuarioDAOService } from 'src/app/DAO/UsuarioDAO/usuario-dao.service';
import { UsuarioDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/DAO/TokenServicio/token-storage.service';


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

constructor(private fb: FormBuilder,public usuarioDAO:UsuarioDAOService, public toastr: ToastrService,private tokenStorage:TokenStorageService){}
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
    descripcion: ["", [Validators.required]]
    
   
  })
}


cargarDatosUsuario(id:any){
  this.usuarioDAO.getUsuarioPorId(id)//busco todos
  .subscribe({
    next: (data) => {
      
      this.usuario.password=data[0].password;
      this.usuario.email=data[0].email;
      this.usuario.username=data[0].username;
      this.usuario.id=data[0].id;
      this.usuario.descripcion=data[0].descripcion;
      this.usuario.fotoRuta=data[0].fotoRuta;
     
     
     this.contactForm.get("email")?.setValue(this.usuario.email);
     this.contactForm.get("password")?.setValue(this.usuario.password);
     this.contactForm.get("descripcion")?.setValue(this.usuario.descripcion);
     
      
      
      
    },
    error: (e) => console.error(e)
  });
}

selectFile(event: any): void {
  this.selectedFiles = event.target.files;
}

editarDatos(){
  this.usuario.email=this.contactForm.value.email;
  this.usuario.password=this.contactForm.value.password;
  this.usuario.descripcion=this.contactForm.value.descripcion

  if (this.selectedFiles) {
    const file: File | null = this.selectedFiles.item(0);

    if (file) {
      this.currentFile = file;

      console.log(this.currentFile)

      
      this.usuario.foto = this.currentFile;

      this.usuarioDAO.editarUsuario(this.usuario.id,this.usuario)//busco todos
      .subscribe({
        next: (data) => {
          this.mensaje=data.status;
          this.toastr.success( 'Datos actualizados');
         
        },
        error: (e) => console.error(e)
      });
    }
  }






  
}
}
