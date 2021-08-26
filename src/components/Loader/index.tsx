import * as React from "react";
import { useEffect, useState } from "react";
import { SVGData } from "./SVGData";

const colors = ["#B812FF,#FF16EB", "#429321,#B4EC51", "#0D78F9,#46F0F1"];

export const Loader = (props) => {
  const { display, blur } = props;
  const [color, setState] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setState(color === colors.length - 1 ? 0 : color + 1);
    }, 4500);
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
      }}
    >
      <div
        style={{ height: "100vh", width: "100vw" }}
        className={blur ? "add-blur" : ""}
      />
      <div style={{ position: "absolute", top: "40%", left:"37%"  }}>
        <SVGData key={`key${color}`} colors={colors[color]} />
      </div>
    </div>
  );
};

// export default Loader;
