import React from "react"
import SiteMap from "./SiteMap"
import Contact from "./Contact"
import Media from "./Media"
import "./styles/Footer.css"

const Footer = () => {
    return (
      <footer>
        <Media/>
        <Contact/>
        <SiteMap/>
      </footer>
    )
}

export default Footer;