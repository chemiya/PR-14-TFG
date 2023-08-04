const uploadFile = require("../middleware/upload");
const fs = require("fs");
const cloudinary = require('../middleware/cloudinary')
const baseUrl = "http://localhost:8080/files/";
const conexion = require('../../config/conexion')


const buscarPublicacionesSeguidos = async (req, res) => {
    const { id } = req.params
    let sql = `select p.id,p.idReceta,p.idCreador,u.fotoRuta as fotoCreador, p.titulo,u.username as usernameUsuario,r.titulo as tituloReceta,p.fotoRuta from publicacion p, usuario u, receta r where p.idCreador in (select s.idSeguido from seguidor s where s.idSeguidor='${id}') and p.idCreador=u.id and p.idReceta=r.id order by p.fechapublicacion;`//hago select de todos
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)//devuelvo el resultado en json
        }
    })
}


const buscarPublicacionesUsuario = async (req, res) => {
    const { id } = req.params
    let sql = `(select p.id,p.idReceta,p.idCreador,u.fotoRuta as fotoCreador, p.titulo,r.titulo as tituloReceta,p.fotoRuta,u.username as usernameUsuario from publicacion p, usuario u, receta r where p.idCreador=u.id and r.id=p.idReceta and  u.id='${id}')union(select p.id,p.idAlimento,p.idCreador,u.fotoRuta as fotoCreador, p.titulo,a.nombre as nombreAlimento,p.fotoRuta,u.username as usernameUsuario from publicacion p, usuario u, alimento a where p.idCreador=u.id and a.id=p.idAlimento and  u.id='${id}');`//hago select de todos
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {

            res.json(rows)//devuelvo el resultado en json
        }
    })


}

const buscarPublicacionesReceta = async (req, res) => {
    const { id } = req.params
    let sql = `select p.id,p.idReceta,p.idCreador,u.fotoRuta as fotoCreador, p.titulo,u.username as usernameUsuario,r.titulo as tituloReceta,p.fotoRuta from publicacion p, usuario u, receta r where p.idCreador=u.id and r.id=p.idReceta and  r.id='${id}';`//hago select de todos
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)//devuelvo el resultado en json
        }
    })
}

const buscarPublicacionPorId = async (req, res) => {
    const { id } = req.params//cojo el id que me lega y hago select con el y devuelvo en json

    let sql = `select p.id, p.titulo, p.descripcion, p.fechapublicacion, u.username as usernameUsuario,u.fotoRuta as fotoCreador, r.fotoRuta as fotoReceta, r.titulo as tituloReceta, p.idCreador, p.idReceta,p.fotoRuta  from publicacion p, usuario u, receta r where p.idCreador=u.id and p.idReceta=r.id and p.id= '${id}' `//hago select de todos
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {

            if (rows.length == 0) {
                sql = `select p.id, p.titulo, p.descripcion, p.fechapublicacion, u.username as usernameUsuario,u.fotoRuta as fotoCreador, a.fotoRuta as fotoAlimento, a.nombre as nombreAlimento, p.idCreador, p.idAlimento,p.fotoRuta  from publicacion p, usuario u, alimento a where p.idCreador=u.id and p.idAlimento=a.id and p.id= '${id}' `
                conexion.query(sql, (err, rows, fields) => {
                    if (err) throw err;
                    else {

                        res.json(rows)//devuelvo el resultado en json
                    }
                })



            } else {
                res.json(rows)//devuelvo el resultado en json
            }

        }
    })



}

const buscarPublicacionesAlimento = async (req, res) => {
    const { id } = req.params
    let sql = `select p.id,p.idReceta,p.idCreador, p.titulo,u.username as usernameUsuario,u.fotoRuta as fotoCreador,a.nombre as nombreAlimento,p.fotoRuta from publicacion p, usuario u, alimento a where p.idCreador=u.id and a.id=p.idAlimento and  a.id='${id}';`//hago select de todos
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)//devuelvo el resultado en json
        }
    })
}


const buscarPublicaciones = async (req, res) => {
    let sql = `(select p.id,p.idReceta,p.idCreador,p.fechapublicacion,u.fotoRuta as fotoCreador, p.titulo,r.titulo as tituloReceta,p.fotoRuta,u.username as usernameUsuario from publicacion p, usuario u, receta r where p.idCreador=u.id and r.id=p.idReceta )union((select p.id,p.idAlimento,p.idCreador,p.fechapublicacion,u.fotoRuta as fotoCreador, p.titulo,a.nombre as nombreAlimento,p.fotoRuta,u.username as usernameUsuario from publicacion p, usuario u, alimento a where p.idCreador=u.id and a.id=p.idAlimento ));`//hago select de todos

    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {

            res.json(rows)//devuelvo el resultado en json
        }
    })



}


const eliminarPublicacion = async (req, res) => {
    const { id } = req.params//cojo el id y hago consulta para borrarlo, devuelvo texto

    let sql = `delete from publicacion r where r.id = '${id}'`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err
        else {
            res.json({ status: 'publicacion eliminada ' })
        }
    })
}




const crearPublicacion = async (req, res) => {

    try {


        await uploadFile(req, res);//llam a multer para guardarlo


        //console.log("----------------------------")
        //console.log(req)//vody tiene el nombre y debajo file
        if (req.file == undefined) {//error sin imagen
            return res.status(400).send({ message: "Please upload a file!" });
        }



        const path = "images/" + req.file.originalname;


        const newPath = await cloudinary.uploads(path, 'Images');//llamo al cloudinary para que lo suba
        //console.log("ruta cloudinary:"+newPath.url)//me devuelvo lo de cloudinaru



        const { titulo, descripcion, idCreador, idAlimento, idReceta } = req.body//cojo el body que m ellega y lo inserto y devuelvo texto

        //const fechapublicacion = "2020-1-01 19:0:00"
        var fecha = new Date()
        var mes = (fecha.getMonth()) + 1
        var dia = (fecha.getDate())
        var agno = (fecha.getFullYear())
        var min = (fecha.getMinutes())
        var sec = (fecha.getSeconds())
        var hora = (fecha.getHours())

        var fechaPublicacionJunta = agno + "-" + mes + "-" + dia + " " + hora + ":" + min + ":" + sec


        let sql = "";

        if (idAlimento == 0) {
            sql = `insert into publicacion(titulo,descripcion,fechapublicacion,idCreador,idReceta,fotoRuta) values('${titulo}','${descripcion}','${fechaPublicacionJunta}','${idCreador}','${idReceta}','${newPath.url}')`
        } else {
            sql = `insert into publicacion(titulo,descripcion,fechapublicacion,idCreador,idAlimento,fotoRuta) values('${titulo}','${descripcion}','${fechaPublicacionJunta}','${idCreador}','${idAlimento}','${newPath.url}')`
        }



        conexion.query(sql, (err, rows, fields) => {
            if (err) throw err
            else {
                res.status(200).send({//si se guarda correctamente
                    message: "Uploaded the file successfully: " + req.file.originalname,
                });
            }
        })








    } catch (err) {
        console.log(err);

        if (err.code == "LIMIT_FILE_SIZE") {//error de tamano
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!",
            });
        }

        res.status(500).send({//que no se pueda subir
            message: `Could not upload the file: . ${err}`,
        });
    }
};


const actualizarPublicacion = async (req, res) => {
    var foto = true;
    let sql;
    var newPath;



    try {


        await uploadFile(req, res);//llam a multer para guardarlo


        //console.log("----------------------------")
        //console.log(req)//vody tiene el nombre y debajo file
        if (req.file == undefined) {//error sin imagen
            foto = false;
        }


        if (foto == true) {
            const path = "images/" + req.file.originalname;
            console.log(req.file.originalname)


            newPath = await cloudinary.uploads(path, 'Images');//llamo al cloudinary para que lo suba
            //console.log("ruta cloudinary:"+newPath.url)//me devuelvo lo de cloudinaru

            console.log(newPath.url)


        }



        const { id } = req.params
        const { titulo, descripcion, idReceta, idAlimento } = req.body//cojo los campos y el id que me llega y hago actualizaciony devuelvo texto
        var relacionReceta = false;
        if (idReceta > 0) {
            relacionReceta = true
        }



        
        
              if(foto==true && relacionReceta==true){
                sql = `update publicacion set 
                titulo ='${titulo}',
                descripcion='${descripcion}',
                idReceta='${idReceta}',
                fotoRuta='${newPath.url}'
                
                where id= '${id}'`
        
        
              }else if (foto==true && relacionReceta==false) {
                sql = `update publicacion set 
                titulo ='${titulo}',
                descripcion='${descripcion}',
                idAlimento='${idAlimento}',
                fotoRuta='${newPath.url}'
                
                where id= '${id}'`
              }

              else if(foto==false && relacionReceta==true){
                sql = `update publicacion set 
                titulo ='${titulo}',
                descripcion='${descripcion}',
                idReceta='${idReceta}'
               
                
                where id= '${id}'`
        
        
              }else if (foto==false && relacionReceta==false) {
                sql = `update publicacion set 
                titulo ='${titulo}',
                descripcion='${descripcion}',
                idAlimento='${idAlimento}'
               
                
                where id= '${id}'`
              }
        
        
              conexion.query(sql, (err, rows, fields) => {
                  if (err) throw err
                  else {
                      res.status(200).send({//si se guarda correctamente
                          message: "actualizado con exito "
                      });
                  }
              })
        
        
        







    } catch (err) {
        console.log(err);

        if (err.code == "LIMIT_FILE_SIZE") {//error de tamano
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!",
            });
        }

        res.status(500).send({//que no se pueda subir
            message: `Could not upload the file: . ${err}`,
        });
    }
    
}



module.exports = {
    actualizarPublicacion, crearPublicacion, eliminarPublicacion, buscarPublicacionPorId, buscarPublicaciones, buscarPublicacionesAlimento, buscarPublicacionesReceta, buscarPublicacionesSeguidos, buscarPublicacionesUsuario
}




