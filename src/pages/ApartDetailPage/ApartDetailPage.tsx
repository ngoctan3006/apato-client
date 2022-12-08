import React, {useEffect, useState} from "react";
import AppText from "../../components/AppText/AppText";
import styles from "./ApartDetailPage.module.css";
import ApartReviewItem from "./components/ApartReviewItem";
import {useNavigate, useParams} from "react-router-dom";
import {ApartDetailModel} from "../../model/ApartDetailModel";
import {deletePostAPI, getApartDetail, postReviewApart} from "../../api/service";
import {Button, Rating} from "@mui/material";
import useAuth from "../../hook/useAuth";

export const FAKE_URL = "https://cdn.vietnambiz.vn/2020/2/26/cd-15826897012081215793790.jpg"

const ApartDetailPage: React.FC = () => {
  const params = useParams()
  const navigate = useNavigate()
  const auth = useAuth()
  const user = auth.user
  const [apartDetail, setApartDetail] = useState<ApartDetailModel>()
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState<number | null | undefined>(null)
  const [needRefresh, setNeedRefresh] = useState(false)
  const [canEdit, setCanEdit] = useState(false)

  const loadApartDetailPageData = async () => {
    try {
      const res = await getApartDetail(Number(params.apartId))
      if (res.status === 200) {
        const newImageData = res.data.image.map((item) => {
          return "http://" + item
        })
        setApartDetail({
          ...res.data,
          image: [...newImageData]
        })
        if (res.data?.creator?.email === user?.email){
          setCanEdit(true)
        }
      }
    } catch (e: any) {
      console.log(e?.response?.data?.message)
    } finally {

    }
  }

  useEffect(() => {
    loadApartDetailPageData().finally(() => {
    })
  }, [needRefresh])

  const submitReview = async () => {
    try {
      const res = await postReviewApart(params.apartId!, {
        comment: comment,
        rating: rating
      }, user?.token!)
      if (res.status === 201) {
        setNeedRefresh(!needRefresh)
      }
    } catch (e: any) {
      console.log(e?.response?.data?.message)
    }
  }

  const deletePost = async () => {
    try {
      const res = await deletePostAPI(params.apartId!, user?.token!)
      console.log(res)
      if (res.status === 200) {
        console.log("Deleted successfully")
        navigate("/")
      }
    } catch (e: any) {
      console.log(e)
    }
  }

  return (
    <div>
      {/*<Header/>*/}
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <div className={`${styles.alignRow} ${styles.spaceBetween}`}>
            <AppText fontType={"bold"} className={styles.detailBlockTitle}>Apartment Detail</AppText>
            {canEdit && <div className={styles.alignRow}>
              <Button
                variant={"outlined"}
                onClick={() => {
                  navigate(`/edit-post/${params.apartId}`)
                }}>Edit</Button>
              <Button
                variant={"outlined"}
                onClick={async () => {
                  await deletePost()
                }}>Delete</Button>
            </div>}
          </div>
          <div className={styles.detailBlock}>
            <div className={styles.imageContainer} id="apart_image">
              <img
                alt=""
                className={styles.image}
                src={apartDetail?.image[0]}
                height = "500"
                width="500"
                />
            </div>
            <div className={styles.info}>
              <div className={styles.infoHeader}>
                <div>
                  <AppText fontType={"semi"} className={styles.detail}>Name: </AppText>
                  <AppText className={styles.value}>{apartDetail?.title}</AppText>
                </div>
                <AppText className={styles.rate}>{apartDetail?.total_rating}/5</AppText>
              </div>
              <AppText fontType={"semi"} className={styles.detail}>Address: </AppText>
              <AppText className={styles.value}>{apartDetail?.address}</AppText>
              <AppText fontType={"semi"} className={styles.detail}>Description: </AppText>
              <AppText className={styles.value}>{apartDetail?.detail}</AppText>
              <AppText fontType={"semi"} className={styles.detail}>Price: </AppText>
              <AppText className={styles.value}>{apartDetail?.price} VND</AppText>
              <AppText fontType={"semi"} className={styles.detail}>Created by {apartDetail?.creator.name}</AppText>
            </div>
          </div>
        </div>

        <div className={styles.reviewContainer}>
          {/*//Comment*/}
          <AppText fontType={"bold"} className={styles.detailBlockTitle}>Reviews</AppText>
          <Rating
            name="simple-controlled"
            style={{
              marginTop: "12px",
              fontSize: "40px",
            }}
            size="large"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <textarea
            name="textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={"Comment"}
            onKeyPress={async (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                await submitReview()
                setRating(null)
                setComment("")
              }
            }}
            className={styles.cmtField}/>
          <div className={styles.cmtList}>
            {apartDetail?.comments?.map((item) => {
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
