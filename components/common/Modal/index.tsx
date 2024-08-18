import { PropsWithChildren } from "react";
import S from "./styles.module.scss";
import Swal, { SweetAlertInput } from "sweetalert2";

interface Props extends PropsWithChildren {
  onClose: () => void;
}
const PageModal = ({ children, onClose }: Props) => {
  return (
    <>
      <div className={S.pageModalContainer}>{children}</div>
      <div className={S.dimm} onClick={onClose} />
    </>
  );
};

interface CommonModalProps {
  title: string;
  content?: string;
  confirmBtn?: string;
  onConfirm?: () => void;
}

interface ConfirmModalProps extends CommonModalProps {
  cancelBtn?: string;
  onCancel?: () => void;
}

interface ImageModalProps extends CommonModalProps {
  imageUrl: string;
  imageHeight?: number;
}

interface InputModalProps extends CommonModalProps {
  inputLabel: string;
  inputPlaceholder: string;
  maxLength?: string;
  cancelBtn?: string;
  onCancel?: () => void;
}

export const Modal = {
  alert: ({
    title,
    content,
    confirmBtn = "확인",
    onConfirm = () => {},
  }: CommonModalProps) => {
    Swal.fire({
      title,
      text: content,
      confirmButtonText: confirmBtn,
      customClass: {
        container: S.container,
        popup: S.popup,
        title: S.title,
        htmlContainer: S.content,
        actions: S.btnWrap,
        confirmButton: S.confirmBtn,
      },
    }).then((result) => {
      if (result.isConfirmed) onConfirm();
    });
  },
  confirm: ({
    title,
    content,
    confirmBtn = "확인",
    cancelBtn = "취소",
    onConfirm = () => {},
    onCancel = () => {},
  }: ConfirmModalProps) => {
    Swal.fire({
      title,
      text: content,
      showCancelButton: true,
      confirmButtonText: confirmBtn,
      cancelButtonText: cancelBtn,
      customClass: {
        container: S.container,
        popup: S.popup,
        title: S.title,
        htmlContainer: S.content,
        actions: S.btnWrap,
        confirmButton: S.confirmBtn,
        cancelButton: S.cancelBtn,
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        onCancel();
      }
    });
  },
  image: ({
    title,
    imageUrl,
    imageHeight,
    confirmBtn = "확인",
    onConfirm = () => {},
  }: ImageModalProps) => {
    Swal.fire({
      title,
      imageUrl,
      imageHeight,
      imageAlt: "gif image",
      confirmButtonText: confirmBtn,
      customClass: {
        container: S.container,
        popup: S.popup,
        title: S.title,
        image: S.image,
        actions: S.btnWrap,
        confirmButton: S.confirmBtn,
      },
    }).then((result) => {
      if (result.isConfirmed) onConfirm();
    });
  },
  txtInput: ({
    title,
    inputLabel,
    inputPlaceholder,
    maxLength,
    confirmBtn = "확인",
    cancelBtn = "취소",
  }: InputModalProps) => {
    return Swal.fire({
      title: title,
      input: "text",
      inputLabel: inputLabel,
      inputPlaceholder: inputPlaceholder,
      inputAttributes: {
        maxlength: maxLength || "",
        autocapitalize: "off",
        autocorrect: "off",
      },
      confirmButtonText: confirmBtn,
      cancelButtonText: cancelBtn,
      customClass: {
        container: S.container,
        popup: S.popup,
        title: S.title,
        input: S.input,
        actions: S.btnWrap,
        confirmButton: S.confirmBtn,
        cancelButton: S.cancelBtn,
      },
    }).then((result) => {
      return result.isConfirmed ? result.value : "";
    });
  },
};

export default PageModal;
