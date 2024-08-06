"use client";

export default function Background({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {/* LARGER HEXAGONS OPTION */}
      {/* <svg
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          zIndex: -999,
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          background: "rgb(0,0,0)",
          minHeight: "100vh",
        }}
      >
        <defs>
          <pattern
            id="hexagons"
            width="50"
            height="43.4"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(5) translate(2) rotate(45)"
          >
            <polygon
              points="24.8,22 37.3,29.2 37.3,43.7 24.8,50.9 12.3,43.7 12.3,29.2"
              id="hex"
              fill="rgb(0,0,0)"
              strokeWidth={1}
              stroke="#1e1e1e"
            />
            <use xlinkHref="#hex" x="25" />
            <use xlinkHref="#hex" x="-25" />
            <use xlinkHref="#hex" x="12.5" y="-21.7" />
            <use xlinkHref="#hex" x="-12.5" y="-21.7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg> */}

      {/* SMALLER HEXAGONS OPTION */}
      <svg
        id="patternId"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          zIndex: -999,
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          background: "rgb(0,0,0)",
          minHeight: "100vh",
        }}
      >
        <defs>
          <pattern
            id="a"
            patternUnits="userSpaceOnUse"
            width="29"
            height="50.115"
            patternTransform="scale(1) rotate(20)"
          >
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="hsla(0, 0%, 0%, 1)"
            />
            <path
              d="M14.498 16.858L0 8.488.002-8.257l14.5-8.374L29-8.26l-.002 16.745zm0 50.06L0 58.548l.002-16.745 14.5-8.373L29 41.8l-.002 16.744zM28.996 41.8l-14.498-8.37.002-16.744L29 8.312l14.498 8.37-.002 16.745zm-29 0l-14.498-8.37.002-16.744L0 8.312l14.498 8.37-.002 16.745z"
              stroke-width="1"
              stroke="hsla(0, 0%, 12%, 1)" // #1e1e1e
              fill="none"
            />
          </pattern>
        </defs>
        <rect
          width="800%"
          height="800%"
          transform="translate(0,0)"
          fill="url(#a)"
        />
      </svg>
      {children}
    </div>
  );
}
