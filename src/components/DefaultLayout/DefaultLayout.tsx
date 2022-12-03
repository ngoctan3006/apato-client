import React from "react";
import styles from "./DefaultLayout.module.css";
import Header from "../Header/Header";

interface LayoutProps {
  children: React.ReactNode
}

const DefaultLayout: React.FC<LayoutProps> = ({children}) => {
  return (
    <div className={styles.layoutContainer}>
      <Header/>
      <div className={styles.layoutBody}>
        {children}
      </div>
    </div>
  )
}

export default DefaultLayout;
