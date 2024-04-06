import { PropsWithChildren } from "react";
import S from "./styles.module.scss"

const Center = ({children}:PropsWithChildren) => {
    return ( <main className={S.centerContainer}>{children}</main> );
}
 
export default Center;