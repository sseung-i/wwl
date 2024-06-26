import Swal from "sweetalert2";
import S from "./styles.module.scss";

const Toast = () => {
  return Swal.mixin({
    toast: true,
    position: "bottom",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
      popup: S.toastContainer,
      icon: S.toastIcon,
      title: S.toastTitle,
      timerProgressBar: S.progressBar,
    },
    showClass: {
      popup: `${S.animated} ${S.fast} ${S.fadeIn}`,
      icon: "",
    },
    hideClass: {
      popup: `${S.animated} ${S.fast} ${S.fadeOut}`,
      icon: "",
    },
  });
};

export default Toast;
