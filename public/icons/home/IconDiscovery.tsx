import * as React from "react";
import { SVGProps } from "react";

const IconDiscovery = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={80}
    height={80}
    fill="none"
    {...props}
  >
    <path
      fill="#212B36"
      d="M68.733 29C65.267 13.567 51.8 6.667 40 6.667h-.033c-11.767 0-25.2 6.9-28.7 22.3-3.934 17.2 6.6 31.766 16.133 40.966 3.533 3.4 8.067 5.1 12.6 5.1 4.533 0 9.067-1.7 12.567-5.1C62.1 60.733 72.633 46.2 68.733 29Z"
    />
    <path
      fill="#82FFCE"
      d="M35.833 45.833a2.472 2.472 0 0 1-1.766-.733l-5-5a2.515 2.515 0 0 1 0-3.533 2.515 2.515 0 0 1 3.533 0l3.233 3.233L47.4 28.233a2.515 2.515 0 0 1 3.533 0 2.515 2.515 0 0 1 0 3.534L37.6 45.1c-.5.5-1.133.733-1.767.733Z"
    />
  </svg>
);
export default IconDiscovery;
