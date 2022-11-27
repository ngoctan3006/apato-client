import React from "react";
import {AppHTMLProps} from "../../utils/typed";

export type FontType = "bold" | "regular" | "semi"

interface AppTextProps extends AppHTMLProps<HTMLParagraphElement> {
  fontType?: FontType
}

const AppText: React.FC<AppTextProps> = (props) => {
  const {fontType} = props
  return <p
    style={{
      fontFamily: fontType === "bold" ? "bold" : fontType === "semi" ? "semibold" : "regular"
    }} {...props}/>
}

export default AppText
