import { PropsWithChildren } from "react";
import S from "./styles.module.scss";

interface Props extends PropsWithChildren {
  onClose: () => void;
}
const Modal = ({ children, onClose }: Props) => {
  return (
    <>
      <div className={S.modalContainer}>
        {children}
        <div className={S.dimm} onClick={onClose} />
      </div>
    </>
  );
};

export default Modal;
