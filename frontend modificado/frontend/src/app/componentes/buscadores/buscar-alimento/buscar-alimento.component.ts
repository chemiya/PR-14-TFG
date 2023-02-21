import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlimentoDAOService } from 'src/app/DAO/AlimentoDAO/alimento-dao.service';
import { AlimentoDTO } from 'src/app/modelo/app.model';


@Component({
  selector: 'app-buscar-alimento',
  templateUrl: './buscar-alimento.component.html',
  styleUrls: ['./buscar-alimento.component.css']
})
export class BuscarAlimentoComponent {
 alimentos!:AlimentoDTO[];
  nombre!:string;
  formularioNombre!:FormGroup;
  constructor(private fb:FormBuilder,private alimentoDAO:AlimentoDAOService,private router:Router){}
  
  busqueda(){
    this.alimentoDAO.buscarAlimentos(this.formularioNombre.value.nombre)//busco todos
    .subscribe({
      next: (data) => {
        this.alimentos = data;//los guardo en el array
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
  
  detallesAlimento(id:any){
    this.router.navigate(['/detallesAlimento/'+id]);
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.formularioNombre = this.initForm();
   }
  
   initForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required]],
   
     
      
     
    })
  }
}
