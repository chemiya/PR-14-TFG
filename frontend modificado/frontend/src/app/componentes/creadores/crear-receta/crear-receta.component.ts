import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlimentoDAOService } from 'src/app/DAO/AlimentoDAO/alimento-dao.service';
import { RecetaDAOService } from 'src/app/DAO/RecetaDAO/receta-dao.service';
import { AlimentoDTO, AlimentoRecetaDTO, PasoDTO, RecetaDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/DAO/TokenServicio/token-storage.service';
import { ToastrService } from 'ngx-toastr';


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

  constructor(private fb: FormBuilder, private toastr: ToastrService, private recetaDAO: RecetaDAOService, private alimentoDAO: AlimentoDAOService, private tokenService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.currentUser = this.tokenService.getUser();
    this.formularioReceta = this.initForm();
    this.formularioNombre = this.initFormNombre();

  }


  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  anadirPaso() {
    var paso: PasoDTO = {
      idReceta: 0,
      orden: this.contadorOrden,
      paso: ""

    }

    paso.paso = this.textoPaso;
    this.pasos.push(paso)


    this.textoPaso = "";

    this.contadorOrden++;
  }

  guardarReceta() {

    if (this.alimentosCantidadesCero == false) {





      if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);


        if (file) {
          this.currentFile = file;



          this.receta.idCreador = this.currentUser.id;
          this.receta.titulo = this.formularioReceta.value.titulo;
          this.receta.resumen = this.formularioReceta.value.resumen;
          this.receta.foto = this.currentFile
          this.receta.dificultad = this.formularioReceta.value.dificultad

          this.receta.tiempo = this.formularioReceta.value.tiempo;
          this.recetaDAO.guardarReceta(this.receta)//busco todos
            .subscribe({
              next: (data) => {
                this.receta.id = data.id
                this.alimentosReceta.forEach(alimentoReceta => {
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

                  alimentoRecetaConvertido.idAlimento = alimentoReceta.idAlimento;
                  alimentoRecetaConvertido.cantidad = alimentoReceta.cantidad;
                  alimentoRecetaConvertido.medida = alimentoReceta.medida;
                  console.log(alimentoRecetaConvertido.medida)



                  console.log("tengo en receta id" + this.receta.id)
                  this.recetaDAO.guardarAlimentoReceta(alimentoRecetaConvertido, this.receta.id)
                    .subscribe({
                      next: (data) => {
                        console.log(data)
                        this.router.navigate(["/muroPublicaciones"]).then(() => {
                          this.toastr.success('receta guardada');
                        })
                      },
                      error: (e) => console.error(e)
                    });
                })

              },
              error: (e) => console.error(e)
            });


          this.pasos.forEach(paso => {
            paso.idReceta = this.receta.id;
            this.recetaDAO.guardarPaso(paso)//busco todos
              .subscribe({
                next: (data) => {

                },
                error: (e) => console.error(e)
              });
          })



        }
      } else {
        this.sinImagen = true;
      }




    }
  }


  initForm(): FormGroup {
    return this.fb.group({
      titulo: ['', [Validators.required]],
      resumen: ['', [Validators.required]],

      tiempo: ['', [Validators.required]],
      dificultad: ['facil', [Validators.required]],




    })
  }



  initFormNombre(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required]],




    })
  }

  initFormPaso(): FormGroup {
    return this.fb.group({
      paso: ['', [Validators.required]],




    })
  }

  anadirAlimento(id: any, nombre: string, medida: any, fotoRuta: string) {
    var alimentoAnadir: AlimentoRecetaDTO = {
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
    alimentoAnadir.fotoRuta = fotoRuta

    this.alimentosReceta.push(alimentoAnadir);
    this.ingredientesVacio = false;
    this.alimentosCantidadesCero = true;

  }

  comprobacionCero(event: Event) {

    this.alimentosReceta.forEach(alimento => {

      if (alimento.cantidad == 0) {

        this.alimentosCantidadesCero = true;
      } else {
        this.alimentosCantidadesCero = false;
      }
    })
  }

  eliminarAlimento(id: any) {
    console.log(id)

    this.alimentosReceta = this.alimentosReceta.filter((alimento) => alimento.idAlimento !== id)
    if (this.alimentosReceta.length == 0) {
      this.ingredientesVacio = true;
    }

  }


  busqueda() {
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
