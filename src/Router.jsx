import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing/Landing';
import Cart from "./Pages/Cart/Cart";
import Orders from './Pages/Orders/Orders';
import Payment from "./Pages/Payment/Payment";
import Results from "./Pages/Results/Results";
import Auth from './Pages/Auth/Auth';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

const stripePromise = loadStripe('pk_test_51R03VMC5hoVAHMdnOTsq3T41ogQolckYZuUQxQRN19MXpKSk7Q70Pblz74Cs1quYK3A7S98nl1mqUKnAcre0hSTx00VwZ9OWea');

function Routing() {
  return (
    <div>
      <Router basename="/Amazon-Clone">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/cart" element={<Cart />} />

          <Route
            path="/orders"
            element={
              <ProtectedRoute
                msg={"you must log in to access your orders"}
                redirect={"/orders"}
              >
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route path="/category/:categoryName" element={<Results />} />
          <Route path="/product/:productId" element={<ProductDetail />} />

          <Route
            path="/payment"
            element={
              <ProtectedRoute
                msg={"you must log in to pay"}
                redirect={"/payment"}
              >
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default Routing;