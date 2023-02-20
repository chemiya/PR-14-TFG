import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionAPIService } from 'src/app/conexion-api.service';
import { AlimentoDAOService } from 'src/app/DAO/AlimentoDAO/alimento-dao.service';
import { PublicacionDAOService } from 'src/app/DAO/PublicacionDAO/publicacion-dao.service';
import { AlimentoDTO, PublicacionDTO } from 'src/app/modelo/app.model';


@Component({
  selector: 'app-detalle-alimento',
  templateUrl: './detalle-alimento.component.html',
  styleUrls: ['./detalle-alimento.component.css']
})
export class DetalleAlimentoComponent {
alimento!:AlimentoDTO;
publicaciones!:PublicacionDTO[];
constructor(private publicacionDAO:PublicacionDAOService,public alimentoDAO:AlimentoDAOService, private route: ActivatedRoute,private router:Router){}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  console.log(this.route.snapshot.params["id"])
  this.getAlimentoPorId(this.route.snapshot.params["id"]);
 this.getPublicacionesAlimento(this.route.snapshot.params["id"])


}

getAlimentoPorId(id:number){
  this.alimentoDAO.getAlimentoPorId(id)//busco todos
      .subscribe({
        next: (data) => {
          this.alimento=data[0];
          console.log(data[0])
        },
        error: (e) => console.error(e)
      });
}

getPublicacionesAlimento(id:any){
  this.publicacionDAO.getPublicacionesAlimento(id)//busco todos
      .subscribe({
        next: (data) => {
         this.publicaciones=data;
         console.log("enc"+data)
   
        },
        error: (e) => console.error(e)
      });
}

detallePublicacion(id:any){
  this.router.navigate(['/detallesPublicacion/'+id]);
}

}
