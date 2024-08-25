import React, { useState, useEffect } from "react";
import { HomeOutlined } from "@ant-design/icons";
import "./Profile.css";
import axios from "axios";
import { baseApi } from "../../constants";
import { UserInfo } from "./Details/MainUser";
import { Link, Routes, Route } from "react-router-dom";
import History from "./Details/History";
import Orders from "./Details/Orders";
import MainUser from "./Details/MainUser";
import FinancialCard from "./Details/FinancialCard";
import Promotions from "./Details/Promotions";
import RecommendedPurchase from "./Details/RecommendedPurchase";

let list = [
  ["Lični podaci", " "],
  ["Porudžbine", "orders"],
  ["Promocije/popusti", "promotions"],
  ["Istorija", "history"],
  ["Finansijska kartica", "financial-card"],
  ["Preporučena kupovina", "recommended-purchase"],
  ["Pomoć", "help"],
];

const Profile: React.FC = () => {
  let userEmail = localStorage.getItem("userEmail");
  const token: string | null = localStorage.getItem("accessToken");
  const [userInfo, setUserInfo] = useState<UserInfo | null | undefined>();

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const params = { user: userEmail };
  useEffect(() => {
    axios.get(`${baseApi}/users/getUser`, { params, ...header }).then((res) => {
      console.log("res.data: ", res.data);
      setUserInfo({ ...res.data.data });
    });
  }, []);
  return (
    <>
      <div className="profileBox">
        <div className="profileHeader">
          <div>
            <h2>
              &nbsp;
              <HomeOutlined /> / Moj profil
            </h2>
          </div>
          <div>
            <Link to="Pomoć" style={{ textDecoration: "underline" }}>
              Pomoć&nbsp;
            </Link>
            <i className="i">i</i>
          </div>
        </div>
        <div className="infoBox">
          <div className="itemBox">
            <ul style={{ listStyle: "none", padding: 0, width: "200px" }}>
              {list.map((item, idx) => (
                <li key={item[0] + idx} className="itemWrapper">
                  <Link to={`/account/profile/${item[1]}`}>
                    <p className="item">{item[0]}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ width: "100%", padding: "0px 20px" }}>
            <Routes>
              <Route path="/*" element={<MainUser userInfo={userInfo} />} />
              <Route path="/history" element={<History />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/financial-card" element={<FinancialCard />} />
              <Route
                path="/recommended-purchase"
                element={<RecommendedPurchase />}
              />
              <Route path="/promotions" element={<Promotions />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
