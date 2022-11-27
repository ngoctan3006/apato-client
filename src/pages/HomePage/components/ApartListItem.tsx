import React from 'react';
import {ApartModel} from "../HomePage";
import AppText from "../../../components/AppText/AppText";
import styles from "./ApartListItem.module.css";

interface ApartListItemProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  item: ApartModel
}

const ApartListItem: React.FC<ApartListItemProps> = (props) => {
  const {item} = props
  return (
    <div {...props} className={styles.itemContainer}>
      <img className={styles.image} src={item.image}/>
      <div className={styles.content}>
        <AppText
          fontType={"semi"}
          className={styles.name}>{item.name}</AppText>
        <AppText
          fontType={"regular"}
          className={styles.address}>{item.address}</AppText>
        <div className={styles.itemFooter}>
          <AppText
            fontType={"regular"}
            className={styles.rate}>{item.rate} / 5</AppText>
          <AppText
            fontType={"regular"}
            className={styles.price}>{item.price}</AppText>
        </div>
      </div>
    </div>
  )
}

export default ApartListItem;
