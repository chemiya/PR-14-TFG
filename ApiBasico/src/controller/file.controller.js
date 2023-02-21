const uploadFile = require("../middleware/upload");
const fs = require("fs");
const cloudinary = require('./cloudinary')
const baseUrl = "http://localhost:8080/files/";
const conexion = require('../../config/conexion')

const crearAlimento = async (req, res) => {
  try {

 
    await uploadFile(req, res);//llam a multer para guardarlo
 

//console.log("----------------------------")
//console.log(req)//vody tiene el nombre y debajo file
    if (req.file == undefined) {//error sin imagen
      return res.status(400).send({ message: "Please upload a file!" });
    }



    const path="images/"+req.file.originalname;
  
      
      const newPath =  await cloudinary.uploads(path, 'Images');//llamo al cloudinary para que lo suba
      //console.log("ruta cloudinary:"+newPath.url)//me devuelvo lo de cloudinaru
     
    

      const { nombre, descripcion, calorias,enlace,carbohidratos,grasas,proteinas,cantidad,medida } = req.body//cojo el body que m ellega y lo inserto y devuelvo texto

      let sql = `insert into alimento(nombre,descripcion,calorias,fotoRuta,enlace,carbohidratos,grasas,proteinas,cantidad,medida) values('${nombre}','${descripcion}','${calorias}','${newPath.url}','${enlace}','${carbohidratos}','${grasas}','${proteinas}','${cantidad}','${medida}')`
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


const editarUsuario = async (req, res) => {
  try {

 
    await uploadFile(req, res);//llam a multer para guardarlo
 

//console.log("----------------------------")
//console.log(req)//vody tiene el nombre y debajo file
    if (req.file == undefined) {//error sin imagen
      return res.status(400).send({ message: "Please upload a file!" });
    }



    const path="images/"+req.file.originalname;
  
      
      const newPath =  await cloudinary.uploads(path, 'Images');//llamo al cloudinary para que lo suba
      //console.log("ruta cloudinary:"+newPath.url)//me devuelvo lo de cloudinaru
     
      const { id } = req.params
      const { password, email ,descripcion} = req.body//cojo los campos y el id que me llega y hago actualizaciony devuelvo texto
  
      let sql = `update usuario set 
                password ='${password}',
                descripcion='${descripcion}',
                email='${email}',
                fotoRuta='${newPath.url}'
               
                where id= '${id}'`
  
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

const crearReceta = async (req, res) => {
  try {

 
    await uploadFile(req, res);//llam a multer para guardarlo
 

//console.log("----------------------------")
//console.log(req)//vody tiene el nombre y debajo file
    if (req.file == undefined) {//error sin imagen
      return res.status(400).send({ message: "Please upload a file!" });
    }



    const path="images/"+req.file.originalname;
  
      
      const newPath =  await cloudinary.uploads(path, 'Images');//llamo al cloudinary para que lo suba
      //console.log("ruta cloudinary:"+newPath.url)//me devuelvo lo de cloudinaru
     
    

      const { titulo, resumen,  tiempo, idCreador,dificultad } = req.body//cojo el body que m ellega y lo inserto y devuelvo texto

      let sql = `insert into receta(titulo, resumen,  tiempo, idCreador,fotoRuta,dificultad) values('${titulo}','${resumen}','${tiempo}','${idCreador}','${newPath.url}','${dificultad}')`
      conexion.query(sql, (err, rows, fields) => {
          if (err) throw err
          else {
  
            res.status(200).send({ id: rows.insertId })
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



const crearPublicacion = async (req, res) => {
  try {

 
    await uploadFile(req, res);//llam a multer para guardarlo
 

//console.log("----------------------------")
//console.log(req)//vody tiene el nombre y debajo file
    if (req.file == undefined) {//error sin imagen
      return res.status(400).send({ message: "Please upload a file!" });
    }



    const path="images/"+req.file.originalname;
  
      
      const newPath =  await cloudinary.uploads(path, 'Images');//llamo al cloudinary para que lo suba
      //console.log("ruta cloudinary:"+newPath.url)//me devuelvo lo de cloudinaru
     
    

      const { titulo, descripcion, idCreador, idAlimento, idReceta } = req.body//cojo el body que m ellega y lo inserto y devuelvo texto
    const fechapublicacion = "2020-01-01"
    let sql = "";
  
    if (idAlimento == undefined) {
        sql = `insert into publicacion(titulo,descripcion,fechapublicacion,idCreador,idReceta,fotoRuta) values('${titulo}','${descripcion}','${fechapublicacion}','${idCreador}','${idReceta}','${newPath.url}')`
    } else {
        sql = `insert into publicacion(titulo,descripcion,fechapublicacion,idCreador,idAlimento,fotoRuta) values('${titulo}','${descripcion}','${fechapublicacion}','${idCreador}','${idAlimento}','${newPath.url}')`
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





module.exports = {
  crearAlimento,
  editarUsuario,crearReceta,crearPublicacion
};
