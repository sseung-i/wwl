import { PageWrapper } from "@/components/layout";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import LoginModal from "../_components/LoginModal";

const Login = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");

  if (accessToken && refreshToken) {
    redirect("/");
  }

  return (
    <LoginModal />
    // <PageWrapper>
    //   <div style={{ textAlign: "center" }}>
    //     {/* <LoginBtn type="kakao" /> */}
    //     <Link href="https://api.worklife.run/oauth/kakao" replace>
    //       kakao
    //     </Link>
    //   </div>
    // </PageWrapper>
  );
};

export default Login;
