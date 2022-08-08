import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../Styles/components/_Pasarela.scss"

const stripePromise = loadStripe(
  "pk_test_51LTGaXLAMID6zp4FN23yqliUFRecPc1GmqazMXb4525foqI6x0vjAdYsIeCw3ovTIId4tj0WthzhKIhyJyaSCBjp00WA0Mdadg"
  );

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    let navigate = useNavigate();


    const { cart } = useSelector((state) => state);
    var titulosAComprar = [];
    var precioTotal = 0;
    for (let i = 0; i < cart.length; i++) {
      titulosAComprar.push(cart[i].name);
      precioTotal = precioTotal + cart[i].price;

      // console.log(titulosAComprar)
      // console.log(precioTotal)
      console.log(cart)
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log(paymentMethod);
      const { id } = paymentMethod;
      try {
        console.log("Holis")
        const { data } = await axios.post(
          "/pagos/api/checkout",
          {
            id,
            amount: (precioTotal * 100)
          }
        );
        console.log("La data", data)
        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error)
      }
    }
    alert("Compra realizada con exito")
    navigate('/home', {replace: true});
    localStorage.setItem("cart", JSON.stringify([]))
  };
  
  return (
    <div>
      <div className="pasarela">
        <div className="pasarelaCont">
      {cart &&
          cart.map((e) => {
            return (
           <div className="compras">
              <img  src={e.posterImagen} alt="img" height="200px" width="140px" />
            </div>
            );
          })}
          </div>
      <p>Total de la compra: ${precioTotal}.00</p>
      <div className="containerElement">
      <form  className="elementCard" onSubmit={handleSubmit}>
        <CardElement/>
        <button className="card-button" disabled={!stripe}><strong>REALIZAR PAGO</strong></button>
      </form>
      </div>
    </div>
      </div>
  );
};

function PasarelaDePago() {

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default PasarelaDePago;
