import React from "react"
// import styles from "./Canvas.module.scss"

interface HeaderProps {}

export const Header = (props: HeaderProps) => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          PATTERNY
        </a>
      </div>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <a className="navbar-item">About</a>
        </div>
      </div>
    </nav>
  )
}
