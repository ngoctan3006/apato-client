import React from 'react';
import AppText from "../../../components/AppText/AppText";
import styles from "./ApartListItem.module.css";
import {ApartModel} from "../../../model/ApartModel";
import {numberWithCommas} from "../../../utils/utils";

interface ApartListItemProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  item: ApartModel
}

const ApartListItem: React.FC<ApartListItemProps> = (props) => {
  const {item} = props
  return (
    <div {...props} className={styles.itemContainer}>
      <img alt="" className={styles.image} src={item.image[0]}/>
      <div className={styles.content}>
        <AppText
          fontType={"semi"}
          className={styles.name}>{item.title}</AppText>
        <AppText
          fontType={"regular"}
          className={styles.address}>{item.address}</AppText>
        <div className={styles.itemFooter}>
          <AppText
            fontType={"regular"}
            className={styles.rate}>{Math.round(item.total_rating)} / 5</AppText>
          <AppText
            fontType={"regular"}
            className={styles.price}>{numberWithCommas(Number(item.price))}</AppText>
        </div>
      </div>
    </div>
  )
}

export default ApartListItem;
