import React from "react";
import {UseFormRegister} from "react-hook-form/dist/types/form";
import {FieldValues} from "react-hook-form/dist/types/fields";
import {FieldErrors} from "react-hook-form";
import styles from "../LoginPage.module.css";
import AppText from "../../../components/AppText/AppText";
import {EMAIL_REGEX} from "../../../utils/utils";
import {Button} from "@mui/material";

interface RegisterFormProps {
  onSubmit:  React.FormEventHandler<HTMLFormElement> | undefined
  register: UseFormRegister<FieldValues>;
  errors:  FieldErrors<FieldValues>
}
const RegisterForm: React.FC<RegisterFormProps> = (props) => {
  const {onSubmit, register, errors} = props

  return (
    <form
      className={styles.formContainer}
      onSubmit={onSubmit}>
      <input
        className={styles.input}
        {...register("email", {
          required: true,
          pattern: EMAIL_REGEX
        })}
        name={"email"}
        placeholder={"Email của bạn"}
        type={"email"}/>
      {errors.email?.type === 'required' && <AppText
          className={styles.errorText}
          role="alert">Email is required</AppText>}
      <input
        className={styles.input}
        {...register("password", {required: true, minLength: 8})}
        type={"password"}
        name={"password"}
        placeholder={"Mật khẩu của bạn"}/>
      {errors.password?.type === 'required' && <AppText
          className={styles.errorText}
          role="alert">Password is required</AppText>}
      <input
        className={styles.input}
        {...register("password", {required: true, minLength: 8})}
        type={"password"}
        name={"password"}
        placeholder={"Nhập lại mật khẩu của bạn"}/>
      {errors.password?.type === 'required' && <AppText
          className={styles.errorText}
          role="alert">Password is required</AppText>}
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
        Sign up
      </Button>
    </form>
  )
}

export default RegisterForm;
