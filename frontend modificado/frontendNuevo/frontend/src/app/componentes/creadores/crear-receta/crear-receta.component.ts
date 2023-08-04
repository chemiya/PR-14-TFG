import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AlimentoServicioService } from 'src/app/Servicios/AlimentoServicio/alimento-servicio.service';
import { RecetaServicioService } from 'src/app/Servicios/RecetaServicio/receta-servicio.service';
import { PasoServicioService } from 'src/app/Servicios/PasoServicio/paso-servicio.service';

import { TokenStorageService } from 'src/app/Servicios/TokenServicio/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { AlimentoRecetaServicioService } from 'src/app/Servicios/AlimentoRecetaServicio/alimento-receta-servicio.service';
import { RecetaDTO } from 'src/app/DTO/RecetaDTO';
import { AlimentoDTO } from 'src/app/DTO/AlimentoDTO';
import { AlimentoRecetaDTO } from 'src/app/DTO/AlimentoRecetaDTO';
import { PasoDTO } from 'src/app/DTO/PasoDTO';


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
    foto: new File([], ""),
    fotoCreador: ""
  }
  currentUser: any;
  mensaje!: string;
  formularioReceta!: FormGroup;
  formularioNombre!: FormGroup;


  alimentos!: AlimentoDTO[];
  ingredientesVacio: boolean = true;
  alimentosCantidadesCero: boolean = false;
  alimentosReceta: AlimentoRecetaDTO[] = [];
  mensajeGuardando: boolean = false;
  pasos: PasoDTO[] = [];
  pasosEdicion:PasoDTO[]=[];
  selectedFiles?: FileList;
  currentFile?: File;
  sinImagen: boolean = false;
  contadorOrden: number = 1;
  textoPaso!: string;
  busquedaHecha: boolean = false;
  pasosVacio: boolean = true;
  activarBotonPaso: boolean = false;
  edicion = false;
  formatoFoto: boolean = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private toastr: ToastrService, private recetaServicio: RecetaServicioService, private alimentoRecetaServicio: AlimentoRecetaServicioService, private pasoServicio: PasoServicioService, private alimentoServicio: AlimentoServicioService, private tokenService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {

    this.currentUser = this.tokenService.getUser();//cojo el usuario
    this.formularioReceta = this.initForm();//inicio los formulario
    this.formularioNombre = this.initFormNombre();
    if (this.route.snapshot.params["id"] != "nueva") {
      this.edicion = true
      this.getRecetaPorId(this.route.snapshot.params["id"]);
      this.getPasosReceta(this.route.snapshot.params["id"])
      this.getAlimentosReceta(this.route.snapshot.params["id"])
    }

  }

  getRecetaPorId(id: number) {
    this.recetaServicio.buscarRecetaPorId(id)//busco la receta concreta
      .subscribe({
        next: (data) => {
          if (data.length == 0) {
            console.log("error")
            this.router.navigate(['/muroPublicaciones']);
          } else {
            this.receta = data[0];//ña guardo
            this.formularioReceta.get("titulo")?.setValue(this.receta.titulo)
            this.formularioReceta.get("resumen")?.setValue(this.receta.resumen)
            this.formularioReceta.get("tiempo")?.setValue(this.receta.tiempo)
            this.formularioReceta.get("dificultad")?.setValue(this.receta.dificultad)
            console.log(this.receta)
          }




        },
        error: (e) => console.error(e)
      });
  }

  getPasosReceta(id: number) {
    this.pasosVacio = false;
    this.pasoServicio.buscarPasosReceta(id)//busco los pasos de la receta
      .subscribe({
        next: (data) => {
          this.pasos = data;//los guardo
          this.pasosEdicion=data;


        },
        error: (e) => console.error(e)
      });
  }

  getAlimentosReceta(id: number) {
    this.ingredientesVacio = false;
    this.alimentoRecetaServicio.buscarAlimentosReceta(id)//busco sus alimentos de la receta
      .subscribe({
        next: (data) => {
          this.alimentosReceta = data;//los guardo


        },
        error: (e) => console.error(e)
      });
  }


  selectFile(event: any): void {//selecciono foto

    if (event.target.files[0].name.includes(".jpg") || event.target.files[0].name.includes(".png")) {
      if (event.target.files[0].size < 9437184) {
        this.selectedFiles = event.target.files;
        this.sinImagen = false

        this.formatoFoto = false
      } else {

        this.formatoFoto = true
      }

    } else {
      this.formatoFoto = true

    }

  }

  anadirPaso() {
    var paso: PasoDTO = {
      idReceta: 0,
      orden: this.contadorOrden,
      paso: ""

    }//guardo en array un paso

    paso.paso = this.textoPaso;//cojo su texto
    this.pasos.push(paso)

    this.pasosVacio = false;//quito aviso de pasos

    this.textoPaso = "";//reinicio campo

    this.contadorOrden++;//subo contador
    this.activarBotonPaso = false
  }

  guardarReceta() {

    this.receta.titulo = this.formularioReceta.value.titulo;
    this.receta.resumen = this.formularioReceta.value.resumen;
    this.receta.dificultad = this.formularioReceta.value.dificultad
    this.receta.idCreador = this.currentUser.id;
    this.receta.tiempo = this.formularioReceta.value.tiempo;//cojo los campos de la receta
    //si hay alguna cantidad de cero
    if (this.alimentosCantidadesCero == false && this.pasosVacio == false && this.ingredientesVacio == false) {



      if (this.edicion == false) {

        if (this.selectedFiles) {//si hay foto seleccionada
          const file: File | null = this.selectedFiles.item(0);


          if (file) {
            this.currentFile = file;//guardo la foto





            this.receta.foto = this.currentFile

            this.mensajeGuardando = true;

            this.recetaServicio.guardarReceta(this.receta)//guardo la receta
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
                    this.alimentoRecetaServicio.guardarAlimentoReceta(alimentoRecetaConvertido, this.receta.id)
                      .subscribe({
                        next: (data) => {






                        },
                        error: (e) => console.error(e)
                      });
                  })



                  this.pasos.forEach(paso => {//por cada paso

                    this.pasoServicio.guardarPaso(paso, this.receta.id)//guardo el paso de la receta
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
      } else {
        if (this.selectedFiles) {//si hay foto seleccionada
          const file: File | null = this.selectedFiles.item(0);


          if (file) {
            this.currentFile = file;//guardo la foto
            this.receta.foto = this.currentFile
          }
        }

        this.mensajeGuardando = true;

        console.log(this.receta)
        this.recetaServicio.actualizarReceta(this.receta.id, this.receta)//guardo la publicacion
          .subscribe({
            next: (data) => {

              this.router.navigate(["/muroPublicaciones"]).then(() => {//navego a la principal
                this.toastr.success('Receta actualizada');
              })
            },
            error: (e) => console.error(e)
          });

          

      }
    }






  }

  valueChangePaso(entrada: any) {
    if (this.textoPaso.length > 0) {
      this.activarBotonPaso = true
    } else {
      this.activarBotonPaso = false
    }


  }


  eliminarPaso(orden: any) {
    this.pasos = this.pasos.filter(paso => paso.orden != orden)//quito el paso del array
    this.pasos.map((paso) => {//los superiores bajo el orden
      if (paso.orden > orden) {
        paso.orden--;
      }
    })

    if (this.pasos.length == 0) {//si no hay pasos muestro aviso
      this.pasosVacio = true;
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



  anadirAlimento(objeto: any) {
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

    alimentoAnadir.idAlimento = objeto.id;
    alimentoAnadir.nombreAlimento = objeto.nombre
    alimentoAnadir.medida = objeto.medida;
    alimentoAnadir.fotoRuta = objeto.foto//guardo sus campos

    var encontradosRepetidos = this.alimentosReceta.filter(alimento => alimento.idAlimento == objeto.id)
    console.log(this.alimentosReceta)
    console.log(encontradosRepetidos)
    if (encontradosRepetidos.length == 0) {
      this.alimentosReceta.push(alimentoAnadir);//lo guardo en el array
    }


    this.ingredientesVacio = false;//quito aviso de que no hay ingredientes
    this.alimentosCantidadesCero = true;//pongo aviso de cantidades

  }



  comprobacionCero(event: Event) {

    this.alimentosReceta.forEach(alimento => {//por cada alimento de la receta

      if (alimento.cantidad == 0 || alimento.cantidad == null) {//eviso si tiene cantidad cero

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
    this.busquedaHecha = true;//se ha hecho una busqueda
    this.alimentoServicio.buscarAlimentosPorTitulo(this.formularioNombre.value.nombre)//busco los alimentos
      .subscribe({
        next: (data) => {
          this.alimentos = data;//los guardo en el array
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}
