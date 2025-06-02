import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function LoginAuth({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("consultToken");
  console.log(token);

  return token ? <>{children}</> : <Navigate to={"/consult-login"} replace />;
}
