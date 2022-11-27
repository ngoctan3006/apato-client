import React from "react";
import {Button} from "@mui/material";
import useAuth from "../../hook/useAuth";
import {Link} from "react-router-dom";
import AppText from "../../components/AppText/AppText";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";

const HomePage: React.FC = () => {
  const {signOut, user} = useAuth()
  return (
    <DefaultLayout>
      <div>
        <nav>
          {
            user ? <Button onClick={() => {
                signOut()
              }}>{`Hi, ${user?.id}, sign out`}</Button>
              :
              <Link to={"/login"}>Login to discovery more</Link>
          }
        </nav>

        <div>
          <AppText>This is the website content</AppText>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default HomePage
