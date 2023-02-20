import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConexionAPIService } from 'src/app/conexion-api.service';
import { AlimentoDAOService } from 'src/app/DAO/AlimentoDAO/alimento-dao.service';
import { AlimentoDTO, AlimentoRecetaDTO, RecetaDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/token-storage.service';


@Component({
  selector: 'app-crear-receta',
  templateUrl: './crear-receta.component.html',
  styleUrls: ['./crear-receta.component.css']
})
export class CrearRecetaComponent {
receta:RecetaDTO={
  titulo:"",
  resumen:"",
  tiempo:0,
  id:0,
  idCreador:0,
  fotoRuta:"",
  dificultad:"",
  usernameUsuario:"",
  foto:new File([],"")
}
currentUser:any;
mensaje!:string;
formularioReceta!:FormGroup;
formularioNombre!:FormGroup;
alimentos!:AlimentoDTO[];
ingredientesVacio:boolean=true;
alimentosCantidadesCero:boolean=false;
alimentosReceta:AlimentoRecetaDTO[]=[];

constructor(private fb:FormBuilder,private conexionAPI:ConexionAPIService,private alimentoDAO:AlimentoDAOService,private tokenService:TokenStorageService, private router:Router){}

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

  this.receta.tiempo=this.formularioReceta.value.tiempo;
  this.conexionAPI.guardarReceta(this.receta)//busco todos
      .subscribe({
        next: (data) => {
         this.receta.id=data.id
         this.alimentosReceta.forEach(alimentoReceta=>{
          var alimentoRecetaConvertido:AlimentoRecetaDTO={
            idAlimento:0,
            idReceta:0,
            cantidad:0,
            id:0,
            nombreAlimento:"",
            tituloReceta:"",
            medida:"",
            fotoRuta:""
  
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
   var alimentoAnadir:AlimentoRecetaDTO={
    id:0,
    cantidad:0,
    idAlimento:0,
   nombreAlimento:"",
   tituloReceta:"",
   medida:"",
   idReceta:0,
   fotoRuta:""
    }
  
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
  this.alimentoDAO.buscarAlimentos(this.formularioNombre.value.nombre)//busco todos
  .subscribe({
    next: (data) => {
      this.alimentos = data;//los guardo en el array
      console.log(data);
    },
    error: (e) => console.error(e)
  });
}
}
