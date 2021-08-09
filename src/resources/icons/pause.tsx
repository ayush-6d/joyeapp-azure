import React from 'react';

function Icon({ width }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62.251 62.25" width={width}>
      <defs>
        <filter
          id="Combined_Shape"
          width="62.251"
          height="62.25"
          x="0"
          y="0"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="2" />
          <feGaussianBlur result="blur" stdDeviation="2" />
          <feFlood floodOpacity="0.173" />
          <feComposite in2="blur" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g filter="url(#Combined_Shape)">
        <path
          fill="#fff"
          d="M34.25 50.251H16a16 16 0 01-16-16V16A16 16 0 0116 0h18.25a16 16 0 0116 16v18.25a16 16 0 01-16 16zM30 18a3 3 0 00-3 3v11a3 3 0 006 0V21a3 3 0 00-3-3zm-10 0a3 3 0 00-3 3v11a3 3 0 006 0V21a3 3 0 00-3-3z"
          data-name="Combined Shape"
          transform="translate(6 4)"
        />
      </g>
    </svg>
  );
}

export default Icon;
