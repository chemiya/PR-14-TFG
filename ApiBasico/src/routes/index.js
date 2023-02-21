
const controller = require("../controller/file.controller");
const router = require('express').Router()
const conexion = require('../../config/conexion')
const jsonwebtoken = require('jsonwebtoken');

const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const cookieParser = require('cookie-parser');





//npm install --save jsonwebtoken bcrypt cookie-parser










//******************************************************LIMPIO************************************************** */


/******************************************usuario identificacion******************************************************************** */

router.post('/usuarios/identificacion', (req, res) => {
    const { username, password } = req.body//cojo el body que m ellega y lo inserto y devuelvo texto

    let sql = `SELECT * FROM usuario where username= '${username}' `
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            if (rows == 0) {
                return res.json({
                    status: "usuario y contrasena incorrectos"
                })
            } else {
                let user = rows[0];


                const isValidPassword = compareSync(password, user.password);//comprobamos la contraseñla
                if (isValidPassword) {//si es valida
                    user.password = undefined;//generamos token y lo devolvemos
                    const jsontoken = jsonwebtoken.sign({ user: user }, "secret_key", { expiresIn: '30m' });
                    res.cookie('token', jsontoken, { httpOnly: true, secure: true, SameSite: 'strict', expires: new Date(Number(new Date()) + 30 * 60 * 1000) }); //we add secure: true, when using https.


                    res.json({ token: jsontoken, id: user.id, username: username, rol: user.rol });//creamos la cooki y devolvemos json
                    //return res.redirect('/mainpage') ;

                } else {
                    return res.json({
                        status: "usuario y contrasena incorrectos"
                    });
                }
            }
        }

    })

})








/*****************************************usuario registro********************************************************************* */

router.post('/usuarios/registro', (req, res) => {
    const { username,  email } = req.body//cojo el body que m ellega y lo inserto y devuelvo texto
    let password = req.body.password;
    /*let sql = `insert into usuario(username,password,fotoperfil) values('${username}','${password}','${fotoPerfil}')`
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'receta agregada'})
        }
    })*/

    const salt = genSaltSync(10);
    password = hashSync(password, salt);

    let sql = `insert into usuario(username,password,email,rol,fotoRuta) values('${username}','${password}','${email}',"user","https://res.cloudinary.com/chemareact/image/upload/v1676929586/Images/generico_ox5yja.png")`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        const user = (rows.insertId)


        const jsontoken = jsonwebtoken.sign({ user: user }, "secret_key", { expiresIn: '30m' });///generamos token
        res.cookie('token', jsontoken, { httpOnly: true, secure: true, SameSite: 'strict', expires: new Date(Number(new Date()) + 30 * 60 * 1000) }); //we add secure: true, when using https.


        let sql = `SELECT u.id,u.username FROM usuario u where u.id='${user}';`//hago select de todos
        conexion.query(sql, (err, rows, fields) => {
            if (err) throw err;
            else {
                return res.json({ status: "usuario registrado con exito" });
            }
        })

        //res.json({ token: jsontoken, user: user });
    })


})
































/*******************************publicaciones de los seguidos******************************************************************************* */

router.get('/publicaciones/seguidos/:id', (req, res) => {
    const { id } = req.params
    let sql = `select p.id,p.idReceta,p.idCreador, p.titulo,u.username as usernameUsuario,r.titulo as tituloReceta,p.fotoRuta from publicacion p, usuario u, receta r where p.idCreador in (select s.idSeguido from seguidor s where s.idSeguidor='${id}') and p.idCreador=u.id and p.idReceta=r.id order by p.fechapublicacion;`//hago select de todos
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)//devuelvo el resultado en json
        }
    })

})




/**************************************************usuario por id************************************************************ */
router.get('/usuarios/:id', (req, res) => {
    const { id } = req.params//cojo el id que me lega y hago select con el y devuelvo en json
    let sql = 'select * from usuario where id = ?'
    conexion.query(sql, [id], (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)
        }
    })
})




/*********************************************numero seguidos***************************************************************** */

router.get('/usuarios/:id/numeroSeguidos', (req, res) => {
    const { id } = req.params
    let sql = `select count(*) as seguidos from usuario u, usuario u1, seguidor s where u.id=s.idSeguidor and s.idSeguido=u1.id and u.id='${id}';`//hago select de todos
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)//devuelvo el resultado en json
        }
    })

})





/*******************************************numeroSeguidores******************************************************************* */

router.get('/usuarios/:id/numeroSeguidores', (req, res) => {
    const { id } = req.params
    let sql = `select count(*) as seguidores from usuario u, usuario u1, seguidor s where u.id=s.idSeguido and s.idSeguidor=u1.id and u.id='${id}';`//hago select de todos
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)//devuelvo el resultado en json
        }
    })

})


/**************************************************publicaciones del usuario************************************************************ */
router.get('/usuarios/:id/publicaciones', (req, res) => {
    const { id } = req.params
    let sql = `select p.id,p.idReceta,p.idCreador, p.titulo,r.titulo as tituloReceta,p.fotoRuta,u.username as usernameUsuario from publicacion p, usuario u, receta r where p.idCreador=u.id and r.id=p.idReceta and  u.id='${id}';`//hago select de todos
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)//devuelvo el resultado en json
        }
    })

})

/**************************************************modificar usuario************************************************************ */


router.put("/usuarios/:id", controller.editarUsuario);


/***************************************recetas favoritas*********************************************************************** */

router.get('/usuarios/:id/favoritas', (req, res) => {
    const { id } = req.params
    let sql = `SELECT r.id ,r.titulo,r.tiempo,u1.username as usernameUsuario, r.fotoRuta FROM receta r, usuario u,usuario u1, favorita f where u.id=f.idUsuario and f.idReceta=r.id and u1.id=r.idCreador and u.id='${id}';`//hago select de todos
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)//devuelvo el resultado en json
        }
    })

})





/***************************************eliminar receta favorita*********************************************************************** */

router.delete('/usuarios/:id/favoritas/:idFavorita', (req, res) => {
    const { id, idFavorita } = req.params//cojo el id y hago consulta para borrarlo, devuelvo texto

    let sql = `delete from favorita f where f.idUsuario = '${id}' and f.idReceta='${idFavorita}'`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err
        else {
            res.json({ status: 'receta eliminada de favoritas' })
        }
    })
});






























/*******************************************buscador de usuarios******************************************************************* */
router.get('/usuarios', (req, res) => {
    let sql;
    const { nombre } = req.query
    if (nombre == null) {
        sql = `select u.id, u.username, u.email, u.rol from usuario u  `//hago select de todos
    } else {
        sql = `select u.id, u.username, (select count(*)  from usuario u2, usuario u3, seguidor s where u2.id=s.idSeguido and s.idSeguidor=u3.id and u2.id=u.id) as seguidores,u.descripcion,u.fotoRuta from usuario u where u.username like '%${nombre}%' `//hago select de todos
    }

    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)//devuelvo el resultado en json
        }
    })

})



/*********************************buscador recetas***************************************************************************** */

router.get('/recetas', (req, res) => {
    let sql;
    const { titulo } = req.query
    if (titulo == null) {
        sql = `select r.id,r.dificultad, r.titulo, u.username as usernameUsuario, r.tiempo,r.fotoRuta from receta r,usuario u where r.idCreador=u.id  `//hago select de todos
    } else {
        sql = `select r.id,r.dificultad, r.titulo, u.username usernameUsuario, r.tiempo, r.fotoRuta from receta r,usuario u where r.idCreador=u.id and r.titulo like '%${titulo}%' `//hago select de todos
    }

    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)//devuelvo el resultado en json
        }
    })

})




/******************************************buscador alimentos******************************************************************** */
router.get('/alimentos', (req, res) => {
    let sql;
    const { nombre } = req.query
    if (nombre == null) {
        sql = `select a.id,a.enlace,a.cantidad, a.nombre, a.descripcion, a.calorias,a.fotoRuta,a.medida from alimento a  `//hago select de todos
    } else {
        sql = `select a.id,a.enlace,a.cantidad, a.nombre, a.descripcion, a.calorias,a.fotoRuta, a.medida from alimento a where a.nombre like '%${nombre}%' `//hago select de todos
    }


    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)//devuelvo el resultado en json
        }
    })

})


/************************************************alimento por id************************************************************** */
router.get('/alimentos/:id', (req, res) => {
    const { id } = req.params//cojo el id que me lega y hago select con el y devuelvo en json
    let sql = 'select * from alimento where id = ?'
    conexion.query(sql, [id], (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)
        }
    })
})
/********************************************receta por id****************************************************************** */
router.get('/recetas/:id', (req, res) => {
    const { id } = req.params//cojo el id que me lega y hago select con el y devuelvo en json
    let sql = `select r.id, r.titulo, r.resumen,r.tiempo, u.username as usernameCreador, r.idCreador, r.fotoRuta from receta r, usuario u where r.idCreador=u.id and r.id= '${id}' `//hago select de todos
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)//devuelvo el resultado en json
        }
    })
})
/******************************************alimentos en la receta******************************************************************** */
router.get('/recetas/:id/alimentosRecetas', (req, res) => {
    const { id } = req.params
    let sql = `select a.nombre as nombreAlimento, ar.cantidad,ar.medida,a.fotoRuta, ar.idAlimento from alimento a, receta r, alimentoReceta ar where r.id=ar.idReceta and ar.idAlimento=a.id and r.id='${id}'`//hago select de todos
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)//devuelvo el resultado en json
        }
    })

})

/***************************************publicaciones una receta*********************************************************************** */
router.get('/recetas/:id/publicaciones', (req, res) => {
    const { id } = req.params
    let sql = `select p.id,p.idReceta,p.idCreador, p.titulo,u.username as usernameUsuario,r.titulo as tituloReceta,p.fotoRuta from publicacion p, usuario u, receta r where p.idCreador=u.id and r.id=p.idReceta and  r.id='${id}';`//hago select de todos
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)//devuelvo el resultado en json
        }
    })

})

/***************************************publicaciones una receta*********************************************************************** */

router.get('/usuarios/:id/seguidores', (req, res) => {
    const { id } = req.params
    let sql = `select u1.id, u1.username,u1.fotoRuta,u1.descripcion, (select count(*)  from usuario u2, usuario u3, seguidor s where u2.id=s.idSeguido and s.idSeguidor=u3.id and u2.id=u1.id) as seguidores from usuario u, usuario u1, seguidor s where u.id=s.idSeguido and s.idSeguidor=u1.id and u.id='${id}';`//hago select de todos
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)//devuelvo el resultado en json
        }
    })

})
















/***********************************anadir receta favorita*************************************************************************** */
router.post('/usuarios/:id/favoritas', (req, res) => {

    const { id } = req.params
    const { idReceta } = req.body//cojo el body que m ellega y lo inserto y devuelvo texto

    let sql = `insert into favorita(idReceta,idUsuario) values('${idReceta}','${id}')`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err
        else {
            res.json({ status: 'receta agregada a favoritas' })
        }
    })
})









/*****************************publicacion por id********************************************************************************* */


router.get('/publicaciones/:id', (req, res) => {
    const { id } = req.params//cojo el id que me lega y hago select con el y devuelvo en json
    let sql = `select p.id, p.titulo, p.descripcion, p.fechapublicacion, u.username as usernameUsuario, r.titulo as tituloReceta, p.idCreador, p.idReceta,p.fotoRuta  from publicacion p, usuario u, receta r where p.idCreador=u.id and p.idReceta=r.id and p.id= '${id}' `//hago select de todos
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)//devuelvo el resultado en json
        }
    })
})




/*******************************get comentarios de una publicacion******************************************************************************* */

router.get('/publicaciones/:id/comentarios', (req, res) => {
    const { id } = req.params//cojo el body que m ellega y lo inserto y devuelvo texto

    let sql = `select u.username as usernameUsuario,u.fotoRuta,c.idUsuario,c.comentario from comentario c, publicacion p, usuario u where u.id=c.idUsuario and p.id=c.idPublicacion and p.id='${id}'`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)//devuelvo el resultado en json
        }
    })

})

/*****************************************crear comentario********************************************************************* */
router.post('/publicaciones/:id/comentarios', (req, res) => {
    const { idUsuario, comentario } = req.body//cojo el body que m ellega y lo inserto y devuelvo texto
    const { id } = req.params

    let sql = `insert into comentario(idPublicacion, idUsuario,comentario) values('${id}','${idUsuario}','${comentario}')`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err
        else {
            res.json({ status: 'comentario guardado con exito' })
        }
    })
})
/**********************************************************get usuarios seguidos**************************************************** */
router.get('/usuarios/:id/seguidos', (req, res) => {
    const { id } = req.params
    let sql = `select  s.idSeguido as id, u1.username, u1.descripcion, u1.fotoRuta , (select count(*)  from usuario u2, usuario u3, seguidor s where u2.id=s.idSeguido and s.idSeguidor=u3.id and u2.id=u1.id) as seguidores from usuario u, usuario u1, seguidor s where u.id=s.idSeguidor and s.idSeguido=u1.id and u.id='${id}';`//hago select de todos
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)//devuelvo el resultado en json
        }
    })

})
/***************************************************borrar seguidor*********************************************************** */
router.delete('/usuarios/:id/seguidos/:idSeguido', (req, res) => {
    const { id, idSeguido } = req.params//cojo el id y hago consulta para borrarlo, devuelvo texto

    let sql = `delete from seguidor s where s.idSeguidor = '${id}' and s.idSeguido='${idSeguido}'`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err
        else {
            res.json({ status: 'has dejado de seguir al usuario' })
        }
    })
});
/************************************************************************************************************** */

















































































































/************************************************************************************************************** */




router.post("/alimentos", controller.crearAlimento);



router.post("/recetas", controller.crearReceta);


//modificar







router.get('/usuarios/:idUsuario/favoritas/:idReceta', (req, res) => {
    const { idUsuario, idReceta } = req.params
    let sql = `SELECT * FROM  favorita f where f.idUsuario='${idUsuario}' and f.idReceta='${idReceta}';`//hago select de todos
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)//devuelvo el resultado en json
        }
    })

})

router.get('/usuarios/:idUsuario/seguidos/:idSeguido', (req, res) => {
    const { idUsuario, idSeguido } = req.params
    let sql = `SELECT * FROM  seguidor s where s.idSeguidor='${idUsuario}' and s.idSeguido='${idSeguido}';`//hago select de todos
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)//devuelvo el resultado en json
        }
    })

})






router.get('/alimentos/:id/publicaciones', (req, res) => {
    const { id } = req.params
    let sql = `select p.id,p.idReceta,p.idCreador, p.titulo,u.username as usernameUsuario,a.nombre as nombreAlimento,p.fotoRuta from publicacion p, usuario u, alimento a where p.idCreador=u.id and a.id=p.idAlimento and  a.id='${id}';`//hago select de todos
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)//devuelvo el resultado en json
        }
    })

})





router.get('/publicaciones', (req, res) => {

    let sql = `SELECT p.id, p.titulo, p.fechapublicacion,u.username as usernameUsuario,r.titulo as tituloReceta FROM publicacion p,usuario u,receta r where p.idCreador=u.id and p.idReceta=r.id ;`//hago select de todos
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {

            res.json(rows)//devuelvo el resultado en json
        }
    })

})





router.delete('/recetas/:id', (req, res) => {
    const { id } = req.params//cojo el id y hago consulta para borrarlo, devuelvo texto

    let sql = `delete from receta r where r.id = '${id}'`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err
        else {
            res.json({ status: 'receta eliminada ' })
        }
    })
});

router.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params//cojo el id y hago consulta para borrarlo, devuelvo texto

    let sql = `delete from usuario r where r.id = '${id}'`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err
        else {
            res.json({ status: 'receta eliminada ' })
        }
    })
});

router.delete('/publicaciones/:id', (req, res) => {
    const { id } = req.params//cojo el id y hago consulta para borrarlo, devuelvo texto

    let sql = `delete from publicacion r where r.id = '${id}'`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err
        else {
            res.json({ status: 'receta eliminada ' })
        }
    })
});


router.delete('/alimentos/:id', (req, res) => {
    const { id } = req.params//cojo el id y hago consulta para borrarlo, devuelvo texto

    let sql = `delete from alimento r where r.id = '${id}'`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err
        else {
            res.json({ status: 'receta eliminada ' })
        }
    })
});



router.post('/usuarios/:id/seguidos', (req, res) => {
    const { id } = req.params
    const { idSeguido } = req.body//cojo el body que m ellega y lo inserto y devuelvo texto

    let sql = `insert into seguidor(idSeguido,idSeguidor) values('${idSeguido}','${id}')`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err
        else {
            res.json({ status: 'has comenzado a seguir al usuario' })
        }
    })
})













//get equipos











// get un equipo



//agregar equipo





//modificar
router.put('/recetas/:id', (req, res) => {
    const { id } = req.params
    const { titulo, resumen, pasos, tiempo } = req.body//cojo los campos y el id que me llega y hago actualizaciony devuelvo texto

    let sql = `update receta set 
              titulo ='${titulo}',
              resumen='${resumen}',
              pasos='${pasos}',
              tiempo='${tiempo}'
              where id= '${id}'`

    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err
        else {
            res.json({ status: 'receta modificada' })
        }
    })

})


router.put('/alimentos/:id', (req, res) => {
    const { id } = req.params
    const { nombre, descripcion, calorias } = req.body//cojo los campos y el id que me llega y hago actualizaciony devuelvo texto



    let sql = `update alimento set 
              nombre ='${nombre}',
              descripcion='${descripcion}',
              calorias='${calorias}'
              
              where id= '${id}'`

    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err
        else {

            res.json({ status: 'receta modificada' })
        }
    })

})


router.get('/publicaciones', (req, res) => {
    let sql = 'select p.id, u.username,p.titulo, r.titulo as receta, p.descripcion, p.fechapublicacion from publicacion p, receta r, usuario u where p.idCreador=u.id and p.idReceta=r.id'//hago select de todos
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)//devuelvo el resultado en json
        }
    })

})

/*router.post('/publicaciones', (req, res) => {
    const { titulo, descripcion, idCreador, idAlimento, idReceta } = req.body//cojo el body que m ellega y lo inserto y devuelvo texto
    const fechapublicacion = "2020-01-01"
    let sql = "";
    if (idAlimento == 0) {
        sql = `insert into publicacion(titulo,descripcion,fechapublicacion,idCreador,idReceta) values('${titulo}','${descripcion}','${fechapublicacion}','${idCreador}','${idReceta}')`
    } else {
        sql = `insert into publicacion(titulo,descripcion,fechapublicacion,idCreador,idAlimento) values('${titulo}','${descripcion}','${fechapublicacion}','${idCreador}','${idAlimento}')`
    }



    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err
        else {
            res.json({ status: 'publicacion guardada con exito' })
        }
    })
})*/

router.post("/publicaciones", controller.crearPublicacion);

router.post('/recetas/:id/alimentosRecetas', (req, res) => {
    const { idAlimento, cantidad,medida } = req.body//cojo el body que m ellega y lo inserto y devuelvo texto
    const { id } = req.params

    let sql = `insert into alimentoReceta(idAlimento,idReceta,cantidad,medida) values('${idAlimento}','${id}','${cantidad}','${medida}')`
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err
        else {
            res.json({ status: 'alimento guardado en la receta' })
        }
    })
})




router.put('/publicaciones/:id', (req, res) => {
    const { id } = req.params
    const { descripcion, titulo } = req.body//cojo los campos y el id que me llega y hago actualizaciony devuelvo texto

    let sql = `update publicacion set 
              descripcion ='${descripcion}',
              titulo='${titulo}'
             
              where id= '${id}'`

    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err
        else {
            res.json({ status: 'publicacion modificada' })
        }
    })

})


router.get('/alimentos', (req, res) => {
    let sql = 'select * from alimento'//hago select de todos
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)//devuelvo el resultado en json
        }
    })

})







/*router.post('/alimentos', function(req, res){
  console.log(req)
  controller.uploadAlimento
});*/

/*router.post('/alimentos', (req, res) => {








  const { nombre, descripcion, calorias } = req.body//cojo el body que m ellega y lo inserto y devuelvo texto

  let sql = `insert into alimento(nombre,descripcion,calorias) values('${nombre}','${descripcion}','${calorias}')`
  conexion.query(sql, (err, rows, fields) => {
      if (err) throw err
      else {
          res.json({ status: 'alimento guardado' })
      }
  })





})*/






router.put('/publicaciones/:id/comentarios/:idComentario', (req, res) => {
    const { id, idComentario } = req.params


    const { comentario } = req.body//cojo los campos y el id que me llega y hago actualizaciony devuelvo texto

    let sql = `update comentario set 
              comentario ='${comentario}'
              
             
              where id= '${idComentario}'`

    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err
        else {
            res.json({ status: 'comentario modificado' })
        }
    })

})












module.exports = router
