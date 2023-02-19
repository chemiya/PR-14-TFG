import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionAPIService } from '../conexion-api.service';
import { ResumenAlimento } from '../modelo/app.model';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-crear-alimento',
  templateUrl: './crear-alimento.component.html',
  styleUrls: ['./crear-alimento.component.css']
})
export class CrearAlimentoComponent {

  formularioAlimento!:FormGroup;
  operacion!: String;
  id!:string
  alimentoEdicion:ResumenAlimento={
    id:0,
    nombre:"",
    descripcion:"",
    calorias:0,
    foto:new File([],""),
    fotoRuta:""
  }
  selectedFiles?: FileList;
  currentFile?: File;
  constructor(private ruta: ActivatedRoute,private fb:FormBuilder,private conexionAPI:ConexionAPIService,private tokenService:TokenStorageService, private router:Router){}
  
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  
    this.formularioAlimento = this.initForm();
    this.operacion = this.ruta.snapshot.url[this.ruta.snapshot.url.length - 1].path;

    if (this.operacion == "editar") {


      this.ruta.paramMap.subscribe( // Capturamos el id de la URL
        params => {
          this.id = params.get('id')!;

        },
        err => console.log("Error al leer id para editar: " + err)
      )



      
    this.conexionAPI.getAlimentoPorId(this.id)//busco todos
    .subscribe({
      next: (data) => {
       this.alimentoEdicion=data[0]
       this.formularioAlimento.get("nombre")?.setValue(this.alimentoEdicion.nombre)
       this.formularioAlimento.get("descripcion")?.setValue(this.alimentoEdicion.descripcion)
       this.formularioAlimento.get("calorias")?.setValue(this.alimentoEdicion.calorias)
      },
      error: (e) => console.error(e)
    });
      
    
    }
   
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      calorias: ['', [Validators.required]],

   
     
      
     
    })
  }


  guardarAlimento(){



    if(this.operacion=="editar"){
      this.alimentoEdicion.nombre=this.formularioAlimento.value.nombre;
      this.alimentoEdicion.descripcion=this.formularioAlimento.value.descripcion;
      this.alimentoEdicion.calorias=this.formularioAlimento.value.calorias;

      this.conexionAPI.actualizarAlimento(this.id,this.alimentoEdicion)//busco todos
      .subscribe({
        next: (data) => {
          this.router.navigate(["/admin"])
          console.log(data);
        },
        error: (e) => console.error(e)
      });


    }else{

    
    var alimento:ResumenAlimento={
      id:0,
      nombre:"",
      descripcion:"",
      calorias:0,
      foto:new File([],""),
      fotoRuta:""

    }

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
     
console.log(this.currentFile)

   alimento.nombre=this.formularioAlimento.value.nombre;
    alimento.descripcion=this.formularioAlimento.value.descripcion;
    alimento.calorias=this.formularioAlimento.value.calorias;
    alimento.foto=this.currentFile;

    this.conexionAPI.guardarAlimento(alimento)//busco todos
    .subscribe({
      next: (data) => {
        this.router.navigate(["/admin"])
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
}
}
  }
 
}
