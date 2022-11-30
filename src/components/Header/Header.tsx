import React, {useCallback, useEffect, useMemo} from "react";
import styles from "./Header.module.css";
import {Button} from "@mui/material";
import SearchInput from "./components/SearchInput/SearchInput";
import AppText from "../AppText/AppText";
import {useNavigate} from "react-router-dom";
import useAuth from "../../hook/useAuth";

interface HeaderProps {
  searchText: string,
  setSearchText: React.Dispatch<React.SetStateAction<string>>
}

const Header: React.FC<HeaderProps> = (props) => {
  const {searchText, setSearchText} = props
  const navigate = useNavigate()
  const {signOut} = useAuth()
  const auth = useAuth()
  const user = auth.user

  const showCreatePostButton: boolean = useMemo(() => {
    return user?.role === "SELLER"
  }, [user?.role])

  const navigateToLogIn = () => {
    navigate("/login")
  }
  const navigateToPostApart = useCallback(() => {
    navigate("/post-apart")
  }, [showCreatePostButton])

  useEffect(() => {

  }, [])

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
            {showCreatePostButton &&
                <Button
                    style={{
                      fontSize: "14px",
                      textTransform: "none",
                    }}
                    variant="outlined"
                    onClick={navigateToPostApart}>Đăng bài</Button>}
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
          </Button>
      }
    </div>
  )
}

export default Header
