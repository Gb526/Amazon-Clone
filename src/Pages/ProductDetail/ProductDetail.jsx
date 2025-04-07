import React,{useEffect, useState} from 'react'
import Classes from "./ProductDetail.module.css";
import {productUrl} from "../../Api/endPoint";
import { useParams } from 'react-router-dom';
import ProductCard from '../../Components/Product/ProductCard';
import axios from 'axios';
import LayOut from '../../Components/LayOut/LayOut';

function ProductDetail() {
    const {productId}=useParams();

    console.log(productId)

    const [product, setProduct] = useState([])
    useEffect(() => {
      axios.get(`${productUrl}/products/${productId}`)
      .then((res)=>{

        console.log(res)
        setProduct((res.data));
        setIsLoading(false);

      })
      .catch((err)=>{
        console.log(err)
        setIsLoading(false);
      });
      
    }, []);
    
  return (
    <LayOut>
      <div>
        {isLoading ? (
          <Loader/>
        ):(
          <ProductCard
          product={product} 
          flex={true} 
          renderDesc={true} 
          renderAdd={true}/>
          )}
        </div>
    </LayOut>
  );
};

export default ProductDetail;