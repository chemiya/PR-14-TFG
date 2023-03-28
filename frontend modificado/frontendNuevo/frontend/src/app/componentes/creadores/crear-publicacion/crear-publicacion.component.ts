import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, TitleStrategy } from '@angular/router';
import { timeInterval } from 'rxjs';

import { AlimentoDAOService } from 'src/app/DAO/AlimentoDAO/alimento-dao.service';
import { PublicacionDAOService } from 'src/app/DAO/PublicacionDAO/publicacion-dao.service';
import { RecetaDAOService } from 'src/app/DAO/RecetaDAO/receta-dao.service';
import {  AlimentoDTO, PublicacionDTO, RecetaDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/DAO/TokenServicio/token-storage.service';
import { ToastrService } from 'ngx-toastr';


//corregido html y ts--------------

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
    foto:new File([],""),
    fotoCreador:"",
    fotoAlimento:"",
    fotoReceta:""
   
  
  }

  relleno:boolean=true;
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
selectedFiles?: FileList;
  currentFile?: File;
  busquedaHechaRecetas:boolean=false;
  busquedaHechaAlimentos:boolean=false;
  alimentoSeleccionado!:AlimentoDTO;
  recetaSeleccionada!:RecetaDTO;
  alimentoMarcado:boolean=false;
  recetaMarcada:boolean=false;
  sinImagen: boolean = false;

  constructor(private publicacionDAO:PublicacionDAOService,private toastr:ToastrService, private alimentoDAO:AlimentoDAOService,private recetaDAO:RecetaDAOService, private fb:FormBuilder,private tokenService:TokenStorageService,private router:Router){}

  ngOnInit(): void {
    
    this.currentUser=this.tokenService.getUser();//cargo el usuario
    this.formularioAlimento = this.initFormAlimento();//inicio el formulario
    this.formularioReceta=this.initFormReceta();//inicio el formulario
    this.formularioPublicacion=this.initFormPublicacion();//inicio el formulario
  }

  selectFile(event: any): void {//selecciono un archivo
    this.selectedFiles = event.target.files;
    this.sinImagen=false
  }

  initFormAlimento(): FormGroup {//inicio el formulario
    return this.fb.group({
      nombre: ['', [Validators.required]],

    })
  }

  initFormPublicacion(): FormGroup {//inicio el formulario
    return this.fb.group({
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],

    })
  }

  initFormReceta(): FormGroup {//inicio el formulario
    return this.fb.group({
      titulo: ['', [Validators.required]],

    })
  }

  submitPublicacion(){
    this.publicacion.idCreador=this.currentUser.id//preparo los datos
    
    this.publicacion.titulo=this.formularioPublicacion.value.titulo;
    this.publicacion.descripcion=this.formularioPublicacion.value.descripcion;

    if(this.publicacion.idAlimento==0 && this.publicacion.idReceta==0){
      this.seleccionEnlace=true;//si no ha seleccionado ni alimento ni receta nos e puede
    }else{


      if (this.selectedFiles) {//si ha subido foto
        const file: File | null = this.selectedFiles.item(0);

        if (file) {//cojo la foto
          this.currentFile = file;

          console.log(this.currentFile)
          this.publicacion.foto=this.currentFile;//la guardo

          this.publicacionDAO.guardarPublicacion(this.publicacion)//guardo la publicacion
          .subscribe({
            next: (data) => {
            console.log(data)
            this.router.navigate(["/muroPublicaciones"]).then(() => {//navego a la principal
              this.toastr.success('publicacion guardada');
            })
            },
            error: (e) => console.error(e)
          });

        
      }
    }else {//si no hay imagen
      this.sinImagen = true;
      console.log("imageeen")
    }









  
}
  }

  onChangeSelect(){
    this.relleno=true;//pongo auxiliar de relleno
    this.busquedaHechaAlimentos=false;//reinicio busquedas
    this.busquedaHechaRecetas=false;
    if(this.seleccion=="alimento"){
      this.mostrarBuscadorAlimento=true;//muestro el buscador que correpsonda
    }else{
      this.mostrarBuscadorAlimento=false;
    }
  }

  submitAlimento(){
    this.relleno=false;//elimino el relleno
    this.alimentoDAO.buscarAlimentosPorTitulo(this.formularioAlimento.value.nombre)//busco todos
    .subscribe({
      next: (data) => {
        this.alimentos = data;//los guardo en el array
        console.log(data);
        this.busquedaHechaAlimentos=true;//muestro los resultados y quito las recetas
        this.busquedaHechaRecetas=false;
      },
      error: (e) => console.error(e)
    });
  }

  submitReceta(){
    this.relleno=false;//elimino el relleno
    this.recetaDAO.buscarRecetas(this.formularioReceta.value.titulo)//busco todos
    .subscribe({
      next: (data) => {
        this.recetas = data;//los guardo en el array
        console.log(data);
        this.busquedaHechaRecetas=true;//muestro los resultados y quito los alimentos
        this.busquedaHechaAlimentos=false;
      },
      error: (e) => console.error(e)
    });
  }

  

  marcarAlimento(id:any){
    console.log(id)
this.publicacion.idAlimento=id;//guardo su id
this.seleccionEnlace=false;//quito aviso
this.alimentoDAO.buscarAlimentoPorId(id)//busco todos
.subscribe({
  next: (data) => {
    this.alimentoSeleccionado=data[0];
    this.alimentoMarcado=true;
    this.recetaMarcada=false;
  },
  error: (e) => console.error(e)
});

  }

  marcarReceta(id:any){
    console.log(id)
    this.publicacion.idReceta=id;//guardo su id
    this.seleccionEnlace=false;//quito aviso


    this.recetaDAO.buscarRecetaPorId(id)//busco todos
    .subscribe({
      next: (data) => {
        this.recetaSeleccionada=data[0];
        this.recetaMarcada=true;
        this.alimentoMarcado=false;
      },
      error: (e) => console.error(e)
    });
      }
}
