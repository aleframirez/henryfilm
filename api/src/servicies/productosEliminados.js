const axios = require("axios");
require("dotenv").config();
const { parseador } = require("../utils/utils.js");
const {
  Comentarios,
  Usuarios,
  Peliculas,
  Carros,
  Historials,
  ProductosEliminados,
} = require("../DB/db.js");
const { renderSync } = require("sass");
const Series = require("../models/Series.js");

const getProductoEliminado = async (req, res) => {
  try {
    let productosEliminados = await ProductosEliminados.findAll();

    res.status(200).json(productosEliminados);
  } catch (error) {
    res.status(400).json(error);
  }
};

const postProductoEliminado = async (req, res) => {
  let { id, tipo } = req.body;

  try {

    if (tipo === "pelicula") {
      let pelicula = await Peliculas.findOne({
        where: {
          id: id,
        },
      });

      if (pelicula) {
        let eliminado = await Peliculas.destroy({
          where: {
            id: id,
          },
        });

        console.log(eliminado);
        return res.status(200).json(eliminado);
      } else {
        let peliculaEliminada = await ProductosEliminados.create({
          idProducto: id,
        });

        console.log(peliculaEliminada);
        return res.status(200).json(peliculaEliminada);
      }
    } else if (tipo === "serie") {
      let serie = await Series.findOne({
        where: {
          id: id,
        },
      });

      if (serie) {
        let eliminado = await Series.destroy({
          where: {
            id: id,
          },
        });

        console.log(eliminado);
        return res.status(200).json(eliminado);
      } else {
        let serieEliminada = await ProductosEliminados.create({
          idProducto: id,
        });

        console.log(serieEliminada);
        return res.status(200).json(serieEliminada);
      }
    } else {
      return res.status(200).json("No se modifico nada");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getProductoEliminado,
  postProductoEliminado,
};
