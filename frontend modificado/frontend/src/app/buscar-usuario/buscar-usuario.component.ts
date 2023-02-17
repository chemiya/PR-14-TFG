import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConexionAPIService } from '../conexion-api.service';
import { ResumenUsuario } from '../modelo/app.model';

@Component({
  selector: 'app-buscar-usuario',
  templateUrl: './buscar-usuario.component.html',
  styleUrls: ['./buscar-usuario.component.css']
})
export class BuscarUsuarioComponent {
  usuarios!:ResumenUsuario[];
  username!:string;
  formularioUsername!:FormGroup;
  constructor(private fb: FormBuilder,private conexionAPI:ConexionAPIService,private router:Router){}
  
  busqueda(){
    this.conexionAPI.buscarUsuarios(this.formularioUsername.value.username)//busco todos
    .subscribe({
      next: (data) => {
        this.usuarios = data;//los guardo en el array
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.formularioUsername = this.initForm();
   }
  
  detallesUsuario(id:any){
    this.router.navigate(['/detallesUsuario/'+id]);
  }

  initForm(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required]],
   
     
      
     
    })
  }
}
