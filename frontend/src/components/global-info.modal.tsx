"use client";

// ** Third Party Imports
import { Dispatch, SetStateAction, useRef } from "react";

// ** Components
import BaseModal from "@/components/base-modal";

// ** Component Props
interface ModalProps {
  showModal?: boolean;
  setShowModal: Dispatch<SetStateAction<number>>;
}

const GlobalInfoModal = (props: ModalProps) => {
  const { showModal, setShowModal } = props;
  const renderCount = useRef(1);

  // console.log("Login Modal render count is ", renderCount.current);
  renderCount.current += 1;

  return (
    <BaseModal
      setShowModal={() => setShowModal(-1)}
      showModal={showModal}
      className="max-w-md p-8"
    >
      this is where stories will come
    </BaseModal>
  );

  // ** Functions

  // async function onSubmit(values: LoginFormField) {
  //   login;
  // }
};

export default GlobalInfoModal;
