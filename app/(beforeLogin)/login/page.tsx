import { redirect } from "next/navigation";
import LoginModal from "../_components/LoginModal";
import { auth, signIn } from "@/app/auth";

const Login = async () => {
  const session = await auth();

  if (!!session) {
    redirect("/");
  }

  const handleLogin = async () => {
    "use server";

    await signIn("kakao");
  };

  return <LoginModal handleLogin={handleLogin} />;
};

export default Login;
