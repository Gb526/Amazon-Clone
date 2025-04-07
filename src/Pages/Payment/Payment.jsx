import React, { useState, useContext } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import CurrencyFormater from "../../Components/CurrencyFormater/CurrencyFormater";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { db } from "../../Utility/firebase";
import { axiosInstance } from "../../Api/Axios";
import { Type } from "../../Utility/Action.type";
import { ClipLoader } from "react-spinners";

function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  /*function for telling us total item on the cart */
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  /*function to calculate total price */

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();  

    /*defining error handling function */

  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError(null);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      //1/  when we do payment with function is contacting the back end||function to get the client secret

      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`, //this means using "post method + baseURL+/payment/create" to get clientSecret
      });

      // console.log(response.data);
      const clientSecret = response.data?.clientSecret; // we only need the clientSecret from the whole response i.e response.data thats why we writ (response.data?.clientSecret)

      // 2. client side(react side confirmation) using stripe

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      //3. after the confirmation -- the orders are removed from the cart and will store on the firebase store db and it will be displayed on the order page

      await db
        .collection("users") //its like a table collecting or organizing the data
        .doc(user.uid) //we store the document using the user id and we create a collection to this specific user using user-id
        .collection("orders") //we create a collection by this user id i.e it makes the order specific to the user
        .doc(paymentIntent.id)

        .set({
          // finally we set the basket the amount and created payment intent
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      //emptying the basket

      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new orders" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/*header */}
      <div className={classes.payment__header}>Checkout ({totalItem} )items</div>

      <section className={classes.payment}>
        {/*address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>1116 GetReed Ct</div>
            <div>Rockville, MD</div>
          </div>
        </div>
        <hr />
        {/* /products/ */}
        <div className={classes.flex}>
          <h3>Review item and deliver info. </h3>
          <div>
            {basket?.map((item, i) => (
              <ProductCard key={i} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/*payment-form */}
        <div className={classes.flex}>
          <h3>payment methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {/*display error if there is */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/*importing smart card from stripe */}
                <CardElement onChange={handleChange} />

                {/*price total */}
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p>
                      <CurrencyFormater amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={35} />
                        <p>please wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}
export default Payment;










































































// function Payment() {
//   const [{ basket, user }, dispatch] = useContext(DataContext);
//   console.log(user);

//   const totalItem = basket?.reduce((amount, item) => {
//     return item.amount + amount;
//   }, 0);

//   const total = basket.reduce((amount, item) => {
//     return item.price * item.amount + amount;
//   }, 0);

//   const [cardError, setCardError] = useState(null);
//   const [processing, setProcessing] = useState(false);

//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     // console.log(e);
//     e.error?.message ? setCardError(e.error?.message) : setCardError("");
//   };
//   const handlePayment = async (e) => {
//     e.preventDefault();
//     try {
//       setProcessing(true);
//       //1.backend||functions ...> contact to the client secret!
//       const response = await axiosInstance({
//         method: "POST",
//         url: `/payment/create?total=${total * 100}`,
//       });
//       // console.log(response.data);
//       const clientSecret = response.data?.clientSecret;

//       //2. client side (react side confirmation)!
//       const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });
//       //console.log(paymentIntent);

//       //3. after the confirmation...> order firestore database save, clear basket
//       await db
//         .collection("users")
//         .doc(user.uid)
//         .collection("orders")
//         .doc(paymentIntent.id)
//         .setDoc({
//           basket: basket,
//           amount: paymentIntent.amount,
//           created: paymentIntent.created,
//         });
//       //empty the basket
//       dispatch({ type: Type.EMPTY_BASKET });

//       setProcessing(false);
//       navigate("/orders", { state: { msg: "you have placed new order" } });
//     } catch (error) {
//       console.log(error);
//       setProcessing(false);
//     }
//   };

//   return (
//     <LayOut>
//       {/* header */}
//       <div className={classes.payment__header}>Checkout({totalItem})items</div>
//       {/* payment method */}
//       <section className={classes.payment}>
//         {/* address  */}
//         <div className={classes.flex}>
//           <h3>Delivery Address</h3>
//           <div>
//             <div>{user?.email}</div>
//             <div>11632 Wood Dr</div>
//             <div>Maryland</div>
//           </div>
//         </div>
//         <hr />

//         {/* product */}
//         <div className={classes.flex}>
//           <h3>Review items and delivery</h3>
//           <div>
//             {basket?.map((item) => (
//               <ProductCard product={item} flex={true} key={item.id} />
//             ))}
//           </div>
//         </div>
//         <hr />

//         {/* payment method(visa card) */}
//         <div className={classes.flex}>
//           <h3>Payment Method</h3>
//           <div className={classes.payment__card__container}>
//             <div className={classes.payment__details}>
//               <form onSubmit={handlePayment}>
//                 {/* error */}
//                 {cardError && (
//                   <small style={{ color: "red" }}>{cardError}</small>
//                 )}
//                 {/* card element */}
//                 <CardElement onChange={handleChange} />

//                 {/* price */}
//                 <div className={classes.payment__price}>
//                   <div>
//                     <span style={{ display: "flex", gap: "10px" }}>
//                       <p>Total Order</p>|
//                       <CurrencyFormater amount={total} />
//                     </span>
//                   </div>
//                   <button type="submit">
//                     {processing ? (
//                       <div className={classes.loading}>
//                         <ClipLoader color="gray" size={12} />
//                         <p>Please wait...</p>
//                       </div>
//                     ) : (
//                       "Pay Now"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </LayOut>
//   );
// }

// export default Payment;
