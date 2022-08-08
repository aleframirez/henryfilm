import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  createReview,
  getMoviesDetail,
  willunmont2,
  addToWishlist,
  getReview,
} from "../../Redux/Actions/Actions";
import "../../Styles/components/_DetailsMovies.scss";
import { estrellas } from "../../auxiliares/Funciones";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdAddShoppingCart as ShopIcon } from "react-icons/md";
import "../../Styles/components/_ComentariosForm.scss";
import {TiHeart as HeartIcon} from "react-icons/ti";
import "../../Styles/components/_Modal.scss";
import {AiFillCloseSquare as CloseIcon} from "react-icons/ai";
import Rating2 from "../Details/Rating2.jsx";
import Rating from '@mui/material/Rating';
import "../../Styles/components/_CardComentarios.scss";
import {FaCommentDots as ComentIcon} from "react-icons/fa"

function DetailMovie() {
  const userReducer = useSelector((state) => state.user);
  let navigate = useNavigate();
  let { id } = useParams();
  const dispatch = useDispatch();
  let movieDetail = useSelector((state) => state.movieDetail);
  let { comentarios } = useSelector((state) => state);
  let token = sessionStorage.getItem("token");
  let video = movieDetail[0]?.videosAMostrar[0];
  // .replace("watch?v=", "embed/")
  function addCart(id) {
    let idParseado = parseInt(id);
    dispatch(addToCart(idParseado));
  }
  function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  }

  const [input, setInput] = useState({
    contenido: "",
    puntuacion: "",
    idPelicula: id,
    token: token,
  });
  const input2 = {
    id: id,
    tipo: "pelicula",
  };

  function handdleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  const submitHandler = (e) => {
    e.preventDefault();
    if (!input.token) {
      alert("Debes loguearte");
      navigate("/home/Login");
    } else {
      dispatch(createReview(input));
    }
  };
  function handleRegister(e) {
    e.preventDefault();
    alert("debes registrarte");
    navigate("/home/Login");
  }
  function addWishlist(id) {
    let idParseado2 = parseInt(id);
    dispatch(addToWishlist(idParseado2));
  }

  useEffect(() => {
    dispatch(getMoviesDetail(id));
    dispatch(getReview(input2));
    return () => dispatch(willunmont2());
  }, [dispatch]);
  console.log(comentarios);

  // console.log(input);
  return (
    <section>
      <header
        className="header-info"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetail[0]?.backdrop_path})`,
        }}
      >
        <div className="contenedor-info">
          <div className="contenedor-descripcion">
            <h3>{movieDetail[0]?.name}</h3>
            <div className="contenedor-estrellas">
              {estrellas(Math.round(movieDetail[0]?.vote_average))}
            </div>
            <p className="descripcion">{movieDetail[0]?.overview}</p>
            <p className="item-descripcion">
              Duracion: {movieDetail[0]?.runtime} min
            </p>
            <ul className="item-descripcion">
              Producción:{" "}
              {movieDetail[0]?.production_companies?.map((e) => {
                return <div>{e.name}</div>;
              })}
            </ul>
            <ul className="lista-generos">
              Géneros:{" "}
              {movieDetail[0]?.genres?.map((e) => {
                return <div>{e.name}</div>;
              })}
            </ul>

            <div className="contenedor-links">
              {userReducer.username ? (
                <div>
                <a href="#miModal"><button>Trailer</button></a>
                <div id="miModal" className="modal">
                  <div className="modal-contenido">
                    <a href="#"> <CloseIcon className="iconoClose"/> </a><br></br>
                    <div className="iframe-container">
                    <iframe className="video" width="100%" height="100%" src={video}></iframe>
                    
                    </div>
                  </div>  
                </div>
        
                {/* <button>Trailer</button>
                  <div>
                    <iframe width="200" height="200" src={video}></iframe>
                  </div>
                </div> */}
                </div>
              ) : (
                <button onClick={handleRegister}>Trailer</button>
              )}

              <Link to={`/home/videos`}>
                <button>Reparto</button>
              </Link>
              <div className="Iconos">
                <abbr title="Añade al carrito">
                  <span onClick={() => addCart(id)}>
                    <ShopIcon className="iconoShop" />
                  </span>
                </abbr>
                <abbr title="Agrega a Favoritos">
                  <span onClick={() => addWishlist(id)}>
                    <HeartIcon className="iconoHeart" />
                  </span>
                </abbr>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* <form className="form3" onSubmit={submitHandler}>
        <textarea
          id="comment"
          value={input.contenido}
          onChange={(e) => handdleChange(e)}
          name="contenido"
          placeholder="Escribe tu comentario:"
          className="name formEntry3"
        ></textarea> */}
        <Rating2 className="ratingStyle" id={id} token={token}/>
        {/* <Rating className="ratingStyle" /> */}
        <br></br>

      <div className="ComentariosCard">
        <h2>Comentarios:</h2>
        {comentarios &&
           comentarios.map((e) => {
          return (
            <div className= "review">
              <div className="email" >Usuario: {e.username}</div>
             <div className="infoRev"><Rating 
             name="read-only" value={e.puntuacion} /></div>
              <div className="p">Comentario: {e.contenido}</div>
              <br />
            </div>
          );
        })}
        </div>
    </section>
  );
}

export default DetailMovie;
