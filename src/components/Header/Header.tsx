import React, {useState} from "react";
import styles from "./Header.module.css";
import {Button} from "@mui/material";
import SearchInput from "./components/SearchInput/SearchInput";
import AppText from "../AppText/AppText";
import {useNavigate} from "react-router-dom";

const Header: React.FC = () => {
  const [searchText, setSearchText] = useState("")
  const navigate = useNavigate()

  const navigateToLogIn = () => {
    navigate("/login")
  }
  return (
    <div className={styles.headerContainer}>
      <div>
        <AppText>Course Hub</AppText>
      </div>
      <SearchInput
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button
        onClick={navigateToLogIn}
        sx={{
          borderRadius: "20px",
          padding: "6px 24px",
          alignSelf: "center"
        }}
        variant="contained"
        type={"button"}
        style={{
          fontSize: "14px",
          textTransform: "none",
          justifySelf: "flex-end"
        }}>
        Đăng nhập
      </Button>
    </div>
  )
}

export default Header
