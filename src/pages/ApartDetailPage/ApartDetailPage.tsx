import React from "react";
import AppText from "../../components/AppText/AppText";
import styles from "./ApartDetailPage.module.css";
import {TextFields} from "@mui/icons-material";
import ApartReviewItem from "./components/ApartReviewItem";

const FAKE_URL = "https://cdn.vietnambiz.vn/2020/2/26/cd-15826897012081215793790.jpg"

const ApartDetailPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div>
          <img
            className={styles.image}
            src={FAKE_URL}/>
          <AppText className={styles.rate}>5/5 Rates</AppText>
        </div>
        <div>
          <AppText>Apartment 1</AppText>
          <AppText>Address 1</AppText>
          <AppText>Description</AppText>
          <AppText>Contact: 0000000000</AppText>
        </div>
      </div>

      <div>
        {/*//Comment*/}
        <AppText>Reviews</AppText>
        {FAKE_COMMENT.map((item) => {
          return (
            <ApartReviewItem
              key={item.id}
              item={item}/>
          )
        })}
      </div>

    </div>
  )
}
export default ApartDetailPage;

export interface CommentModel{
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
      createdAt: new Date().toString()
    })
  }
  return Data
}

const FAKE_COMMENT: CommentModel[] = genFakeComment()
