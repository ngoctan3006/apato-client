import React, {useState} from "react";
import AppText from "../../components/AppText/AppText";
import styles from "./ApartDetailPage.module.css";
import ApartReviewItem from "./components/ApartReviewItem";
import usePost from "../../hook/usePost";
import {useParams} from "react-router-dom";

const FAKE_URL = "https://cdn.vietnambiz.vn/2020/2/26/cd-15826897012081215793790.jpg"

const ApartDetailPage: React.FC = () => {
  const [comment, setComment] = useState("")
  const params = useParams()
  const {posts} = usePost()
  const item = posts.find(item => item.id === Number(params.apartId))
  return (
    <div>
      {/*<Header/>*/}
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <AppText fontType={"bold"} className={styles.detailBlockTitle}>Apartment Detail</AppText>
          <div className={styles.detailBlock}>
            <div className={styles.imageContainer}>
              <img
                alt=""
                className={styles.image}
                src={item?.image}/>
              <img
                alt=""
                className={styles.image}
                src={item?.image}/>
              <img
                alt=""
                className={styles.image}
                src={item?.image}/>
              <img
                alt=""
                className={styles.image}
                src={item?.image}/>
            </div>
            <div className={styles.info}>
              <div className={styles.infoHeader}>
                <div>
                  <AppText fontType={"semi"} className={styles.detail}>Name: </AppText>
                  <AppText className={styles.value}>{item?.title}</AppText>
                </div>
                <AppText className={styles.rate}>{item?.rating}</AppText>
              </div>
              <AppText fontType={"semi"} className={styles.detail}>Address: </AppText>
              <AppText className={styles.value}>{item?.address}</AppText>
              <AppText fontType={"semi"} className={styles.detail}>Description: </AppText>
              <AppText className={styles.value}>{item?.detail}</AppText>
              <AppText fontType={"semi"} className={styles.detail}>Price: </AppText>
              <AppText className={styles.value}>{item?.price} VND</AppText>
            </div>
          </div>
        </div>

        <div className={styles.reviewContainer}>
          {/*//Comment*/}
          <AppText fontType={"bold"} className={styles.detailBlockTitle}>Reviews</AppText>
          <textarea
            name="textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={"Comment"}
            className={styles.cmtField}/>
          <div className={styles.cmtList}>
            {FAKE_COMMENT.map((item) => {
              return (
                <ApartReviewItem
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
export default ApartDetailPage;

export interface CommentModel {
  id: number,
  content: string,
  author: {
    name: string,
    avatar: string
  },
  createdAt: string
}

function genFakeComment() {
  let Data: CommentModel[] = []
  for (let i = 1; i < 20; i++) {
    Data.push({
      id: i,
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      author: {
        name: "Robert" + " " + i.toString(),
        avatar: FAKE_URL
      },
      createdAt: new Date().toISOString().slice(0, 10).toString()
    })
  }
  return Data
}

const FAKE_COMMENT: CommentModel[] = genFakeComment()
