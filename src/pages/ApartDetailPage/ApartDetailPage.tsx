import React, {useState} from "react";
import AppText from "../../components/AppText/AppText";
import styles from "./ApartDetailPage.module.css";
import ApartReviewItem from "./components/ApartReviewItem";

const FAKE_URL = "https://cdn.vietnambiz.vn/2020/2/26/cd-15826897012081215793790.jpg"

const ApartDetailPage: React.FC = () => {
  const [comment, setComment] = useState("")
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
                src={FAKE_URL}/>
              <img
                alt=""
                className={styles.image}
                src={FAKE_URL}/>
              <img
                alt=""
                className={styles.image}
                src={FAKE_URL}/>
              <img
                alt=""
                className={styles.image}
                src={FAKE_URL}/>
            </div>
            <div className={styles.info}>
              <div className={styles.infoHeader}>
                <div>
                  <AppText fontType={"semi"} className={styles.detail}>Name: </AppText>
                  <AppText className={styles.value}>Apartment 1</AppText>
                </div>
                <AppText className={styles.rate}>5/5 Rates</AppText>
              </div>
              <AppText fontType={"semi"} className={styles.detail}>Address: </AppText>
              <AppText className={styles.value}>Address 1</AppText>
              <AppText fontType={"semi"} className={styles.detail}>Description: </AppText>
              <AppText className={styles.value}>Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type specimen book. It has survived not only
                five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.</AppText>
              <AppText fontType={"semi"} className={styles.detail}>Contact: </AppText>
              <AppText className={styles.value}>0000000000</AppText>
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
