import React, { useContext } from "react";
import { BsSearch } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import styles from "./Header.module.css";
import LowerHeader from "./LowerHeader.jsx";
import { Link } from "react-router-dom";
import { DataContext } from "../../Components/DataProvider/DataProvider.jsx";
import {auth} from "../../Utility/firebase.js";

function Header() {
  const [{ user, basket}, dispatch] = useContext(DataContext);
  const totalItem= Array.isArray(basket) ? basket.reduce((amount, item)=>amount + item.amount,0):0;

  return (
      <section className={styles.fixed}>
        <div className={styles.header__container}>
          <div className={styles.logo__container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
                alt="Amazon Logo"
              />
            </Link>
          </div>
          <div className={styles.delivery}>
            <span>
              <SlLocationPin/>
            </span>
            <div>
              <p>Delivered to</p>
              <span>Kidist Hager Ethiopia</span>
            </div>
          </div>
          <div className={styles.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text"/>
            <BsSearch size={38}/>
          </div>
          <div className={styles.order__container}>
            <Link to="/" className={styles.language}>
              <img src="https://pngimg.com/uploads/flags/flags_PNG14595.png" alt="American Flag"/>
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>
            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                  <p>Hello{user?.email?.split("@")[0]}</p>
                  <span onClick={()=>auth.signOut()}>Sign Out</span>
                  </>
                  ):(
                    <>
                    <p>Hello, Sign In</p> 
                    <span>Account &Lists</span>
                    </>
                  
                  )}
              </div>
            </Link>
            <Link to="/orders">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>
            <Link to="/cart" className={styles.cart}>
              <BiCart size={35}/>
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      <LowerHeader />
    </section>
  );
}
export default Header;
