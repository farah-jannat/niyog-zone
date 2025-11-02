"use client";

import { useAuthUser } from "@/features/auth/queries/user-auth-user.query";
import { ReactNode } from "react";

const AuthProvider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  //   const renderCount = useRef(1);

  useAuthUser();

  // console.log("auth provider render count is ", renderCount.current);
  //   renderCount.current += 1;

  return <div>{children}</div>;
};

export default AuthProvider;
