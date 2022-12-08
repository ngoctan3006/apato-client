import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import ApartListItem from "./components/ApartListItem";
import styles from "./HomePage.module.css";
import {loadAllPost} from "../../api/service";
import {ApartModel} from "../../model/ApartModel";
import useAuth from "../../hook/useAuth";
import AppText from "../../components/AppText/AppText";
import SearchInput from "../../components/Header/components/SearchInput/SearchInput";
import {Button} from "@mui/material";
<<<<<<< Updated upstream
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
=======
import ProfileMenu from "./components/ProfileMenu/ProfileMenu";
import FilterMenu from "./components/FilterMenu/FilterMenu";
import ApartListItem from "./components/ApartListItem";
import Logo from "./components/logo1.png"
>>>>>>> Stashed changes

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const {signOut} = useAuth()
  const auth = useAuth()
  const user = auth.user

  const [searchKey, setSearchKey] = useState("")
  const [priceStart, setPriceStart] = useState("")
  const [priceEnd, setPriceEnd] = useState("")
  const [areaStart, setAreaStart] = useState("")
  const [areaEnd, setAreaEnd] = useState("")
  const [apartList, setApartList] = useState<ApartModel[]>([])
  const [showFilterBar, setShowFilterBar] = useState(false)

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
    loadHomePageData().finally(() => {
    })
  }, [])

  const loadHomePageData: () => Promise<void> = async () => {
    try {
      const res = await loadAllPost({
        searchValue: searchKey,
        priceStart: Number(priceStart),
        priceEnd: Number(priceEnd),
        areaStart: Number(areaStart),
        areaEnd: Number(areaEnd)
      })
      if (res.status === 201) {
        const newApartList = res.data.map((item) => {
          const newImage = item.image.map((_imageLink) => {
            return ("http://" + _imageLink)
          })
          return {
            ...item,
            image: [...newImage]
          }
        })
        setApartList(newApartList)
      }
    } catch (e: any) {
      console.log(e?.response?.data?.message)
    } finally {

    }
  }

  const searchApart = async () => {
    try {
      const res = await loadAllPost({
        searchValue: searchKey
      })

      if (res.status === 201) {
        const newApartList = res.data.map((item) => {
          const newImage = item.image.map((_imageLink) => {
            return ("http://" + _imageLink)
          })
          return {
            ...item,
            image: [...newImage]
          }
        })
        setApartList(newApartList)
      }
    } catch (e: any) {
      console.log(e?.response?.data?.message)
    } finally {

    }
  }

  useEffect(() => {
    const timer = setTimeout(async () => {
      await searchApart()
    }, 300)

    return () => clearTimeout(timer)
  }, [searchKey])

  return (
    <div>
      <div className={styles.headerContainer}>
        <div id = "logo_header">
          <img src={Logo} alt="logo" height="60"/>
        </div>
        <SearchInput
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        {
          user ?
            <>
              <div >
                <AppText>{user.id} <Button variant="outlined" onClick={() => signOut()}>Log out</Button></AppText>
              </div>
              {showCreatePostButton &&
                  <Button
                      style={{
                        fontSize: "14px",
                        textTransform: "none",
                      }}
                      variant="outlined"
                      onClick={navigateToPostApart}>Post</Button>}
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
              Log in
            </Button>
        }
      </div>
      <div className={styles.body}>
<<<<<<< Updated upstream
        {showFilterBar && <div className={styles.filterBar}>
            <div className={`${styles.alignRow} ${styles.spaceBetween}`}>
                <AppText className={styles.filterBarTitle}>Filter</AppText>
                <div onClick={() => {
                  setShowFilterBar(!showFilterBar)
                }}>
                    <CloseIcon
                        style={{fontSize: "40px"}}/>
                </div>
            </div>
            <AppText className={styles.label}>Price (VND)</AppText>
            <div className={`${styles.alignRow} ${styles.spaceBetween}`}>
                <input
                    value={priceStart}
                    onChange={(e) => setPriceStart(e.target.value)}
                    className={styles.filterInput}
                    placeholder={"Minimum"}/>
                <div style={{width: "10px"}}/>
                <input
                    value={priceEnd}
                    onChange={(e) => setPriceEnd(e.target.value)}
                    className={styles.filterInput}
                    placeholder={"Maximum"}/>
            </div>
            <AppText className={styles.label}>Area (square meters)</AppText>
            <div className={`${styles.alignRow} ${styles.spaceBetween}`}>
                <input
                    value={areaStart}
                    onChange={(e) => setAreaStart(e.target.value)}
                    className={styles.filterInput}
                    placeholder={"Minimum"}/>
                <div style={{width: "10px"}}/>
                <input
                    value={areaEnd}
                    onChange={(e) => setAreaEnd(e.target.value)}
                    className={styles.filterInput}
                    placeholder={"Maximum"}/>
            </div>
            <div
                onClick={async () => {
                  await loadHomePageData()
=======
        <div className={`${styles.alignRow} ${styles.spaceBetween}`}>
          <AppText className={styles.listTitle}>List of Apartment</AppText>
          <FilterMenu
            showFilterMenu={showFilterBar}
            clickMenuOutside={() => {
              setShowFilterBar(!showFilterBar)
            }}
            setShowFilterMenu={() => {
              setShowFilterBar(!showFilterBar)
            }}
            priceStart={priceStart}
            priceEnd={priceEnd}
            setPriceStart={setPriceStart}
            setPriceEnd={setPriceEnd}
            areaStart={areaStart}
            setAreaStart={setAreaStart}
            areaEnd={areaEnd}
            setAreaEnd={setAreaEnd}
            filterHandler={async () => {
              await loadHomePageData()
              setAreaEnd("")
              setAreaStart("")
              setPriceStart("")
              setPriceEnd("")
              setShowFilterBar(false)
            }}/>
        </div>
        <div className={styles.listContainerGrid}>
          {apartList?.map((item) => {
            return (
              <ApartListItem
                onClick={() => {
                  navigate(`/apart-detail/${item.id}`)
>>>>>>> Stashed changes
                }}
                className={styles.filterSubmitButton}>
                <AppText className={styles.filterBtnText}>Done</AppText>
            </div>
        </div>}
        <div className={styles.listContainer}>
          <div className={styles.alignRow}>
            <AppText className={styles.listTitle}>List of apartments</AppText>
            <div onClick={() => {
              setShowFilterBar(!showFilterBar)
            }}>
              {!showFilterBar && <FilterListIcon
                  style={{
                    fontSize: "30px",
                    marginLeft: "100px",
                  }}/>}
            </div>
          </div>
          <div className={styles.listContainerGrid}>
            {apartList?.map((item) => {
              return (
                <ApartListItem
                  onClick={() => {
                    navigate(`/apart-detail/${item.id}`)
                  }}
                  key={item.id}
                  item={item}/>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage


