import { BsPatchCheckFill } from "react-icons/bs";
import { FaEthereum, FaClock } from "react-icons/fa";
import React from "react";

const Card = ({ val }: any) => {
  return (
    <div className="Card">
      <img src={val.image} alt={val.nftname} />
      <div className="below">
        {" "}
        <div>{val.author.name}</div>
        <div>
          #{val.nftname} {val.isVerified == true ? <BsPatchCheckFill /> : null}
        </div>
        <div className="bid">
          Current Bid:{"    "}
          <div>
            <FaEthereum />
            3.2Eth
          </div>
        </div>
        <div className="ends">
          <div className="bid">
            Ends in:{"    "}
            <div>
              <FaClock />
              16Hours
            </div>
          </div>
          <button>Place Bid</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
