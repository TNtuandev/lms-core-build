import React from "react";
import Image  from "next/image";

function HomePage() {
  return <div>
    <Image src="/images/home/img.png" width={0}
           height={0}
           style={{ width: '100%', height: 'auto' }}
           sizes="100vw" alt="Image"/>
  </div>;
}

export default HomePage;
