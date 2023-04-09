import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBodyComponent } from '../../cartas/dialog-body/dialog-body.component';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/DAO/TokenServicio/token-storage.service';
import { UsuarioDAOService } from 'src/app/DAO/UsuarioDAO/usuario-dao.service';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent {
  @Input() fotoRuta!: string;
  constructor(private usuarioDAO:UsuarioDAOService, private dialog: MatDialog,private tokenStorageService:TokenStorageService, private router:Router,private tokenStorage:TokenStorageService){}

  logout(): void {//llamo al token
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {//pongo el mensaje
      texto:"¿deseas cerrar sesión?",
      titulo:"Cerrar sesión"
    }
  
    const dialogRef = this.dialog.open(DialogBodyComponent, dialogConfig);//abro el dialogo
  
    dialogRef.afterClosed().subscribe(//al cerrar
      data => {
        if (data == "si") {//si recibo si
          this.tokenStorageService.signOut();
          this.router.navigate(["identificacion"])
           
        }
      })
  
    
    
  }

  irMuro(){
    this.router.navigate(["muroPublicaciones"])
  }
}
