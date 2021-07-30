import React from "react"
import {Link} from "react-router-dom"
import Logo from "./images/logo.png"

function Header() {
  return (
    <div className="header">
      <div className="content">
        <img className="image" src={Logo} alt="Logo" />
        <h3 style={{ marginTop: "10px" }}> Time Management Made Easy</h3>
        <br /><br /><br />
        <Link to="/">
          <h3 className="links">📅 The Creative Scheduler</h3>
        </Link>
        <Link to="/todo">
          <h3 className="links">📝 The Creative Todo List</h3>
        </Link>

        <h4 className="footer"> <a target="blank" href="https://sagarsaha.tech">TheSagarSaha</a> © 2021</h4>

      </div>
    </div>
  )
}

export default Header
