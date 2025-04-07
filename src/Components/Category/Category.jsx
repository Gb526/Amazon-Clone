import React from "react";
import CategoryInfo from "./CategoryInfo";
import CategoryCard from "./CategoryCard";
import style from "./Category.module.css";

function Category() {
  return (
    <section className={style.category__container}>
      {CategoryInfo?.map((info, i) => (
        <CategoryCard key={i} data={info} />
      ))}
    </section>
  );
}

export default Category;














// .category__container {
//   position: relative;
//   margin-top: -10%;
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   place-items: center;
// }
// .category {
//   height: 350px;
//   width: 350px;
//   background-color: white;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
//   overflow: hidden; /* Prevent overflow */
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: center;
// }
// .category img {
//   width: 100%;
//   height: 280px; /* Set a fixed height */
//   object-fit: cover; /* Ensure the image fills the container while maintaining its aspect ratio */
//   padding: 0px 10px;
// }
// .category a {
//   text-decoration: none;
//   color: rgb(35, 35, 35);
// }
// .category h2,
// .category p {
//   padding: 5px;
//   margin-left: 15px;
// }
// .category p {
//   font-size: 12px;
//   font-weight: bold;
//   color: rgb(9, 132, 209);
// }
//import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
