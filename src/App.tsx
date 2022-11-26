import { createContext, useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import AddNFT from "./AddNFT";
import "./App.css";
import Card from "./Card";
import Home from "./Home";
import { NFTLIst } from "./types";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./firebase-config";
import MarketPlace from "./MarketPlace";

export const AppContext = createContext<any | null>({});

function App() {
  const [isAuth, setisAuth] = useState<any>(localStorage.getItem("isAuth"));

  const signIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log(result);
      localStorage.setItem("isAuth", "true");
      setisAuth("true");
      window.location.pathname = "/marketplace";
      setshowPopup(false);
    });
  };

  const [showPopup, setshowPopup] = useState(false);

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
                <button
                  onClick={() => {
                    setshowPopup(true);
                  }}
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
          {showPopup ? (
            <div className="signin">
              <button onClick={signIn}>Sign in with email</button>
              <div
                onClick={() => {
                  setshowPopup(false);
                }}
              >
                X
              </div>
            </div>
          ) : null}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addNFT" element={<AddNFT />} />
            <Route path="/marketplace" element={<MarketPlace />} />
          </Routes>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
