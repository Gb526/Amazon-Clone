import React, {useEffect, useState} from 'react';
import classes from "./Results.module.css";
import axios from 'axios';
import { productUrl } from '../../Api/endPoint';
import { useParams } from 'react-router-dom';
import LayOut from '../../Components/LayOut/LayOut';
import ProductCard from '../../Components/Product/ProductCard';
import Loader from "../../Components/Loader/Loader"

function Results() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { categoryName } = useParams();
  console.log(categoryName);

//   useEffect(() => {
//     axios
//       .get(`${productUrl}/products/category/${categoryName}`)
//       .then((res) => {
//         setResults(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [categoryName]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        let request = await axios.get(
          `${productUrl}/products/category/${categoryName}`
        );
        console.log(request);
        setResults(request.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    })();
  }, [categoryName]);

  return (
    <LayOut>
      <div>
        <h1 style={{ padding: "2rem" }}>Results</h1>
        <p style={{ padding: "2rem" }}>Category/{categoryName}</p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.products__container}>
            {results?.map((product, i) => (
              <ProductCard key={i} product={product} renderAdd={true}/>
            ))}
          </div>
        )}
      </div>
    </LayOut>
  );
}
export default Results;