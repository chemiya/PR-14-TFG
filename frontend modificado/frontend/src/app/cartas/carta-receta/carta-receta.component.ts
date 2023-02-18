import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConexionAPIService } from 'src/app/conexion-api.service';
import { ResumenReceta } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/token-storage.service';

@Component({
  selector: 'app-carta-receta',
  templateUrl: './carta-receta.component.html',
  styleUrls: ['./carta-receta.component.css']
})
export class CartaRecetaComponent {
  @Input() receta!:ResumenReceta;
  @Input() mostrarEliminar!:boolean;
  currentUser:any
  @Output() actualizarFavoritas = new EventEmitter();

  constructor(private conexionAPI:ConexionAPIService,public toastr: ToastrService,private tokenStorage:TokenStorageService){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
   
    this.currentUser=this.tokenStorage.getUser();
    
  
  }



  eliminarFavorita(idReceta:any,event:Event){
    event.stopPropagation();
    this.conexionAPI.eliminarFavorita(this.currentUser.id,idReceta)//busco todos
    .subscribe({
      next: (data) => {
        console.log(data)
        this.toastr.success( 'Se ha eliminado la receta de favoritas');
        this.actualizarFavoritas.emit();

        
      },
      error: (e) => console.error(e)
    });
  }
}
