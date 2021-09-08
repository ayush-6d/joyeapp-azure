import * as React from "react";
import { useEffect, useState } from "react";
import { SVGData } from "./SVGData";

const colors = ["#B812FF,#FF16EB", "#429321,#B4EC51", "#0D78F9,#46F0F1"];

export const Loader = (props) => {
  const { display, blur } = props;
  const [color, setState] = useState(0);
  const [message, setMessage] = useState("");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setState(color === colors.length - 1 ? 0 : color + 1);      
      setCounter(counter+1);
      if (counter===1){
        setMessage("Preparing your daily brew!");
      }
    }, 2000);
    return () => clearTimeout(id);
  }, [color]);

  return (
    <div
      style={{
        display: `${display}`,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: `${blur ? "#fafafa" : "#ffffff"}`,
        marginBottom: 2,
        zIndex: 20,
        position: "relative",
        msFlexDirection:"column"
      }}
    >
      <div
       
        className={blur ? "add-blur" : ""}
      />
      <div style={{ display:"flex", flexDirection: "column", alignItems:"center", justifyContent:"center", margin:"0 auto", height:"200px", width: "200px", position:"relative" }}>
        <SVGData key={`key${color}`} colors={colors[color]} />
        <p className="bold text-blue" style={{ marginTop: 15, marginBottom: message.length === 0 ? 66 : 0 }}> 
          {message}
        </p>
      </div>
    </div>
  );
};

// export default Loader;
