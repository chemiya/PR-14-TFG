
const controllerAlimento = require("../DAO/alimentoDAO");
const controllerUsuario = require("../DAO/usuarioDAO");
const controllerReceta = require("../DAO/recetaDAO");
const controllerPublicacion = require("../DAO/publicacionDAO");
const controllerSeguidor= require("../DAO/seguidorDAO");
const controllerFavorita= require("../DAO/favoritaDAO");
const controllerAlimentoReceta= require("../DAO/alimento-recetaDAO");
const controllerPaso= require("../DAO/pasoDAO");
const controllerComentario= require("../DAO/comentarioDAO");
const router = require('express').Router()






//npm install --save jsonwebtoken bcrypt cookie-parser





/************usuario */


router.post('/usuarios/identificacion', controllerUsuario.identificacion);
router.post('/usuarios/registro', controllerUsuario.registro);
router.delete('/usuarios/:id', controllerUsuario.eliminarUsuario);
router.get('/usuarios',controllerUsuario.buscarUsuarios);
router.get('/usuarios/repetidos',controllerUsuario.comprobarRepetido);
router.put("/usuarios/:id", controllerUsuario.actualizarUsuario);
router.get('/usuarios/:id',controllerUsuario.buscarUsuarioPorId);




/*************receta */


router.put('/recetas/:id', controllerReceta.actualizarReceta);
router.delete('/recetas/:id', controllerReceta.eliminarReceta);
router.post("/recetas", controllerReceta.crearReceta);
router.get('/recetas/:id', controllerReceta.buscarRecetaPorId);
router.get('/recetas', controllerReceta.buscarRecetas);
router.get('/usuarios/:id/recetas',controllerReceta.buscarRecetasUsuario);



/****************publicacion */


router.post("/publicaciones", controllerPublicacion.crearPublicacion);
router.delete('/publicaciones/:id', controllerPublicacion.eliminarPublicacion);
router.get('/publicaciones', controllerPublicacion.buscarPublicaciones);
router.get('/alimentos/:id/publicaciones', controllerPublicacion.buscarPublicacionesAlimento);
router.get('/publicaciones/:id', controllerPublicacion.buscarPublicacionPorId);
router.get('/recetas/:id/publicaciones', controllerPublicacion.buscarPublicacionesReceta);
router.get('/usuarios/:id/publicaciones',controllerPublicacion.buscarPublicacionesUsuario);
router.get('/publicaciones/seguidos/:id', controllerPublicacion.buscarPublicacionesSeguidos);
router.put('/publicaciones/:id',controllerPublicacion.actualizarPublicacion);







/****************seguidor */
router.get('/usuarios/:id/numeroSeguidos', controllerSeguidor.buscarNumeroSeguidos);
router.get('/usuarios/:id/numeroSeguidores', controllerSeguidor.buscarNumeroSeguidores);
router.get('/usuarios/:id/seguidores', controllerSeguidor.buscarSeguidoresUsuario);
router.get('/usuarios/:id/seguidos', controllerSeguidor.buscarSeguidosUsuario);
router.delete('/usuarios/:id/seguidos/:idSeguido', controllerSeguidor.eliminarSeguidoUsuario);
router.get('/usuarios/:idUsuario/seguidos/:idSeguido', controllerSeguidor.comprobarSeguido);
router.post('/usuarios/:id/seguidos', controllerSeguidor.seguirUsuario);








/*************favorita */
router.get('/usuarios/:id/favoritas', controllerFavorita.buscarFavoritas);
router.delete('/usuarios/:id/favoritas/:idFavorita', controllerFavorita.eliminarFavorita);
router.post('/usuarios/:id/favoritas', controllerFavorita.crearFavorita);
router.get('/usuarios/:idUsuario/favoritas/:idReceta',controllerFavorita.comprobarFavorita);








/***************alimento */
router.get("/alimentos", controllerAlimento.buscarAlimentos);
router.get('/alimentos/:id', controllerAlimento.buscarAlimentoPorId);
router.delete('/alimentos/:id', controllerAlimento.eliminarAlimento);
router.post("/alimentos", controllerAlimento.crearAlimento);
router.put('/alimentos/:id',controllerAlimento.actualizarAlimento);






/*************alimentosreceta */
router.get('/recetas/:id/alimentosRecetas', controllerAlimentoReceta.buscarAlimentosReceta);
router.post('/recetas/:id/alimentosRecetas', controllerAlimentoReceta.crearAlimentoReceta);








/*************pasos */
router.post('/recetas/:id/pasos', controllerPaso.crearPaso);
router.get('/recetas/:id/pasos', controllerPaso.buscarPasosReceta);







/************************comentarios */
router.get('/publicaciones/:id/comentarios', controllerComentario.buscarComentariosPublicacion);
router.post('/publicaciones/:id/comentarios', controllerComentario.crearComentario);
router.put('/publicaciones/:id/comentarios/:idComentario',controllerComentario.actualizarComentario);










































































































module.exports = router
