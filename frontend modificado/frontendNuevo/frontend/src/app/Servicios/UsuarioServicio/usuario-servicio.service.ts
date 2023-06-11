import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioDTO } from 'src/app/DTO/UsuarioDTO';

const baseUrl = 'http://localhost:3000/api/';
@Injectable({
  providedIn: 'root'
})
export class UsuarioServicioService {

  constructor(private http: HttpClient) { }

 

  comprobarUsernameRepetido(username:string): Observable<any> {//devuelvo array y obtiene array en la peticion
    return this.http.get<any>(baseUrl+"usuarios/repetidos?username="+username);
  }

  comprobarEmailRepetido(email:string): Observable<any> {//devuelvo array y obtiene array en la peticion
    return this.http.get<any>(baseUrl+"usuarios/repetidos?email="+email);
  }

  buscarUsuarios(nombre:string): Observable<UsuarioDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<UsuarioDTO[]>(baseUrl+"usuarios?nombre="+nombre);
  }

  buscarUsuarioPorId(id: any): Observable<UsuarioDTO[]> {//me llega id y devuelvo array
    return this.http.get<UsuarioDTO[]>(baseUrl+"usuarios/"+id);
  }
 

  buscarTodosUsuarios(): Observable<UsuarioDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<UsuarioDTO[]>(baseUrl+"usuarios");
  }

  borrarUsuario(id:any): Observable<any> {//elimina con el id
    return this.http.delete(baseUrl+"usuarios/"+id);
  }
 
  actualizarUsuario(id: any, usuario:UsuarioDTO): Observable<any> {//actualiza los campos
    const formData: FormData = new FormData();//creamos el formdata y le metemos lo que nos llega

    formData.append('file', usuario.foto);
  formData.append("password",usuario.password);
  formData.append("descripcion",usuario.descripcion);
  formData.append("email",usuario.email);


   
 
    return this.http.put(baseUrl+"usuarios/"+id, formData);
}







}
