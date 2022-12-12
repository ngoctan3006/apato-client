import React from "react";
import styles from "./AdminPageItem.module.css";
import AppText from "../../../../components/AppText/AppText";
import {ApartModel} from "../../../../model/ApartModel";
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from "react-router-dom";
import {deletePostAPI} from "../../../../api/service";
import useAuth from "../../../../hook/useAuth";

interface AdminPageItemProps {
  item: ApartModel,
  setNeedRefresh: (needRefresh: boolean) => void
}

const AdminPageItem: React.FunctionComponent<AdminPageItemProps> = (props) => {
  const {item, setNeedRefresh} = props
  const {user} = useAuth()
  const navigate = useNavigate()

  const viewHandler = () => {
    navigate(`/apart-detail/${item.id}`)
  }

  const deletePost = async (postId: string) => {
    try {
      console.log(user?.token)
      const res = await deletePostAPI(postId, user?.token!)
      console.log(res)
      if (res.status === 200) {
        console.log("Deleted successfully")
        setNeedRefresh(true)
        // navigate("/admin")
      }
    } catch (e: any) {
      console.log(e)
    }
  }

  return (
    <div className={styles.itemContainer}>
      <img src={item.image[0]} alt={""} className={styles.itemImage}/>

      <div className={styles.itemContent}>
        <AppText
          font={"semi"}
          className={styles.itemTitle}>{item.title}</AppText>
        <AppText
          className={styles.itemDetail}>{item.detail}</AppText>
        <div className={`${styles.alignRow} ${styles.marginView}`}>
          <AppText
            className={styles.itemRate}>{Math.round(item.total_rating)}/5</AppText>
          <StarIcon style={{
            fontSize: "25px",
            color: "orange"
          }}/>
        </div>
      </div>

      <div className={styles.itemViewAndEdit}>
        <div onClick={viewHandler}>
          <VisibilityIcon style={{
            fontSize: "25px",
            color: "#1976d2",
            marginRight: "16px"
          }}/>
        </div>
        <div onClick={ async () => {
          await deletePost(item.id.toString())
        }}>
          <DeleteIcon style={{
            fontSize: "25px",
            color: "red"
          }}/>
        </div>
      </div>
    </div>
  )
}

export default AdminPageItem;
