import React from "react"
import styles from "./Header.module.scss"

interface HeaderProps {}

export const Header = (props: HeaderProps) => {
  return (
    <div className={styles.wrapper}>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className={`${styles.brand} navbar-brand`}>
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
    </div>
  )
}
