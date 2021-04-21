import React from "react";
import { Link } from "react-router-dom";

const MapItems = [
  { title: "Home", url: "/" },
  { title: "Login", url: "/login" },
  { title: "Register", url: "/register" },
  { title: "Profile", url: "/profile" },
  { title: "Overview", url: "/overview" },
];

const SiteMap = () => {
  const generateNavList = () =>
    MapItems.map((item, index) => (
      <div key={item.title}>
        <Link to={item.url}> {item.title} </Link>
      </div>
    ));

  return <div className="site-map"><h2>Site map</h2>{generateNavList()}</div>;
};

export default SiteMap;