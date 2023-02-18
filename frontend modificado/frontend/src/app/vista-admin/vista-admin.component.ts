import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-admin',
  templateUrl: './vista-admin.component.html',
  styleUrls: ['./vista-admin.component.css']
})
export class VistaAdminComponent {
  constructor(private router:Router){}

  crearAlimento(){
    this.router.navigate(["crearAlimento"])
  }
}
