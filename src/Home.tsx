import { useEffect } from "react";
import image from "./assets/rightImage.svg";

const Home = () => {
  return (
    <div className="Home">
      <div className="left">
        <div className="title">
          Discover, Collect and sell unique <br /> Digital art
        </div>
        <div className="cryptos">
          <div>Ethereum</div>
          <div>Polygon</div>
          <div>Bitcoin</div>
        </div>
      </div>
      <div className="right">
        <img src={image} alt="" />
      </div>
    </div>
  );
};

export default Home;
