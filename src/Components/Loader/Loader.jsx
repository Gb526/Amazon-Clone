import React from 'react'
import {ClipLoader} from "react-spinners";

function Loader() {
  return (
    <div style={{
        display:"flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
    }}>
    <ClipLoader color="orange"/>
    </div>
  );
}

export default Loader;