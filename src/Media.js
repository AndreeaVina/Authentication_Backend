import React from "react"
import {Link} from "react-router-dom"

const Media = () => {
    return (
        <div class="media">
            <Link to="/" class="site-name">Helpie</Link>
            <div class="social">
                <a href="https://www.facebook.com"><img src="/photos/facebook.png"/></a>
                <a href="https://www.instagram.com"><img src="/photos/instagram.png"/></a>
                <a href="https://www.twitter.com"><img src="/photos/twitter.png"/></a>
                <a href="https://www.reddit.com"><img src="/photos/reddit.png"/></a>
            </div>
        </div>
    )
}

export default Media;