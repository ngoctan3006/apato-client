import React, {useState} from "react";
import useAuth from "../../hook/useAuth";
import {useNavigate} from "react-router-dom";
import AppText from "../../components/AppText/AppText";
import validator from "validator";
import {useForm} from "react-hook-form";
import styles from "./LoginPage.module.css";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const {isStrongPassword, isEmail} = validator;

const LoginPage: React.FC = () => {
  const {signIn} = useAuth()
  const navigate = useNavigate()
  const {register, setValue, handleSubmit, formState: {errors}} = useForm()
  const [showRegisterForm, setShowRegisterForm] = useState(false)

  const loginHandler = (data: any) => {
    console.log(data)
    signIn({
      user: {
        id: data.email,
        token: data.password
      }
    })
    navigate("/")
  }
  const registerHandler = (data: any) => {
    console.log(data)
    signIn({
      user: {
        id: data.email,
        token: data.password
      }
    })
    navigate("/")
  }

  return (
    <div className={styles.container}>
      <div className={styles.modalContainer}>
        <AppText
          className={styles.loginLogo}
          fontType={"bold"}>
          {!showRegisterForm ? "Đăng nhập" : "Đăng ký"}
        </AppText>

        {
          !showRegisterForm ?
            <LoginForm
              onSubmit={handleSubmit(loginHandler)}
              register={register}
              errors={errors}/>
            :
            <RegisterForm
              onSubmit={handleSubmit(registerHandler)}
              register={register}
              errors={errors}/>
        }
        <div onClick={() => setShowRegisterForm(!showRegisterForm)}>
          <AppText className={styles.needRegister}>
            {!showRegisterForm
              ? "Chưa có tài khoản? Đăng ký"
              : "Đã có tài khoản? Đăng nhập"}
          </AppText>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
