import React from "react";
import { sellerUrl } from "../../ServerConfigs";

const Footer = () => {
  return (
    <div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
        text-center pt-2 text-gray-400 text-sm pb-8 bg-gray-900" >
        <a href="https://ritesh-showcase.web.app/" target="_blank">Contact with me!</a>
        <a href={sellerUrl} target="_blank">Become a seller!</a>
        <span>© 2023 Shop Zone. All rights reserved.</span>
      </div>
    </div>
  );
};

export default Footer;
