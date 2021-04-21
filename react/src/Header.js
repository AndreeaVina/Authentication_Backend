import React from "react"
import Logo from "./Logo"
import Nav from "./Nav"
import "./styles/Header.css"

const Header = () => {
    return (
        <div className="headerContainer">
            <div className="logoContainer">
                <Logo name="Helpie" />
            </div>
            <div className="navContainer">
                <Nav />
            </div>
        </div>
    )
}

export default Header;