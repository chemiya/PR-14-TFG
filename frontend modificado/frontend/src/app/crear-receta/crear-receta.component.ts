import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConexionAPIService } from '../conexion-api.service';
import { AlimentoReceta, Receta, ResumenAlimento, ResumenAlimentoReceta } from '../modelo/app.model';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-crear-receta',
  templateUrl: './crear-receta.component.html',
  styleUrls: ['./crear-receta.component.css']
})
export class CrearRecetaComponent {
receta:Receta={
  titulo:"",
  resumen:"",
  pasos:"",
  tiempo:0,
  id:0,
  idCreador:0
}
currentUser:any;
mensaje!:string;
formularioReceta!:FormGroup;
formularioNombre!:FormGroup;
alimentos!:ResumenAlimento[];
ingredientesVacio:boolean=true;
alimentosCantidadesCero:boolean=false;
alimentosReceta:ResumenAlimentoReceta[]=[];

constructor(private fb:FormBuilder,private conexionAPI:ConexionAPIService,private tokenService:TokenStorageService, private router:Router){}

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.currentUser=this.tokenService.getUser();
  this.formularioReceta = this.initForm();
  this.formularioNombre= this.initFormNombre();
}


guardarReceta(){
  
if(this.alimentosCantidadesCero==false){

  this.receta.idCreador=this.currentUser.id;
  this.receta.titulo=this.formularioReceta.value.titulo;
  this.receta.resumen=this.formularioReceta.value.resumen;
  this.receta.pasos=this.formularioReceta.value.pasos;
  this.receta.tiempo=this.formularioReceta.value.tiempo;
  this.conexionAPI.guardarReceta(this.receta)//busco todos
      .subscribe({
        next: (data) => {
         this.receta.id=data.id
         this.alimentosReceta.forEach(alimentoReceta=>{
          var alimentoRecetaConvertido:AlimentoReceta={
            idAlimento:0,
            idReceta:0,
            cantidad:0,
            id:0
  
          }
  
          alimentoRecetaConvertido.idAlimento=alimentoReceta.idAlimento;
          alimentoRecetaConvertido.cantidad=alimentoReceta.cantidad;
       
        
  
  console.log("tengo en receta id"+this.receta.id)
          this.conexionAPI.guardarAlimentoReceta(alimentoRecetaConvertido,this.receta.id)
          .subscribe({
            next: (data) => {
             console.log(data)
              this.router.navigate(["/muroPublicaciones"])
            },
            error: (e) => console.error(e)
          });
        })
         
        },
        error: (e) => console.error(e)
      });

     
    }   
}


initForm(): FormGroup {
  return this.fb.group({
    titulo: ['', [Validators.required]],
    resumen: ['', [Validators.required]],
    pasos: ['', [Validators.required]],
   tiempo: ['', [Validators.required]],
 
   
    
   
  })
}



initFormNombre(): FormGroup {
  return this.fb.group({
    nombre: ['', [Validators.required]],
 
   
    
   
  })
}

anadirAlimento(id:any, nombre:string){
   var alimentoAnadir:ResumenAlimentoReceta={
    id:0,
    cantidad:0,
    idAlimento:0,
    alimento:""
    }
  alimentoAnadir.alimento=nombre;
  alimentoAnadir.idAlimento=id;
  
  this.alimentosReceta.push(alimentoAnadir);
  this.ingredientesVacio=false;
  this.alimentosCantidadesCero=true;
}

comprobacionCero(event:Event){

  this.alimentosReceta.forEach(alimento=>{
   
    if(alimento.cantidad==0){
      
      this.alimentosCantidadesCero=true;
    }else{
      this.alimentosCantidadesCero=false;
    }
  })
}

eliminarAlimento(id:any){
  console.log(id)
 
this.alimentosReceta=this.alimentosReceta.filter((alimento)=>alimento.idAlimento!==id)
if(this.alimentosReceta.length==0){
  this.ingredientesVacio=true;
}

}


busqueda(){
  this.conexionAPI.buscarAlimentos(this.formularioNombre.value.nombre)//busco todos
  .subscribe({
    next: (data) => {
      this.alimentos = data;//los guardo en el array
      console.log(data);
    },
    error: (e) => console.error(e)
  });
}
}
