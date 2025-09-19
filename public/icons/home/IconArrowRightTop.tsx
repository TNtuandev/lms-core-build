import * as React from "react";
import { SVGProps } from "react";

const IconArrowRightTop = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={56}
    height={56}
    fill="none"
    {...props}
  >
    <path
      fill="#212B36"
      d="M0 12C0 5.373 5.373 0 12 0h32c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12H12C5.373 56 0 50.627 0 44V12Z"
    />
    <path
      fill="#fff"
      d="M36 21.4a1.333 1.333 0 0 0-1.333-1.333L24 20a1.334 1.334 0 0 0 0 2.667h7.413L20.387 33.72a1.333 1.333 0 0 0 0 1.893 1.332 1.332 0 0 0 1.893 0L33.333 24.56V32A1.333 1.333 0 1 0 36 32V21.4Z"
    />
  </svg>
);
export default IconArrowRightTop;
