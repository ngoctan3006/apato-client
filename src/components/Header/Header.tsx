import React, {useState} from "react";
import styles from "./Header.module.css";
import {Button} from "@mui/material";
import SearchInput from "./components/SearchInput/SearchInput";
import AppText from "../AppText/AppText";
import {useNavigate} from "react-router-dom";
import useAuth from "../../hook/useAuth";

const Header: React.FC = () => {
  const [searchText, setSearchText] = useState("")
  const navigate = useNavigate()
  const {signOut} = useAuth()
  const auth = useAuth()
  const user = auth.user

  const navigateToLogIn = () => {
    navigate("/login")
  }
  return (
    <div className={styles.headerContainer}>
      <div>
        <AppText>Rent Apartment</AppText>
      </div>
      <SearchInput
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {
        user ?
          <>
            <div onClick={() => signOut()}>
            <AppText>{user.id}</AppText>
            </div>
          </>
          : <Button
            onClick={navigateToLogIn}
            sx={{
              borderRadius: "10px",
              padding: "6px 10px",
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
          </Button>}
    </div>
  )
}

export default Header
