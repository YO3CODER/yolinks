import React from "react";
import { Cable } from "lucide-react";

const Logo = () => {
  return (
    <div
      className="flex items-center  bg-transparent"
      data-theme="cmy">
        <div className=""> 
      <Cable className="w-6 h-6 text-primary mr-2" />
      </div> 
      <div className="text-xl font-bold"> 
      🤩Amirah🔥
      </div>
    </div>
  );
};

export default Logo;
