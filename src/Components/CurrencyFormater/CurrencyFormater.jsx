import React from "react";
import numeral from "numeral";
function CurrencyFormater({ amount }) {
  /*we pass the amount as a prop not as an arugumnt*/
  const formatedPrice = numeral(amount).format("$0,0.00");
  return <div>{formatedPrice}</div>;
}
export default CurrencyFormater;
