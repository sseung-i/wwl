import LinkBtn from "@/components/common/LinkBtn";
import S from "./styles.module.scss"

const Banner = () => {
    return ( <div className={S.bannerContainer}>
        <h2>슬랙티콘을<br />만들고 공유해보세요!</h2>
        <LinkBtn arrow name="Login" href="/login" className={S.LinkBtn}/>
    </div> );
}
 
export default Banner;