import React, { useContext } from 'react'
import Classes from "./Cart.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import CurrencyFormater from '../../Components/CurrencyFormater/CurrencyFormater';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import {Link} from "react-router-dom";

function Cart() {
    const [{basket}, dispatch]=useContext(DataContext);
    const total=basket.reduce((amount, item)=>{
        return item.price * item.amount + amount;
    }, 0); //the previous amount plus the current price of the item times the amount
    const increment = (item)=>{
        dispatch({
            type:Type.ADD_TO_BASKET,
            item,
        });
    };

    const decrement =(id)=>{
        dispatch({
            type: Type.REMOVE_FROM_BASKET,
            id,
        });
    };
    return (
        <LayOut>
            <section className={Classes.container}>
                <div className={Classes.cart__container}>
                    <h2>Hello Genet </h2>
                    <h3>Your Shopping Basket</h3>
                    <hr/>
                    {basket?.length===0 ?(
                        <h3>No item in your cart</h3>
                    ):(
                    basket?.map((item, i)=>{
                        return (
                        <section className={Classes.cart__product}>
                            <ProductCard
                            key={i}
                            product={item}
                            renderAdd={false}
                            renderDesc={true}
                            flex={true}
                            />
                            <div className={Classes.btn_container}>
                            <button
                                className={Classes.btn}
                                type=""
                                onClick={() => increment(item)}
                            >
                                <IoIosArrowUp size={20}/>
                            </button>
                            <span>{item.amount}</span>
                            <button
                                className={Classes.btn}
                                type=""
                                onClick={() => decrement(item.id)}
                            >
                                <IoIosArrowDown size={20}/>
                            </button>
                            </div>
                        </section>
                        );
                    })
                )}
                </div>
                {basket?.length!==0 &&(
                <div className={Classes.subtotal}>
                    <div>
                    <p>Subtotal({basket?.length}items):</p>
                    <CurrencyFormater amount={total}/>
                    </div>
                    <span>
                    <input type="checkbox"/>
                    <small>This order contains a gift</small>
                    </span>
                    <Link to="/payment">continue to check out
                    </Link>
                </div>
                )}
            </section>  
        </LayOut>
    );   
}

export default Cart