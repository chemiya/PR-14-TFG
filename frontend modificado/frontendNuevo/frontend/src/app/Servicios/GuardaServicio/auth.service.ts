import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../TokenServicio/token-storage.service';
import { UsuarioDTO } from 'src/app/DTO/UsuarioDTO';



const baseUrl = 'http://localhost:3000/api/';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }


  identificacion(usuario:UsuarioDTO): Observable<any> {//realiza la identificacion
    return this.http.post(baseUrl+"usuarios/identificacion",usuario);
  }

  registro(usuario:UsuarioDTO): Observable<any> {//registra un usuario
    return this.http.post(baseUrl+"usuarios/registro",usuario);
  }

 
  loggedIn(){//comprueba si hay token
    return this.tokenStorage.getToken();
  }
}