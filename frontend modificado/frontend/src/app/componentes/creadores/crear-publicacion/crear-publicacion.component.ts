import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, TitleStrategy } from '@angular/router';
import { timeInterval } from 'rxjs';
import { ConexionAPIService } from 'src/app/conexion-api.service';
import { AlimentoDAOService } from 'src/app/DAO/AlimentoDAO/alimento-dao.service';
import { RecetaDAOService } from 'src/app/DAO/RecetaDAO/receta-dao.service';
import {  AlimentoDTO, PublicacionDTO, RecetaDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/token-storage.service';


@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.component.html',
  styleUrls: ['./crear-publicacion.component.css']
})
export class CrearPublicacionComponent {
  publicacion:PublicacionDTO={
    id:0,
    titulo:"",
    descripcion:"",
    fechapublicacion:new Date("2000-01-01"),
    idCreador:0,
    idReceta:0,
    fotoRuta:"",
    idAlimento:0,
    usernameUsuario:"",
    tituloReceta:"",
    nombreAlimento:"",
    foto:new File([],"")
   
  
  }

  seleccion:string="receta";
  mensaje!:string
  nombreAlimento!:string
  currentUser:any;
  mostrarBuscadorAlimento:boolean=false;
  alimentos!:AlimentoDTO[];
  recetas!:RecetaDTO[];
tituloReceta!:string;
formularioAlimento!:FormGroup;
formularioReceta!:FormGroup;
formularioPublicacion!:FormGroup;
seleccionEnlace:boolean=true;

  constructor(private conexionAPI:ConexionAPIService,private alimentoDAO:AlimentoDAOService,private recetaDAO:RecetaDAOService, private fb:FormBuilder,private tokenService:TokenStorageService,private router:Router){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.currentUser=this.tokenService.getUser();
    this.formularioAlimento = this.initFormAlimento();
    this.formularioReceta=this.initFormReceta();
    this.formularioPublicacion=this.initFormPublicacion();
  }


  initFormAlimento(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required]],

    })
  }

  initFormPublicacion(): FormGroup {
    return this.fb.group({
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],

    })
  }

  initFormReceta(): FormGroup {
    return this.fb.group({
      titulo: ['', [Validators.required]],

    })
  }

  submitPublicacion(){
    this.publicacion.idCreador=this.currentUser.id
    
    this.publicacion.titulo=this.formularioPublicacion.value.titulo;
    this.publicacion.descripcion=this.formularioPublicacion.value.descripcion;

    if(this.publicacion.idAlimento==0 && this.publicacion.idReceta==0){
      this.seleccionEnlace=true;
    }else{

    this.conexionAPI.anadirPublicacion(this.publicacion)//busco todos
  .subscribe({
    next: (data) => {
    console.log(data)
    this.router.navigate(["/muroPublicaciones"])
    },
    error: (e) => console.error(e)
  });
}
  }

  onChangeSelect(){
    if(this.seleccion=="alimento"){
      this.mostrarBuscadorAlimento=true;
    }else{
      this.mostrarBuscadorAlimento=false;
    }
  }

  submitAlimento(){
  
    this.alimentoDAO.buscarAlimentos(this.formularioAlimento.value.nombre)//busco todos
    .subscribe({
      next: (data) => {
        this.alimentos = data;//los guardo en el array
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  submitReceta(){
    this.recetaDAO.buscarRecetas(this.formularioReceta.value.titulo)//busco todos
    .subscribe({
      next: (data) => {
        this.recetas = data;//los guardo en el array
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  detallesAlimento(id:any){
    this.router.navigate(['/detallesAlimento/'+id]);
  }

  marcarAlimento(id:any){
this.publicacion.idAlimento=id;
this.seleccionEnlace=false;

  }

  marcarReceta(id:any){
    this.publicacion.idReceta=id;
    this.seleccionEnlace=false;
      }
}
