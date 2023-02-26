import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlimentoDAOService } from 'src/app/DAO/AlimentoDAO/alimento-dao.service';
import { RecetaDAOService } from 'src/app/DAO/RecetaDAO/receta-dao.service';
import { PasoDAOService } from 'src/app/DAO/PasoDAO/paso-dao.service';
import { AlimentoDTO, AlimentoRecetaDTO, PasoDTO, RecetaDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/DAO/TokenServicio/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { AlimentoRecetaDAOService } from 'src/app/DAO/AlimentoRecetaDAO/alimento-receta-dao.service';


//corregido html y ts---------------------

@Component({
  selector: 'app-crear-receta',
  templateUrl: './crear-receta.component.html',
  styleUrls: ['./crear-receta.component.css']
})
export class CrearRecetaComponent {
  receta: RecetaDTO = {
    titulo: "",
    resumen: "",
    tiempo: 0,
    id: 0,
    idCreador: 0,
    fotoRuta: "",
    dificultad: "",
    usernameUsuario: "",
    foto: new File([], "")
  }
  currentUser: any;
  mensaje!: string;
  formularioReceta!: FormGroup;
  formularioNombre!: FormGroup;

  alimentos!: AlimentoDTO[];
  ingredientesVacio: boolean = true;
  alimentosCantidadesCero: boolean = false;
  alimentosReceta: AlimentoRecetaDTO[] = [];
  pasos: PasoDTO[] = [];
  selectedFiles?: FileList;
  currentFile?: File;
  sinImagen: boolean = false;
  contadorOrden: number = 0;
  textoPaso!: string;
  busquedaHecha:boolean=false;
  pasosVacio:boolean=true;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private recetaDAO: RecetaDAOService,private alimentoRecetaDAO: AlimentoRecetaDAOService,private pasoDAO: PasoDAOService, private alimentoDAO: AlimentoDAOService, private tokenService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
  
    this.currentUser = this.tokenService.getUser();//cojo el usuario
    this.formularioReceta = this.initForm();//inicio los formulario
    this.formularioNombre = this.initFormNombre();

  }


  selectFile(event: any): void {//selecciono foto
    this.selectedFiles = event.target.files;
  }

  anadirPaso() {
    var paso: PasoDTO = {
      idReceta: 0,
      orden: this.contadorOrden,
      paso: ""

    }//guardo en array un paso

    paso.paso = this.textoPaso;//cojo su texto
    this.pasos.push(paso)

this.pasosVacio=false;//quito aviso de pasos

    this.textoPaso = "";//reinicio campo

    this.contadorOrden++;//subo contador
  }

  guardarReceta() {

    //si hay alguna cantidad de cero
    if (this.alimentosCantidadesCero == false) {





      if (this.selectedFiles) {//si hay foto seleccionada
        const file: File | null = this.selectedFiles.item(0);


        if (file) {
          this.currentFile = file;//guardo la foto



          this.receta.idCreador = this.currentUser.id;
          this.receta.titulo = this.formularioReceta.value.titulo;
          this.receta.resumen = this.formularioReceta.value.resumen;
          this.receta.foto = this.currentFile
          this.receta.dificultad = this.formularioReceta.value.dificultad

          this.receta.tiempo = this.formularioReceta.value.tiempo;//cojo los campos de la receta
          this.recetaDAO.guardarReceta(this.receta)//guardo la receta
            .subscribe({
              next: (data) => {
                this.receta.id = data.id//cojo su id de la creada
               
                this.alimentosReceta.forEach(alimentoReceta => {//por cada alimento en la receta
                  var alimentoRecetaConvertido: AlimentoRecetaDTO = {
                    idAlimento: 0,
                    idReceta: 0,
                    cantidad: 0,
                    id: 0,
                    nombreAlimento: "",
                    tituloReceta: "",
                    medida: "",
                    fotoRuta: ""

                  }

                  //cojo los campos del alimento
                  alimentoRecetaConvertido.idAlimento = alimentoReceta.idAlimento;
                  alimentoRecetaConvertido.cantidad = alimentoReceta.cantidad;
                  alimentoRecetaConvertido.medida = alimentoReceta.medida;
                  console.log(alimentoRecetaConvertido.medida)



                  //guardo el alimento de la receta
                  this.alimentoRecetaDAO.guardarAlimentoReceta(alimentoRecetaConvertido, this.receta.id)
                    .subscribe({
                      next: (data) => {
                       

                       


                      
                      },
                      error: (e) => console.error(e)
                    });
                })



                this.pasos.forEach(paso => {//por cada paso
                         
                  this.pasoDAO.guardarPaso(paso,this.receta.id)//guardo el paso de la receta
                    .subscribe({
                      next: (data) => {
                        
                      },
                      error: (e) => console.error(e)
                    });
                })





                this.router.navigate(["/muroPublicaciones"]).then(() => {//voy a la pantalla principal
                  this.toastr.success('receta guardada');
                })

              },
              error: (e) => console.error(e)
            });


       



        }
      } else {//si no hay imagen
        this.sinImagen = true;
      }




    }
  }


eliminarPaso(orden:any){
  this.pasos=this.pasos.filter(paso=>paso.orden!=orden)//quito el paso del array
  this.pasos.map((paso)=>{//los superiores bajo el orden
    if(paso.orden>orden){
      paso.orden--;
    }
  })

  if(this.pasos.length==0){//si no hay pasos muestro aviso
    this.pasosVacio=true;
  }
  this.contadorOrden--;//el contador bajo 1
}

  initForm(): FormGroup {//inicio el formulario
    return this.fb.group({
      titulo: ['', [Validators.required]],
      resumen: ['', [Validators.required]],

      tiempo: ['', [Validators.required]],
      dificultad: ['facil', [Validators.required]],




    })
  }



  initFormNombre(): FormGroup {//inicio el formulario
    return this.fb.group({
      nombre: ['', [Validators.required]],




    })
  }

  initFormPaso(): FormGroup {//inicio el formulario
    return this.fb.group({
      paso: ['', [Validators.required]],




    })
  }

  anadirAlimento(id: any, nombre: string, medida: any, fotoRuta: string) {
    var alimentoAnadir: AlimentoRecetaDTO = {//creo un alimento para la receta vacio
      id: 0,
      cantidad: 0,
      idAlimento: 0,
      nombreAlimento: "",
      tituloReceta: "",
      medida: "",
      idReceta: 0,
      fotoRuta: ""
    }

    alimentoAnadir.idAlimento = id;
    alimentoAnadir.nombreAlimento = nombre
    alimentoAnadir.medida = medida;
    alimentoAnadir.fotoRuta = fotoRuta//guardo sus campos

    this.alimentosReceta.push(alimentoAnadir);//lo guardo en el array
    this.ingredientesVacio = false;//quito aviso de que no hay ingredientes
    this.alimentosCantidadesCero = true;//pongo aviso de cantidades

  }

  comprobacionCero(event: Event) {

    this.alimentosReceta.forEach(alimento => {//por cada alimento de la receta

      if (alimento.cantidad == 0) {//eviso si tiene cantidad cero

        this.alimentosCantidadesCero = true;//muestro aviso
      } else {
        this.alimentosCantidadesCero = false;
      }
    })
  }

  eliminarAlimento(id: any) {
  
//filtro de los alimentos los diferentes al id
    this.alimentosReceta = this.alimentosReceta.filter((alimento) => alimento.idAlimento !== id)
    if (this.alimentosReceta.length == 0) {
      this.ingredientesVacio = true;//si la longitud es cero pongo aviso
    }

  }


  busqueda() {
    this.busquedaHecha=true;//se ha hecho una busqueda
    this.alimentoDAO.buscarAlimentosPorTitulo(this.formularioNombre.value.nombre)//busco los alimentos
      .subscribe({
        next: (data) => {
          this.alimentos = data;//los guardo en el array
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}
