import React, { ChangeEvent, useState, useEffect, useContext } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./App";

const AddNFT = () => {
  const first = useContext(AppContext);

  const navigate = useNavigate();
  const [image, setimage] = useState<any>("");
  const [nftName, setnftName] = useState<string>("");
  const nftRef = collection(db, "nfts");

  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const base64 = await convertToBase64(file);
      setimage(base64);
    }
  };

  const addNFT = async () => {
    if (image && nftName && auth.currentUser) {
      await addDoc(nftRef, {
        image,
        nftname: nftName,
        isVerified: false,
        author: {
          name: auth.currentUser?.displayName,
          id: auth.currentUser?.uid,
        },
      });
      alert("Successfully uploaded");
      navigate("/");
    } else {
      alert("Something occured");
    }
  };

  useEffect(() => {
    if (first.isAuth != "true") {
      navigate("/signin");
    }
  }, []);

  return (
    <div>
      <div>
        <br />
        <br />
        <input type="file" accept="image/*" onChange={handleChange} required />
        {/* <button>Upload to Firebase</button> */}
        <br />
        <br />
        <input
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setnftName(e.target.value)
          }
          required
        />
        <button onClick={addNFT}>SUBMIT</button>
        <img src={image} alt="" />
      </div>
    </div>
  );
};

export default AddNFT;
