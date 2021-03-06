import * as React from 'react';
import './importLoader.scss';
import { useEffect, useState } from 'react';
import { SVGData } from '../Loader/SVGData';

const colors = ['#B812FF,#FF16EB', '#429321,#B4EC51', '#0D78F9,#46F0F1'];

export const ImportLoader = (props) => {
  const { display, blur } = props;
  const [color, setState] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setState(color === colors.length - 1 ? 0 : color + 1);
    }, 4500);
  }, [color]);

  return (
      <>
            <div style={{display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto", width:"100px", height:"200px", position:"relative"}}>
              <SVGData key={`key${color}`} colors={colors[color]} />
            </div>
    </>
      );
};
