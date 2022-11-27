import React from "react";
import styles from "./PostApartPage.module.css";
import AppText from "../../components/AppText/AppText";
import {Button} from "@mui/material";
import {useForm} from "react-hook-form";

const PostApartPage: React.FC = () => {
  const {register, handleSubmit, formState: {errors}} = useForm()
  const postHandler = () => {

  }
  return (
    <div className={styles.container}>
      <form
        className={styles.formContainer}
        onSubmit={handleSubmit(postHandler)}>
        <input
          className={styles.input}
          {...register("image", {
            required: true,
          })}
          name={"image"}
          placeholder={"Ảnh"}
          type={"image"}/>
        {errors.image?.type === 'required' && <AppText
            className={styles.errorText}
            role="alert">Image is required</AppText>}
        <input
          className={styles.input}
          {...register("name", {
            required: true,
          })}
          name={"name"}
          placeholder={"Tên"}
          type={"text"}/>
        {errors.name?.type === 'required' && <AppText
            className={styles.errorText}
            role="alert">Name is required</AppText>}
        <input
          className={styles.input}
          {...register("address", {
            required: true,
          })}
          name={"address"}
          placeholder={"Địa chỉ"}
          type={"text"}/>
        {errors.address?.type === 'required' && <AppText
            className={styles.errorText}
            role="alert">Address is required</AppText>}
        <input
          className={styles.input}
          {...register("square", {
            required: true,
          })}
          name={"square"}
          placeholder={"Diện tích"}
          type={"text"}/>
        {errors.square?.type === 'required' && <AppText
            className={styles.errorText}
            role="alert">Square is required</AppText>}
        <input
          className={styles.input}
          {...register("price", {
            required: true,
          })}
          name={"price"}
          placeholder={"Giá thuê"}
          type={"text"}/>
        {errors.price?.type === 'required' && <AppText
            className={styles.errorText}
            role="alert">Price is required</AppText>}
        <textarea
          className={styles.textArea}
          {...register("description", {required: true, minLength: 8})}
          name={"description"}
          placeholder={"Mô tả"}/>
        {errors.description?.type === 'required' && <AppText
            className={styles.errorText}
            role="alert">description is required</AppText>}
        <Button
          sx={{
            borderRadius: "10px",
            padding: "10px 0",
            width: "380px",
            alignSelf: "center"
          }}
          variant="contained"
          type={"submit"}
          style={{
            fontSize: "16px",
            margin: "40px 0"
          }}>
          Submit
        </Button>
      </form>
    </div>
  )
}

export default PostApartPage
