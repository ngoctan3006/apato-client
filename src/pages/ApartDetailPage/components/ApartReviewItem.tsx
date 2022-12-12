import React from "react";
import AppText from "../../../components/AppText/AppText";
import styles from "./ApartReviewItem.module.css";
import {Comment} from "../../../model/ApartDetailModel";
import {FAKE_URL} from "../ApartDetailPage";

interface ApartReviewItemProps {
  item: Comment
}

const ApartReviewItem: React.FC<ApartReviewItemProps> = ({item}) => {
  return (
    <div className={styles.itemContainer}>
      <img
        alt=""
        className={styles.image}
        src={FAKE_URL}/>
      <div>
        <AppText
          font={"semi"}
          className={styles.name}>{item.userId}</AppText>
        <AppText
          className={styles.content}>{item.comment}</AppText>
        <AppText
          className={styles.createdAt}>{new Date(item.created_at).toLocaleDateString()}</AppText>
      </div>
    </div>
  )
}

export default ApartReviewItem
