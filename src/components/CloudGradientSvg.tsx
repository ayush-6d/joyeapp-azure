/* eslint-disable react/prop-types */
import React from 'react';

export const CloudGradientSvg = (props: any = {}) => {
  const { color1 = '#fe0', color3 = '#372324' } = props;
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="linear-gradient" x1="0.208" y1="0.034" x2="0" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor={color1} stopOpacity="0" />
            <stop offset="10" stopColor={color1} />
          </linearGradient>
          <filter id="Path_Copy_4" x="0" y="0" filterUnits="userSpaceOnUse">
            <feOffset dx="43" /> /* input="SourceAlpha" */
            <feGaussianBlur stdDeviation="24.5" result="blur" />
            <feFlood floodColor={color3} floodOpacity="0.216" />
            <feComposite operator="in" in2="blur" />
            <feComposite in="SourceGraphic" />
          </filter>
        </defs>
        <g filter="url(#Path_Copy_4)">
          <path id="Path_Copy_4-2" data-name="Path Copy 4" d="M41.969,166.391a12.09,12.09,0,0,0-11.73-12.44q-.178-.005-.355-.005h-1.5a12.027,12.027,0,0,1,0-24.054H48.589a6.254,6.254,0,1,0,0-12.508H43.3a9.622,9.622,0,1,1,0-19.243H93.8a7.223,7.223,0,0,0,7.223-7.223v-.474a7.7,7.7,0,0,0-7.7-7.7H9.622a9.622,9.622,0,0,1,0-19.243H26.459a7.216,7.216,0,1,0,0-14.432H24.054a7.7,7.7,0,1,1,0-15.395H56.286a7.216,7.216,0,0,0,0-14.432H54.843a8.659,8.659,0,0,1-8.659-8.659V9.622A9.622,9.622,0,0,1,55.805,0h57.73a9.622,9.622,0,0,1,0,19.243H100.546a7.216,7.216,0,1,0,0,14.432h36.081a7.7,7.7,0,0,1,0,15.395H67.832a7.216,7.216,0,1,0,0,14.432h86.114a9.622,9.622,0,0,1,0,19.243h-13.47a7.7,7.7,0,0,0,0,15.395h27.9a9.622,9.622,0,1,1,0,19.243H99.584a6.254,6.254,0,0,0-6.254,6.254v.481a5.773,5.773,0,0,0,5.773,5.773,5.773,5.773,0,0,1,5.773,5.773v1.924a7.7,7.7,0,0,1-7.7,7.7H81.729a21.71,21.71,0,0,0-21.7,21.1h0" transform="translate(0,40)" fill="url(#linear-gradient)" />
        </g>
      </svg>

    </>
  );
};

export default CloudGradientSvg;
