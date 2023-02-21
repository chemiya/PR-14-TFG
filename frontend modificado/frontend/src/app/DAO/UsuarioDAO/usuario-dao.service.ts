import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioDTO } from 'src/app/modelo/app.model';
const baseUrl = 'http://localhost:3000/api/';
@Injectable({
  providedIn: 'root'
})
export class UsuarioDAOService {

  constructor(private http: HttpClient) { }

  identificacion(usuario:UsuarioDTO): Observable<any> {//devuelvo array y obtiene array en la peticion
    return this.http.post(baseUrl+"usuarios/identificacion",usuario);
  }

  registro(usuario:UsuarioDTO): Observable<any> {//devuelvo array y obtiene array en la peticion
    return this.http.post(baseUrl+"usuarios/registro",usuario);
  }

  buscarUsuarios(nombre:string): Observable<UsuarioDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<UsuarioDTO[]>(baseUrl+"usuarios?nombre="+nombre);
  }

  getUsuarioPorId(id: any): Observable<UsuarioDTO[]> {//me llega id y devuelvo array
    return this.http.get<UsuarioDTO[]>(baseUrl+"usuarios/"+id);
  }
  getNumeroSeguidores(id: any): Observable<any> {//me llega id y devuelvo array
    return this.http.get<any>(baseUrl+"usuarios/"+id+"/numeroSeguidores");
  }
  getNumeroSeguidos(id: any): Observable<any> {//me llega id y devuelvo array
    return this.http.get<any>(baseUrl+"usuarios/"+id+"/numeroSeguidos");
  }

  buscarTodosUsuarios(): Observable<UsuarioDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<UsuarioDTO[]>(baseUrl+"usuarios");
  }

  borrarUsuario(id:any): Observable<any> {
    return this.http.delete(baseUrl+"usuarios/"+id);
  }
  eliminarSeguimiento(idSeguido: any, idUsuario:any): Observable<any> {
    return this.http.delete(baseUrl+"usuarios/"+idUsuario+"/seguidos/"+idSeguido);
  }
  comprobarSeguimiento(id:any,idUsuario:any): Observable<any[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<any[]>(baseUrl+"usuarios/"+idUsuario+"/seguidos/"+id);
  }
  seguirUsuario(idSeguido:any,idSeguidor:any): Observable<any> {//devuelvo array y obtiene array en la peticion
    return this.http.post(baseUrl+"usuarios/"+idSeguidor+"/seguidos",idSeguido);
  }
  editarUsuario(id: any, usuario:UsuarioDTO): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('file', usuario.foto);
  formData.append("password",usuario.password);
  formData.append("descripcion",usuario.descripcion);
  formData.append("email",usuario.email);


   
 
    return this.http.put(baseUrl+"usuarios/"+id, formData);
}

getUsuariosSeguidos(id: any): Observable<any[]> {//me llega id y devuelvo array
  return this.http.get<any[]>(baseUrl+"usuarios/"+id+"/seguidos");
}
getUsuarioSeguidores(id: any): Observable<any[]> {//me llega id y devuelvo array
  return this.http.get<any[]>(baseUrl+"usuarios/"+id+"/seguidores");
}



}
