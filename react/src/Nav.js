import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { title: "Home", url: "/" },
  { title: "Login", url: "/login" },
  { title: "Register", url: "/register" },
  { title: "Profile", url: "/profile" },
  { title: "Overview", url: "/overview" },
];

const Nav = () => {
  const generateNavList = () =>
    navItems.map((item, index) => (
      <div key={item.title}>
        <NavLink exact activeClassName = "navbar__link--active" className="navbar__link" to={item.url}> {item.title} </NavLink>
      </div>
    ));

  return <div className="navigationElement">{generateNavList()}</div>;
};

export default Nav;