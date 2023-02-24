import { Component } from '@angular/core';
import { Router } from '@angular/router';

//corregido hmtl y ts-------------------

@Component({
  selector: 'app-vista-admin',
  templateUrl: './vista-admin.component.html',
  styleUrls: ['./vista-admin.component.css']
})
export class VistaAdminComponent {
  constructor(private router:Router){}

  crearAlimento(){//voy a crear uno nuevo
    this.router.navigate(["crearAlimento/nuevo"])
  }
}
