import { useState,useEffect } from "react";

import Auth from "./Auth";

export default function Signup() {
  const [bg, setBg] = useState("");

  useEffect(() => {
    setBg(`https://picsum.photos/1920/1080?random=${Date.now()}`);
  }, []);
  
  return (
    <>
      <div className="signupPageContainer">
        <div className="photo-img" style={{ "--bg-image": `url(${bg})` }}></div>
        <div className="signup-process">
          <Auth/>
        </div>
      </div>
    </>
  );
}
