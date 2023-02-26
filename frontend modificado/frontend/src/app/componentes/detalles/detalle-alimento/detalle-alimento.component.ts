import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AlimentoDAOService } from 'src/app/DAO/AlimentoDAO/alimento-dao.service';
import { PublicacionDAOService } from 'src/app/DAO/PublicacionDAO/publicacion-dao.service';
import { AlimentoDTO, PublicacionDTO } from 'src/app/modelo/app.model';
import { Chart, registerables } from "chart.js";
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
  constructor(private publicacionDAO: PublicacionDAOService, public alimentoDAO: AlimentoDAOService, private route: ActivatedRoute, private router: Router) { }
 
 
  ngOnInit(): void {
   
    this.getAlimentoPorId(this.route.snapshot.params["id"]);//busco el alimento y sus publiciones asociadas
    this.getPublicacionesAlimento(this.route.snapshot.params["id"])

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
            "#FF6384",
            "#63FF84",
            "#84FF63"
          ]
        }]
    };

    var pieChart = new Chart("myChart", {
      type: 'pie',
      data: oilData
    });
  }



  getAlimentoPorId(id: number) {
    this.alimentoDAO.buscarAlimentoPorId(id)//busco el alimento por id
      .subscribe({
        next: (data) => {
          this.alimento = data[0];
          this.hacerGrafico(this.alimento.grasas, this.alimento.carbohidratos, this.alimento.proteinas)
        },
        error: (e) => console.error(e)
      });
  }

  getPublicacionesAlimento(id: any) {
    this.publicacionDAO.buscarPublicacionesAlimento(id)//busco sus publicaciones enlazadas por id
      .subscribe({
        next: (data) => {
          this.publicaciones = data;


        },
        error: (e) => console.error(e)
      });
  }

  detallePublicacion(id: any) {//voy a la publicacion conreta
    this.router.navigate(['/detallesPublicacion/' + id]);
  }

}
