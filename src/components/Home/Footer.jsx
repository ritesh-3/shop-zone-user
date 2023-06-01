import React from "react";
import { sellerUrl } from "../../ServerConfigs";

const Footer = () => {
  return (
    <div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
        text-center pt-2 text-gray-400 text-sm pb-8 bg-gray-900" >
        <span>© 2023 Shop Zone. All rights reserved.</span>
        <a href={sellerUrl} target="_blank">Become a seller!</a>
        <a href="https://ritesh-showcase.web.app/" target="_blank">Contact with me!</a>

      </div>
    </div>
  );
};

export default Footer;