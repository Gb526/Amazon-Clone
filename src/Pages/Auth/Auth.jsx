import React, { useState, useContext} from "react";
import classes from "./SignUp.module.css";
import { Link, useNavigate, useLocation} from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {DataContext} from "../../Components/DataProvider/DataProvider";
import{CircleLoader} from "react-spinners";
import { Type } from "../../Utility/Action.type";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signin:false,
    signup:false
  })


  const [user, dispatch] = useContext(DataContext)
  console.log(user);
  const navigate = useNavigate();
  const navStateData = useLocation()
  console.log(navStateData);


  const authHandler = async(e)=>{
    e.preventDefault();
    console.log(e.target.name);
    if(e.target.name == "signin"){
      setLoading({...loading, signin:true});
      signInWithEmailAndPassword(auth,email, password)
      .then((userInfo)=>{
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
        setLoading({...loading, signin:false})
        navigate(navStateData?.state?.redirect || "/");
      })
    .catch((err)=>{
      setError(err.message)
      setLoading({...loading,signin: false});
    });
    }else{
      setLoading({...loading, signup:true})
      createUserWithEmailAndPassword(auth, email, password)
      .then((userInfo)=>{  
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
        setLoading({...loading, signup:false})
        navigate(navStateData?.state.redirect || "/");
      })
      .catch((err)=>{
        console.log(err);
        setLoading({ ...loading, signup: false });
      });
    }
  };

  //console.log(password,email);

  return (
    <section className={classes.login}>
        <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Amazon.com-Logo.svg/1920px-Amazon.com-Logo.svg.png"
          alt=""
        />
      </Link>

      <div className={classes.login__container}>
        <h1>Sing In</h1>
        {navStateData?.state?.msg &&(
          <small 
          style={{ padding:"5px",
            textAlign:"center",
            color:"red",
            fontWeight:"bold",
          }}>
            {navStateData?.state?.msg}
          </small>)}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            ></input>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) =>setPassword(e.target.value)}
              type="password"
              id="password"
            ></input>
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login__signInButton}
          >
            {loading.signin ? (
              <CircleLoader color="#000" size={15}></CircleLoader>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE conditions of use &
          sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button
          type="submit"
          name="signup"
          onClick={authHandler}
          className={classes.login__registerButton}
        >
          {loading.signup ? (
            <CircleLoader color="#000" size={15}></CircleLoader>
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
