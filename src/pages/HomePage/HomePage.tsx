import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Header from "../../components/Header/Header";
import ApartListItem from "./components/ApartListItem";
import styles from "./HomePage.module.css";
import {_loadAll} from "../../store/slice/postSlice";
import {useAppDispatch, useAppSelector} from "../../store/store";

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const posts = useAppSelector(state => state.post.posts)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(_loadAll())
  }, [posts.length])
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
        {posts?.map((item) => {
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


