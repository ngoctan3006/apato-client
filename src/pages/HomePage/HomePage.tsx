import React from "react";
import useAuth from "../../hook/useAuth";
import {useNavigate} from "react-router-dom";
import Header from "../../components/Header/Header";
import ApartListItem from "./components/ApartListItem";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
  const {signOut, user} = useAuth()
  const navigate = useNavigate()
  return (
    <div style={{background: "whitesmoke"}}>
      <Header/>
      {/*<nav>*/}
      {/*  {*/}
      {/*    user ? <Button onClick={() => {*/}
      {/*        signOut()*/}
      {/*      }}>{`Hi, ${user?.id}, sign out`}</Button>*/}
      {/*      :*/}
      {/*      <Link to={"/login"}>Login to discovery more</Link>*/}
      {/*  }*/}
      {/*</nav>*/}

      {/*<div>*/}
      {/*  <AppText>This is the website content</AppText>*/}
      {/*</div>*/}
      <div className={styles.listContainer}>
        {FAKE_DATA.map((item) => {
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
  )
}

export default HomePage

export interface ApartModel {
  id: number,
  image: string,
  name: string,
  address: string,
  rate: number,
  price: string
}

function genFakeApartList() {
  let Data: ApartModel[] = []
  for (let i = 1; i < 100; i++) {
    Data.push({
      id: i,
      image: "https://cdn.vietnambiz.vn/2020/2/26/cd-15826897012081215793790.jpg",
      name: "Apartment" + " " + i.toString(),
      address: "DongDa, Hanoi, Viet Nam",
      rate: Math.ceil(Math.random() * 5),
      price: "1.000.000 VND"
    })
  }
  return Data
}

const FAKE_DATA: ApartModel[] = genFakeApartList()
