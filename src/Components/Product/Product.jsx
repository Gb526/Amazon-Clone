import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import Loader from "../Loader/Loader";

function Product() {
  const [Products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
        const singleProduct = res.data;
        setProducts(singleProduct);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader/>
      ) : (
        <section className={classes.products__container}>
          {Products?.map((ProductsInfo, i) => {
            return<ProductCard key={i} product={ProductsInfo} renderAdd={true}/>;
          })}
        </section>
      )}
    </>
  );
}

export default Product;
