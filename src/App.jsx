import { useContext, useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Carousel from "./Components/Carousel/Carousel";
import Category from "./Components/Category/Category";
import Routing from "./Router";
import { auth } from "./Utility/firebase";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { Type } from "./Utility/Action.type";

function App() {
  const [{user}, dispatch] = useContext(DataContext)

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch({
          type:Type.SET_USER,
          user:authUser
        })
      }else{
        dispatch({
          type:Type.SET_USER,
          user:null,
        });
      }
    })
  },[])
  return (
    <>
      <Routing/>
    </>
  );
}
export default App;
