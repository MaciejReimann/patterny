import React from "react"

import { Header } from "../molecules/Header"
import styles from "./Layout.module.scss"

interface LayoutProps {
  aside: any
  main: any
}

export const Layout = (props: LayoutProps) => {
  const { aside, main } = props

  return (
    <div className={`${styles.wrapper} container.is-fullhd`}>
      <Header />
      <div className={`${styles.columns} columns`}>
        <div className={`column`}>
          <aside className={styles.aside}>{aside}</aside>
        </div>
        <div className={`column is-9`}>
          <main className={styles.main}>{main}</main>
        </div>
      </div>
    </div>
  )
}
