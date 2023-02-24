import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RecetaDAOService } from 'src/app/DAO/RecetaDAO/receta-dao.service';
import { RecetaDTO } from 'src/app/modelo/app.model';

//corregido html y ts-----------------

@Component({
  selector: 'app-buscar-receta',
  templateUrl: './buscar-receta.component.html',
  styleUrls: ['./buscar-receta.component.css']
})
export class BuscarRecetaComponent {
recetas:RecetaDTO[]=[];
titulo!:string;
formularioTitulo!:FormGroup;
constructor(private fb: FormBuilder,private recetaDAO:RecetaDAOService,private router:Router){}

busqueda(){
  this.recetaDAO.buscarRecetas(this.formularioTitulo.value.titulo)//busco todos
  .subscribe({
    next: (data) => {
      this.recetas = data;//los guardo en el array
      console.log(data);
    },
    error: (e) => console.error(e)
  });
}


detallesReceta(id:any){//voy a la receta concreta
  this.router.navigate(['/detallesReceta/'+id]);
}

ngOnInit(): void {
  
  this.formularioTitulo = this.initForm();//inicio el form
 }

 initForm(): FormGroup {//Inicio el form
  return this.fb.group({
    titulo: ['', [Validators.required]],
 

  })
}
}
