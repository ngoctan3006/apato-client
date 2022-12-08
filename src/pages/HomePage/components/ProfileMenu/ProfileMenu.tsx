import React, {useCallback, useMemo} from "react";
import styles from "./ProfileMenu.module.css";
import Tippy from "@tippyjs/react/headless";
import useAuth from "../../../../hook/useAuth";
import {useNavigate} from "react-router-dom";
import AppText from "../../../../components/AppText/AppText";
import {Avatar} from "@mui/material";
import {deepPurple} from "@mui/material/colors";

interface ProfileMenuProps {
  showProfileMenu: boolean,
  clickMenuOutside: () => void,
  setShowProfileMenu: (showProfileMenu: boolean) => void
}

const ProfileMenu: React.FC<ProfileMenuProps> = (props) => {
  const {showProfileMenu, clickMenuOutside, setShowProfileMenu} = props
  const {user, signOut} = useAuth()
  const navigate = useNavigate()

  const showCreatePostButton = useMemo(() => {
    return user?.role === "SELLER"
  }, [user?.role])

  const profileMenu = useMemo(() => {
    if (!showCreatePostButton) {
      return PROFILE_OPTIONS.filter(item => item.id !== 2)
    }
    return PROFILE_OPTIONS
  }, [showCreatePostButton])

  const navigateToPostApart = useCallback(() => {
    navigate("/post-apart")
  }, [showCreatePostButton])

  const navigateHandler = (option: string) => {
    switch (option) {
      case "Trang cá nhân": {
        navigate(`/profile`)
        break
      }
      case "Đăng bài": {
        navigateToPostApart()
        break
      }
      case "Đăng xuất": {
        signOut()
        break
      }
    }
  }

  return (
    <Tippy
      onClickOutside={clickMenuOutside}
      visible={showProfileMenu}
      placement="bottom-end"
      interactive
      render={(attrs) => (
        <div {...attrs} className={styles.profileContainer}>
          <div className={styles.headerContainer}>
            <Avatar sx={{bgcolor: deepPurple[500]}}>{user?.id.slice(0, 2).toUpperCase()}</Avatar>
            <div className={styles.headerContent}>
              <AppText
                fontType={"semi"}
                className={styles.fullName}>{user?.id}</AppText>
              <AppText className={styles.username}>@{user?.id}</AppText>
            </div>
          </div>
          <div className={styles.optionList}>
            {profileMenu.map(item => {
              return (
                <div
                  onClick={() => navigateHandler(item.optionTitle)}
                  className={
                    item.id !== 3 ? `${styles.optionContainer} ${styles.optionBorder}`
                      : styles.optionContainer}>
                  <AppText className={styles.optionTitle}>{item.optionTitle}</AppText>
                </div>
              )
            })}
          </div>
        </div>
      )}>
      <div
        onClick={() => setShowProfileMenu(!showProfileMenu)}
        className={styles.imageContainer}>
        <Avatar sx={{bgcolor: deepPurple[500]}}>{user?.id.slice(0, 2).toUpperCase()}</Avatar>
      </div>
    </Tippy>
  )
}

export default ProfileMenu


const PROFILE_OPTIONS = [
  {
    id: 1,
    optionTitle: "Trang cá nhân",
    link: "/profile"
  },
  {
    id: 2,
    optionTitle: "Đăng bài",
    link: "/post-apart"
  },
  {
    id: 3,
    optionTitle: "Đăng xuất",
    link: "/"
  }
]