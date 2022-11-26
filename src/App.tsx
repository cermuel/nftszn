import { createContext, useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import AddNFT from "./AddNFT";
import "./App.css";
import Card from "./Card";
import Home from "./Home";
import Signin from "./Signin";
import { NFTLIst } from "./types";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import MarketPlace from "./MarketPlace";

export const AppContext = createContext<any | null>({});

function App() {
  const [isAuth, setisAuth] = useState<any>(localStorage.getItem("isAuth"));

  //responsive navbar

  const menuBtn = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const signRef = useRef<HTMLDivElement>(null);
  let menu = menuBtn.current;
  let header = headerRef.current;
  let sign = signRef.current;

  useEffect(() => {
    menu = menuBtn.current;
    header = headerRef.current;
    sign = signRef.current;
  }, []);

  const toggleButtons = () => {
    if (menu && header && sign) {
      if (menu.className === "hamburger") {
        menu.className = "hamburger active";
        header.className = "links active";
        sign.className = "sign active";
      } else {
        menu.className = "hamburger";
        header.className = "links";
        sign.className = "sign";
      }
    }
  };

  //end of responsive nav

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setisAuth("false");
      window.location.pathname = "/signIn";
    });
  };
  return (
    <div className="App">
      <AppContext.Provider value={{ isAuth, setisAuth }}>
        <Router>
          <div className="nav">
            <div className="hamburger" ref={menuBtn} onClick={toggleButtons}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            <div className="logo">NFT SZN</div>
            <div className="links" ref={headerRef}>
              <Link to="/">home</Link>
              <Link to="/marketplace">Marketplace</Link>
              {isAuth == "true" ? <Link to="/addNFT">Create</Link> : null}
            </div>

            <div className="sign" ref={signRef}>
              {isAuth == "true" ? (
                <button onClick={signUserOut}>Signout</button>
              ) : (
                <button>
                  <Link to="/signIn">Sign in</Link>
                </button>
              )}
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addNFT" element={<AddNFT />} />
            <Route path="/marketplace" element={<MarketPlace />} />
            <Route path="/signIn" element={<Signin />} />
          </Routes>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
