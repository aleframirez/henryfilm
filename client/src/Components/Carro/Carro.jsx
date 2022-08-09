import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarritoCard from "../CarritoCard/CarritoCard";
import "../../Styles/components/_Carrito.scss";
import { useNavigate } from "react-router-dom";
import "../../Styles/components/_Carrito.scss";
import tuCarrito from "../../img/tucarrito.png";
import {
  postHistorial,

} from "../../Redux/Actions/Actions";
function Carro() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalPrecio, settotalPrecio] = useState(0);
  const [totalItems, settotalItems] = useState([]);
  const { cart } = useSelector((state) => state);
  const { user } = useSelector((state) => state);

  useEffect(() => {
    if (cart) {
      cart &&
        cart.forEach((e) => {
          settotalPrecio(totalPrecio + e.price);
        });
      settotalItems(cart.length);
    }
  }, [cart]);

  const HandleClickComprar = (e) => {
    e.preventDefault()

    // var arrAux = [cart,user ]
    //aca va el dispatch de la action que guarda en la BD
    // dispatch(postHistorial(arrAux))
    const token = sessionStorage.getItem("token");
    if (token && cart.length != 0) {
      navigate("/home/pasarela");
      
    } else {
      alert("No se cumplen los requisitos para continuar con la compra")
      navigate("/home");
    }
  };

  var totalPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    console.log(cart[i].price);
    totalPrice = totalPrice + cart[i].price;
  }

  return (
    <div className="container">
      <h3>
        <img
          className="logo"
          src={tuCarrito}
          alt="Logo"
          height="auto"
          width="200px"
        />
      </h3>
      <div className="containerCarrito">
        {cart &&
          cart.map((e) => {
            return (
              <CarritoCard
                key={e.id}
                id={e.id}
                nombre={e.name}
                image={e.posterImagen}
                tipo={e.tipo}
                precio={e.price}
              />
            );
          })}
      </div>
      <div>
        <div className="containerTotal">
          <div>
            <h4>Resumen</h4>
            <p>
              <h5>Cantidad: </h5>
              <h6>{totalItems}</h6>
            </p>
            <p>
              <h5>Total: </h5>
              <h6>${totalPrice}.00</h6>
            </p>
            <button
              className="submit formEntry4"
              onClick={(e) => HandleClickComprar(e)}
            >
              COMPRAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carro;
