import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AlimentoServicioService } from 'src/app/Servicios/AlimentoServicio/alimento-servicio.service';
import { PublicacionServicioService } from 'src/app/Servicios/PublicacionServicio/publicacion-servicio.service';

import { Chart, registerables } from "chart.js";
import { TokenStorageService } from 'src/app/Servicios/TokenServicio/token-storage.service';
import { AlimentoDTO } from 'src/app/DTO/AlimentoDTO';
import { PublicacionDTO } from 'src/app/DTO/PublicacionDTO';
Chart.register(...registerables);

//corregido html y ts-------------------

@Component({
  selector: 'app-detalle-alimento',
  templateUrl: './detalle-alimento.component.html',
  styleUrls: ['./detalle-alimento.component.css']
})
export class DetalleAlimentoComponent {
  alimento!: AlimentoDTO;
  publicaciones!: PublicacionDTO[];
  sinPublicaciones:boolean=false;
  currentUser: any
  constructor(private publicacionServicio: PublicacionServicioService,private tokenServicio:TokenStorageService, public alimentoServicio: AlimentoServicioService, private route: ActivatedRoute, private router: Router) { }
 
 
  ngOnInit(): void {
   
    this.getAlimentoPorId(this.route.snapshot.params["id"]);//busco el alimento y sus publiciones asociadas
    this.getPublicacionesAlimento(this.route.snapshot.params["id"])
    this.currentUser=this.tokenServicio.getUser()
    console.log(this.currentUser)
  }

  hacerGrafico(grasas: any, carbohidratos: any, proteinas: any) {//hago el grafico
    var oilData = {
      labels: [
        "Grasas",
        "Carbohidratos",
        "Proteinas"
      ],
      datasets: [
        {
          data: [grasas, carbohidratos, proteinas],
          backgroundColor: [
            "#FF0000",
            "#008000",
            "#0000FF"
          ]
        }]
    };

    var pieChart = new Chart("myChart", {
      type: 'pie',
      data: oilData
    });
  }



  getAlimentoPorId(id: number) {
    this.alimentoServicio.buscarAlimentoPorId(id)//busco el alimento por id
      .subscribe({
        next: (data) => {
          if(data.length==0){
            console.log("error")
            this.router.navigate(['/muroPublicaciones']);
          }else{
            this.alimento = data[0];
          this.hacerGrafico(this.alimento.grasas, this.alimento.carbohidratos, this.alimento.proteinas)
          }

          
        },
        error: (e) => console.error(e)
      });
  }

  getPublicacionesAlimento(id: any) {
    this.publicacionServicio.buscarPublicacionesAlimento(id)//busco sus publicaciones enlazadas por id
      .subscribe({
        next: (data) => {
          this.publicaciones = data;

          if(this.publicaciones.length==0){
            this.sinPublicaciones=true
          }


        },
        error: (e) => console.error(e)
      });
  }

  detallePublicacion(id: any) {//voy a la publicacion conreta
    this.router.navigate(['/detallesPublicacion/' + id]);
  }

}
