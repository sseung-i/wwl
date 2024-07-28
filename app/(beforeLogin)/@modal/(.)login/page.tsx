import { auth, signIn } from "@/app/auth";
import LoginModal from "../../_components/LoginModal";
import { redirect } from "next/navigation";

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

// http://localhost:3000/api/auth/callback/kakao
