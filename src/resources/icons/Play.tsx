import React from 'react';

function Icon({ width }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      viewBox="0 0 59 58"
    >
      <defs>
        <path
          id="path-1"
          d="M286.509 32h9.233c7.13 0 9.716.743 12.324 2.137a14.538 14.538 0 016.048 6.048c1.394 2.608 2.137 5.194 2.137 12.324v9.233c0 7.13-.743 9.716-2.137 12.324a14.538 14.538 0 01-6.048 6.048c-2.608 1.394-5.195 2.137-12.324 2.137h-9.233c-7.13 0-9.716-.743-12.324-2.137a14.538 14.538 0 01-6.048-6.048C266.743 71.458 266 68.87 266 61.742V52.51c0-7.13.743-9.716 2.137-12.324a14.538 14.538 0 016.048-6.048C276.793 32.743 279.38 32 286.51 32zm13.698 27.707a2 2 0 000-3.414l-12.164-7.433A2 2 0 00285 50.566v14.868a2 2 0 003.043 1.706l12.164-7.433z"
        />
        <filter
          id="filter-2"
          width="127.9%"
          height="127.9%"
          x="-13.9%"
          y="-10%"
          filterUnits="objectBoundingBox"
        >
          <feOffset
            dy="2"
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          />
          <feGaussianBlur
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
            stdDeviation="2"
          />
          <feColorMatrix
            in="shadowBlurOuter1"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.170673077 0"
          />
        </filter>
      </defs>
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g transform="translate(-282 -613)">
          <g transform="translate(20 583)">
            <g>
              <use
                fill="#000"
                filter="url(#filter-2)"
                xlinkHref="#path-1"
              />
              <use fill="#FFF" xlinkHref="#path-1" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Icon;
