"use client";

import GlobalInfoModal from "@/components/global-info.modal";
import AuthProvider from "@/providers/auth.provider";
import ReactQueryProvider from "@/providers/react-query-provider";
import { ReactNode, useState } from "react";
import { Toaster } from "sonner";

interface Props {
  children: ReactNode;
}

const Provider = (props: Props) => {
  //   ** --- props ---
  const { children } = props;

  // ** --- States ---
  const [activeItem, setActiveItem] = useState(1);

  return (
    <ReactQueryProvider>
      <Toaster />
      <AuthProvider>{children}</AuthProvider>

      <GlobalInfoModal
        showModal={activeItem == 0 ? true : false}
        setShowModal={setActiveItem}
      />
    </ReactQueryProvider>
  );
};

export default Provider;
