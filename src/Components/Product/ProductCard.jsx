import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import Classes from "./Product.module.css";
import CurrencyFormater from "../CurrencyFormater/CurrencyFormater";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/Action.type";

function ProductCard({ product, flex, renderDesc, renderAdd }) {
  const { image, title, rating, id, price, description } = product;

  const item={image, title, rating, id, price, description}
  
  const [state, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item, // item is the product object stacked above (in line 9)
    });
  };
  return (
    <div
      className={`${Classes.card__container} ${
        flex?Classes.product__flexed: ""
      }`}>
      <Link to={`products/${id}`}>
        <img src={image} alt="" className={Classes.img__container}/>
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth:"750px"}}>{description}</div>}
        <div className={Classes.rating}>
          <Rating
            name="read-only"
            value={rating?.rate}
            precision={0.2}
            readOnly/>
          <small>{rating?.count}</small>
        </div>

        <div>
          <CurrencyFormater amount={price}/>
        </div>
        {renderAdd && (<button className={Classes.button} onClick={addToCart}>
            add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
