import React, { useEffect, useState, useContext, ChangeEvent } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db, auth } from "./firebase-config";
import { AppContext } from "./App";
import { FaSearch } from "react-icons/fa";
import Card from "./Card";

const MarketPlace = ({ setloggedIn }: any) => {
  const contextStuff = useContext(AppContext);

  const [nftList, setnftList] = useState<any>([]);
  const [filteredNftList, setfilteredNftList] = useState([]);
  const nftRef = collection(db, "nfts");
  const [search, setsearch] = useState("");

  useEffect(() => {
    const getNFTs = async () => {
      const data = await getDocs(nftRef);
      setnftList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getNFTs();
  }, []);
  useEffect(() => {
    setfilteredNftList(
      nftList.filter((nft: any) =>
        nft.nftname.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, nftList]);

  return (
    <div>
      <div className="searchContainer">
        <div className="search">
          <FaSearch />
          <input
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setsearch(e.target.value)
            }
          />
        </div>
      </div>
      <div className="cardContainer">
        {filteredNftList.map((val: any, key: number) => {
          return <Card val={val} key={key}></Card>;
        })}
      </div>
    </div>
  );
};

export default MarketPlace;
