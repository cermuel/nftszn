import React, { useEffect, useState, useContext } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db, auth } from "./firebase-config";
import { AppContext } from "./App";
import { BsPatchCheckFill } from "react-icons/bs";
import Card from "./Card";

const MarketPlace = ({ setloggedIn }: any) => {
  const contextStuff = useContext(AppContext);

  const [nftList, setnftList] = useState<any>([]);
  const nftRef = collection(db, "nfts");

  useEffect(() => {
    const getNFTs = async () => {
      const data = await getDocs(nftRef);
      setnftList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getNFTs();
  }, []);

  return (
    <div>
      <div className="cardContainer">
        {nftList.map((val: any, key: number) => {
          return <Card val={val} key={key}></Card>;
        })}
      </div>
    </div>
  );
};

export default MarketPlace;
