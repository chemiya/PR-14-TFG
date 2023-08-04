import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { timeInterval } from 'rxjs';

import { AlimentoServicioService } from 'src/app/Servicios/AlimentoServicio/alimento-servicio.service';
import { PublicacionServicioService } from 'src/app/Servicios/PublicacionServicio/publicacion-servicio.service';
import { RecetaServicioService } from 'src/app/Servicios/RecetaServicio/receta-servicio.service';

import { TokenStorageService } from 'src/app/Servicios/TokenServicio/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { PublicacionDTO } from 'src/app/DTO/PublicacionDTO';
import { AlimentoDTO } from 'src/app/DTO/AlimentoDTO';
import { RecetaDTO } from 'src/app/DTO/RecetaDTO';


//corregido html y ts--------------

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.component.html',
  styleUrls: ['./crear-publicacion.component.css']
})
export class CrearPublicacionComponent {
  publicacion: PublicacionDTO = {
    id: 0,
    titulo: "",
    descripcion: "",
    fechapublicacion: new Date("2000-01-01"),
    idCreador: 0,
    idReceta: 0,
    fotoRuta: "",
    idAlimento: 0,
    usernameUsuario: "",
    tituloReceta: "",
    nombreAlimento: "",
    foto: new File([], ""),
    fotoCreador: "",
    fotoAlimento: "",
    fotoReceta: ""


  }

  relleno: boolean = true;
  seleccion: string = "receta";
  mensaje!: string
  nombreAlimento!: string
  currentUser: any;
  mostrarBuscadorAlimento: boolean = false;
  alimentos!: AlimentoDTO[];
  recetas!: RecetaDTO[];
  tituloReceta!: string;
  formularioAlimento!: FormGroup;
  formularioReceta!: FormGroup;
  formularioPublicacion!: FormGroup;
  seleccionEnlace: boolean = true;
  selectedFiles?: FileList;
  currentFile?: File;
  busquedaHechaRecetas: boolean = false;
  busquedaHechaAlimentos: boolean = false;
  alimentoSeleccionado!: AlimentoDTO;
  recetaSeleccionada!: RecetaDTO;
  alimentoMarcado: boolean = false;
  recetaMarcada: boolean = false;
  sinImagen: boolean = false;
  mensajeGuardando: boolean = false;
  formatoFoto: boolean = false;
  edicion: boolean = false;

  constructor(private publicacionServicio: PublicacionServicioService, private route: ActivatedRoute, private toastr: ToastrService, private alimentoServicio: AlimentoServicioService, private recetaServicio: RecetaServicioService, private fb: FormBuilder, private tokenService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.formularioAlimento = this.initFormAlimento();//inicio el formulario
    this.formularioReceta = this.initFormReceta();//inicio el formulario
    this.formularioPublicacion = this.initFormPublicacion();//inicio el formulario
    if (this.route.snapshot.params["id"] != "nueva") {
      this.edicion = true
      this.getPublicacionPorId(this.route.snapshot.params["id"]);
    }
    this.currentUser = this.tokenService.getUser();//cargo el usuario



  }

  getPublicacionPorId(id: number) {//Busco la publicacion por id
    this.publicacionServicio.buscarPublicacionPorId(id)
      .subscribe({
        next: (data) => {
          if (data.length == 0) {
            console.log("error")
            this.router.navigate(['/muroPublicaciones']);
          } else {
            this.publicacion = data[0];//la guardo
            this.formularioPublicacion.get("titulo")?.setValue(this.publicacion.titulo)
            this.formularioPublicacion.get("descripcion")?.setValue(this.publicacion.descripcion)
            if (this.publicacion.idAlimento) {
              this.publicacion.idReceta=0;
              this.marcarAlimento(this.publicacion.idAlimento)
            } else {
              this.publicacion.idAlimento=0;
              this.marcarReceta(this.publicacion.idReceta)

            }
          }





        },
        error: (e) => console.error(e)
      });


  }

  selectFile(event: any): void {//selecciono un archivo
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

  submitPublicacion() {
    this.publicacion.idCreador = this.currentUser.id//preparo los datos

    this.publicacion.titulo = this.formularioPublicacion.value.titulo;
    this.publicacion.descripcion = this.formularioPublicacion.value.descripcion;

    if (this.publicacion.idAlimento == 0 && this.publicacion.idReceta == 0) {
      this.seleccionEnlace = true;//si no ha seleccionado ni alimento ni receta nos e puede
    } else {

      if (this.edicion == false) {
        if (this.selectedFiles) {//si ha subido foto
          const file: File | null = this.selectedFiles.item(0);

          if (file) {//cojo la foto
            this.currentFile = file;

            console.log(this.currentFile)
            this.publicacion.foto = this.currentFile;//la guardo
            this.mensajeGuardando = true;
            this.publicacionServicio.guardarPublicacion(this.publicacion)//guardo la publicacion
              .subscribe({
                next: (data) => {

                  this.router.navigate(["/muroPublicaciones"]).then(() => {//navego a la principal
                    this.toastr.success('Publicación guardada');
                  })
                },
                error: (e) => console.error(e)
              });


          }
        } else {//si no hay imagen
          this.sinImagen = true;

        }
      } else {
        if (this.selectedFiles) {//si ha subido foto
          const file: File | null = this.selectedFiles.item(0);

          if (file) {//cojo la foto
            this.currentFile = file;

            console.log(this.currentFile)
            this.publicacion.foto = this.currentFile;//la guardo
          }
        }
        this.mensajeGuardando = true;
       console.log(this.publicacion)
        
            this.publicacionServicio.actualizarPublicacion(this.publicacion.id,this.publicacion)//guardo la publicacion
              .subscribe({
                next: (data) => {

                  this.router.navigate(["/muroPublicaciones"]).then(() => {//navego a la principal
                    this.toastr.success('Publicación actualizada');
                  })
                },
                error: (e) => console.error(e)
              });

            }










    }
  }

  onChangeSelect() {
    this.relleno = true;//pongo auxiliar de relleno
    this.busquedaHechaAlimentos = false;//reinicio busquedas
    this.busquedaHechaRecetas = false;
    if (this.seleccion == "alimento") {
      this.mostrarBuscadorAlimento = true;//muestro el buscador que correpsonda
    } else {
      this.mostrarBuscadorAlimento = false;
    }
  }

  submitAlimento() {
    this.relleno = false;//elimino el relleno
    this.alimentoServicio.buscarAlimentosPorTitulo(this.formularioAlimento.value.nombre)//busco todos
      .subscribe({
        next: (data) => {
          this.alimentos = data;//los guardo en el array
          console.log(data);
          this.busquedaHechaAlimentos = true;//muestro los resultados y quito las recetas
          this.busquedaHechaRecetas = false;
        },
        error: (e) => console.error(e)
      });
  }

  submitReceta() {
    this.relleno = false;//elimino el relleno
    this.recetaServicio.buscarRecetas(this.formularioReceta.value.titulo)//busco todos
      .subscribe({
        next: (data) => {
          this.recetas = data;//los guardo en el array
          console.log(data);
          this.busquedaHechaRecetas = true;//muestro los resultados y quito los alimentos
          this.busquedaHechaAlimentos = false;
        },
        error: (e) => console.error(e)
      });
  }



  marcarAlimento(id: any) {
    console.log(id)
    this.publicacion.idAlimento = id;//guardo su id
    this.seleccionEnlace = false;//quito aviso
    this.alimentoServicio.buscarAlimentoPorId(id)//busco todos
      .subscribe({
        next: (data) => {
          this.alimentoSeleccionado = data[0];
          this.alimentoMarcado = true;
          this.recetaMarcada = false;
        },
        error: (e) => console.error(e)
      });

  }

  marcarReceta(id: any) {
    console.log(id)
    this.publicacion.idReceta = id;//guardo su id
    this.seleccionEnlace = false;//quito aviso


    this.recetaServicio.buscarRecetaPorId(id)//busco todos
      .subscribe({
        next: (data) => {
          this.recetaSeleccionada = data[0];
          this.recetaMarcada = true;
          this.alimentoMarcado = false;
        },
        error: (e) => console.error(e)
      });
  }
}
