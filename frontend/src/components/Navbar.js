import React, { useState, useEffect } from "react"
import { Button } from "./Button"
import { Link } from "react-router-dom"
import "./Navbar.scss"

function Navbar({ children }) {
  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false)
    } else {
      setButton(true)
    }
  }

  useEffect(() => {
    showButton()
  }, [])

  window.addEventListener("resize", showButton)

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            Inventory
            <i className="fas fa-warehouse"></i>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                HOME
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/login"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                LOGIN
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/signup"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                SIGNUP
              </Link>
            </li>
          </ul>
          <Link className="btn-mobile" to="/login">
            {button && <Button buttonStyle="btn--outline">LOGIN</Button>}
          </Link>
          <Link className="btn-mobile" to="/signup">
            {button && <Button buttonStyle="btn--outline">SIGNUP</Button>}
          </Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar
