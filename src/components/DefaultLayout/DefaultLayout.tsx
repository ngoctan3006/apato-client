import React from "react";
import styles from "./DefaultLayout.module.css";
import Header from "../Header/Header";

interface LayoutProps {
  children: React.ReactNode
}

const DefaultLayout: React.FC<LayoutProps> = ({children}) => {
  return (
    <div>
      <Header/>
      {children}
    </div>
  )

}

export default DefaultLayout;
