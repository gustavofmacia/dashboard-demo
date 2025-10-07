import { LoginButton } from "@/components/Sidebar/Login/LoginButton";
import { getServerAuthSession } from "@/lib/auth";

export const LoginButonContainer = async () => {
  const session = await getServerAuthSession();

  const isAuthenticated = !!session;

  return <LoginButton isAuthenticated={isAuthenticated} />;
};
