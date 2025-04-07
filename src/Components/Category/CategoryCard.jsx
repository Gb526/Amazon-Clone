import React from "react"
import style from "./Category.module.css";
import { Link } from "react-router-dom";

function CategoryCard({ data }) {
  return (
    <>
      <div className={style.category}>
        <Link to={`/category/${data.name}`} >
        <span>
          <h2>{data?.title}</h2>
        </span>
          <img src={data?.imgLink} alt=""/>
          <p>Shop now</p>
        </Link>
      </div>
    </>
  );
}
export default CategoryCard;












































// import React from "react";
// import style from "./Category.module.css" 

// function CategoryCard({ title, imgLink, link }) {
//   return (
//     <div className="category-card">
//       <a href={link || "#"} className="category-link">
//         <h2>{title}</h2>
//         <img src={imgLink} alt={title} className="category-image" />
//         <p className="shop-now">Shop Now</p>
//       </a>
//     </div>
//   );
// }

// export default CategoryCard;








// import React from 'react'
// import {CategoryInfo} from "./CategoryInfo"
// import style from "./CategoryCard"


// function CategoryCard(data) {
//   return (
//   <div className="Category">
//     <a href={link || "#"}>
//         <h2>{data.title}</h2>
//         <img src={data.imgLink} alt={title}/>
//     <p>shop now</p>
//       </a>
// </div>
    
// )
// }

// export default CategoryCard