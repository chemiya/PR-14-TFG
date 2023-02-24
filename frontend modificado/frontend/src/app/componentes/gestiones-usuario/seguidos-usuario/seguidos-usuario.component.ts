import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UsuarioDAOService } from 'src/app/DAO/UsuarioDAO/usuario-dao.service';
import { UsuarioDTO } from 'src/app/modelo/app.model';
import { TokenStorageService } from 'src/app/DAO/TokenServicio/token-storage.service';

//corregido html y ts------------------

@Component({
  selector: 'app-seguidos-usuario',
  templateUrl: './seguidos-usuario.component.html',
  styleUrls: ['./seguidos-usuario.component.css']
})
export class SeguidosUsuarioComponent {
usuariosSeguidos!:UsuarioDTO[];
constructor(private usuarioDAO:UsuarioDAOService,public toastr: ToastrService,private tokenService:TokenStorageService,private router:Router){}
currentUser:any
ngOnInit(): void {
  
this.currentUser=this.tokenService.getUser();//cojo el usuario
  this.getUsuariosSeguidos();//cojo sus seguidos

}

getUsuariosSeguidos(){
  this.usuarioDAO.getUsuariosSeguidos(this.currentUser.id)//busco todos sus seguidos
      .subscribe({
        next: (data) => {
          this.usuariosSeguidos = data;//los guardo en el array
          console.log(data);
        },
        error: (e) => console.error(e)
      });
}



detallesUsuario(idSeguido:any){//voy al usuario concreto
  this.router.navigate(['/detallesUsuario/'+idSeguido]);
}
}
