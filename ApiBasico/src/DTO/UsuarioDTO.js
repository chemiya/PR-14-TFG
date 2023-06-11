class UsuarioDTO{
    constructor(id,username,password,email,rol,fotoRuta,descripcion,seguidores,seguidos){
        this.id=id;
        this.username=username;
        this.email=email;
        this.password=password;
        this.rol=rol;
        this.fotoRuta=fotoRuta;
        this.descripcion=descripcion;
        this.seguidores=seguidores;
        this.seguidos=seguidos;
    }
}

