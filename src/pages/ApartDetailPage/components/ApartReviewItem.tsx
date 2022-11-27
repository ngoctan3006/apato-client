import React from "react";
import {CommentModel} from "../ApartDetailPage";
import AppText from "../../../components/AppText/AppText";
import styles from "./ApartReviewItem.module.css";

interface ApartReviewItemProps {
  item: CommentModel
}

const ApartReviewItem: React.FC<ApartReviewItemProps> = ({item}) => {
  return (
    <div className={styles.itemContainer}>
      <img
        className={styles.image}
        src={item.author.avatar}/>
      <div>
        <AppText
          fontType={"semi"}
          className={styles.name}>{item.author.name}</AppText>
        <AppText
          className={styles.content}>{item.content}</AppText>
        <AppText
          className={styles.createdAt}>{item.createdAt}</AppText>
      </div>
    </div>
  )
}

export default ApartReviewItem
