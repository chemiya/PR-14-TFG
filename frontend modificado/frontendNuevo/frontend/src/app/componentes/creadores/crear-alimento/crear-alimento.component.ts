import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AlimentoDAOService } from 'src/app/DAO/AlimentoDAO/alimento-dao.service';
import { AlimentoDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/DAO/TokenServicio/token-storage.service';
import { ToastrService } from 'ngx-toastr';

//corregido html y ts----------

@Component({
  selector: 'app-crear-alimento',
  templateUrl: './crear-alimento.component.html',
  styleUrls: ['./crear-alimento.component.css']
})
export class CrearAlimentoComponent {

  formularioAlimento!: FormGroup;
  operacion!: String;
  id!: string
  alimentoEdicion: AlimentoDTO = {
    id: 0,
    nombre: "",
    descripcion: "",
    calorias: 0,
    foto: new File([], ""),
    fotoRuta: "",
    enlace: "",
    grasas: 0,
    carbohidratos: 0,
    proteinas: 0,
    cantidad: 0,
    medida: ""
  }
  selectedFiles?: FileList;
  currentFile?: File;
  alertaFoto:boolean=false;
  contadorCambios:number=0;
  validacion:number=0;
  cambioValor:boolean=false
  activarBoton:boolean=false
  mensajeGuardando:boolean=false;
  constructor(private ruta: ActivatedRoute,private toastr:ToastrService, private fb: FormBuilder,private alimentoDAO:AlimentoDAOService,  private tokenService: TokenStorageService, private router: Router) { }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;//guardo la imagen seleccionada
    
    this.alertaFoto=false;
    this.valueChange("foto")
   
  }

  ngOnInit(): void {
   

    this.formularioAlimento = this.initForm();//inbjcio el formulario
   
    this.operacion = this.ruta.snapshot.url[this.ruta.snapshot.url.length - 1].path;//cojo la operacion

    if (this.operacion == "editar") {//si es de editar


      this.ruta.paramMap.subscribe( //cojo el id
        params => {
          this.id = params.get('id')!;

        },
        err => console.log("Error al leer id para editar: " + err)
      )




      this.alimentoDAO.buscarAlimentoPorId(this.id)//busco el alimento por id
        .subscribe({
          next: (data) => {
            this.alimentoEdicion = data[0]//guardo el alimento y pongo los campos del formulario
            this.formularioAlimento.get("nombre")?.setValue(this.alimentoEdicion.nombre)
            this.formularioAlimento.get("descripcion")?.setValue(this.alimentoEdicion.descripcion)
            this.formularioAlimento.get("calorias")?.setValue(this.alimentoEdicion.calorias)
            this.formularioAlimento.get("enlace")?.setValue(this.alimentoEdicion.enlace)
            this.formularioAlimento.get("grasas")?.setValue(this.alimentoEdicion.grasas)
            this.formularioAlimento.get("carbohidratos")?.setValue(this.alimentoEdicion.carbohidratos)
            this.formularioAlimento.get("proteinas")?.setValue(this.alimentoEdicion.proteinas)
            this.formularioAlimento.get("cantidad")?.setValue(this.alimentoEdicion.cantidad)
            this.formularioAlimento.get("medida")?.setValue(this.alimentoEdicion.medida)
           
          },
          error: (e) => console.error(e)
        });


    }

  }

  initForm(): FormGroup {//inicio el formulario
    return this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      calorias: ['', [Validators.required]],
      enlace: ['', [Validators.required]],
      grasas: ['', [Validators.required]],
      carbohidratos: ['', [Validators.required]],
      proteinas: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      medida: ['gramos', [Validators.required]],
     





    })
  }


  guardarAlimento() {
    var file: File | null;


    if (this.operacion == "editar") {//si estoy en ditar
      this.alimentoEdicion.nombre = this.formularioAlimento.value.nombre;//cojo campos del formulario
      this.alimentoEdicion.descripcion = this.formularioAlimento.value.descripcion;
      this.alimentoEdicion.calorias = this.formularioAlimento.value.calorias;
      this.alimentoEdicion.enlace = this.formularioAlimento.value.enlace;
      this.alimentoEdicion.carbohidratos = this.formularioAlimento.value.carbohidratos;
      this.alimentoEdicion.grasas = this.formularioAlimento.value.grasas;
      this.alimentoEdicion.proteinas = this.formularioAlimento.value.proteinas;
      this.alimentoEdicion.cantidad = this.formularioAlimento.value.cantidad;
      this.alimentoEdicion.medida = this.formularioAlimento.value.medida;


      if (this.selectedFiles) {//si hay alguna imagen
        file= this.selectedFiles.item(0);

        if (file) {//cojo la imagen
          this.currentFile = file;
          this.alimentoEdicion.foto = this.currentFile;
        }
      }


      this.mensajeGuardando=true;
      this.alimentoDAO.actualizarAlimento(this.id, this.alimentoEdicion)//actualizo el alimento
        .subscribe({
          next: (data) => {
            this.router.navigate(["/admin"]).then(() => {
              this.toastr.success('Alimento actualizado');
            })//voy a la ruta
            console.log(data);
          },
          error: (e) => console.error(e)
        });


    } else {


      var alimento: AlimentoDTO = {//creo alimento vacio
        id: 0,
        nombre: "",
        descripcion: "",
        calorias: 0,
        foto: new File([], ""),

        fotoRuta: "",
        enlace: "",
        grasas: 0,
        carbohidratos: 0,
        proteinas: 0,
        cantidad: 0,
        medida: ""

      }

      if (this.selectedFiles) {//si hay alguna imagen
        file= this.selectedFiles.item(0);

        if (file) {//cojo la imagen
          this.currentFile = file;
          alimento.foto = this.currentFile;
          alimento.nombre = this.formularioAlimento.value.nombre;//asigno los campos al alimento vacio
          alimento.descripcion = this.formularioAlimento.value.descripcion;
          alimento.calorias = this.formularioAlimento.value.calorias;
          
          alimento.enlace = this.formularioAlimento.value.enlace;
          alimento.carbohidratos = this.formularioAlimento.value.carbohidratos;
          alimento.grasas = this.formularioAlimento.value.grasas;
          alimento.proteinas = this.formularioAlimento.value.proteinas;
          alimento.cantidad = this.formularioAlimento.value.cantidad;
          alimento.medida = this.formularioAlimento.value.medida;
          this.mensajeGuardando=true;
          this.alimentoDAO.guardarAlimento(alimento)//guardo el alimento
            .subscribe({
              next: (data) => {
                this.router.navigate(["/admin"]).then(() => {
                  this.toastr.success('Alimento guardado');
                })//voy a la ruta principal
                console.log(data);
              },
              error: (e) => console.error(e)
            });
        }

      }else{
        
          this.alertaFoto=true;//si no hay foto pongo alerta
        
        
      }
        

        
        
      
    }
  }

  valueChange(entrada:any){
    if(this.operacion=="editar"){
      this.contadorCambios++;

      if(this.contadorCambios>8){
        this.cambioValor=true;
      }



    this.cuentaCamposValidos()
      
    
      if(this.validacion==8 && this.cambioValor==true){
        this.activarBoton=true;
        console.log("activado")
      }else{
        this.activarBoton=false;
        console.log("desactivado")
      }
    }else{
      this.cuentaCamposValidos()
      
    
      if(this.validacion==8 ){
        this.activarBoton=true;
        console.log("activado")
      }else{
        this.activarBoton=false;
        console.log("desactivado")
      }
    }


    
  }

  cuentaCamposValidos(){
    this.validacion=0;
 
    var controlErrors: ValidationErrors = this.formularioAlimento?.get('nombre')?.errors as ValidationErrors;
    if (controlErrors == null) {
      this.validacion++
    }
  
    controlErrors = this.formularioAlimento?.get('calorias')?.errors as ValidationErrors;
    if (controlErrors == null) {
      this.validacion++
    }
  
    controlErrors = this.formularioAlimento?.get('descripcion')?.errors as ValidationErrors;
    if (controlErrors == null) {
      this.validacion++
    }

    controlErrors = this.formularioAlimento?.get('enlace')?.errors as ValidationErrors;
    if (controlErrors == null) {
      this.validacion++
    }

    controlErrors = this.formularioAlimento?.get('carbohidratos')?.errors as ValidationErrors;
    if (controlErrors == null) {
      this.validacion++
    }

    controlErrors = this.formularioAlimento?.get('grasas')?.errors as ValidationErrors;
    if (controlErrors == null) {
      this.validacion++
    }

    controlErrors = this.formularioAlimento?.get('proteinas')?.errors as ValidationErrors;
    if (controlErrors == null) {
      this.validacion++
    }

    controlErrors = this.formularioAlimento?.get('cantidad')?.errors as ValidationErrors;
    if (controlErrors == null) {
      this.validacion++
    }

    
  }

}
