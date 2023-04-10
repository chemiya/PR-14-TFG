import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-icono-aplicacion',
  templateUrl: './icono-aplicacion.component.html',
  styleUrls: ['./icono-aplicacion.component.css']
})
export class IconoAplicacionComponent {
  constructor(private router:Router){}


  irMuro(){
    this.router.navigate(["muroPublicaciones"])
  }
}
