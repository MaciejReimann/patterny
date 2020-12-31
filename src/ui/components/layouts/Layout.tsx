import React from "react"

import styles from "./Layout.module.scss"

interface LayoutProps {
  header: JSX.Element
  aside: JSX.Element
  main: JSX.Element
}

export const Layout = (props: LayoutProps) => {
  const { header, aside, main } = props

  return (
    <div className={`${styles.wrapper} container.is-fullhd`}>
      <div className={`${styles.header}`}> {header}</div>

      <div className={`${styles.columns} columns`}>
        <aside className={`${styles.aside} column`}>{aside}</aside>
        <div className={`column is-8`}>
          <main className={styles.main}>{main}</main>
        </div>
      </div>
    </div>
  )
}
