const uploadFile = require("../middleware/upload");
const fs = require("fs");
const cloudinary = require('./cloudinary')
const baseUrl = "http://localhost:8080/files/";
const conexion = require('../../config/conexion')

const upload = async (req, res) => {
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
     
    

      const { nombre, descripcion, calorias } = req.body//cojo el body que m ellega y lo inserto y devuelvo texto

      let sql = `insert into alimento(nombre,descripcion,calorias,foto) values('${nombre}','${descripcion}','${calorias}','${newPath.url}')`
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
  upload
};
