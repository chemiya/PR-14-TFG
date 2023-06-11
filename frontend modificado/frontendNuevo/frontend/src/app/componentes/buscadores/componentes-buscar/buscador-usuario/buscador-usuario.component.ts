import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioServicioService } from 'src/app/Servicios/UsuarioServicio/usuario-servicio.service';
import { UsuarioDTO } from 'src/app/DTO/UsuarioDTO';


@Component({
  selector: 'app-buscador-usuario',
  templateUrl: './buscador-usuario.component.html',
  styleUrls: ['./buscador-usuario.component.css']
})
export class BuscadorUsuarioComponent {
  usuarios!:UsuarioDTO[];
  username!:string;
  formularioUsername!:FormGroup;
  mostrarAvisoNinguno:boolean=false;
  constructor(private fb: FormBuilder,private usuarioServicio:UsuarioServicioService,private router:Router){}

  
  
  busqueda(){
    this.usuarioServicio.buscarUsuarios(this.formularioUsername.value.username)//busco todos
    .subscribe({
      next: (data) => {
        this.usuarios = data;//los guardo en el array

        if(data.length==0){
          this.mostrarAvisoNinguno=true;
        }else{
          this.mostrarAvisoNinguno=false;
        }
       
      
      },
      error: (e) => console.error(e)
    });
  }

  ngOnInit(): void {
    
    this.formularioUsername = this.initForm();//inicio formulario
    this.busqueda()
   }
  
  detallesUsuario(id:any){//voy al usuario concreto
    this.router.navigate(['/detallesUsuario/'+id]);
  }

  initForm(): FormGroup {//Inicio formulario
    return this.fb.group({
      username: ['', [Validators.required]],

    })
  }
}
