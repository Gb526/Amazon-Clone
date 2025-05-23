import React from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import style from "./Header.module.css";

function LowerHeader() {
    return (
    <div className={style.lower__container}>
        <ul>
            <li>
            {<AiOutlineMenu />}
            <p>All</p>
            </li>
            <li>Today's Deal</li>
            <li>Customer Service</li>
            <li>Registry</li>
            <li>Gift Cards</li>
            <li>Sell</li>
        </ul>
    </div>
    );
};

export default LowerHeader;