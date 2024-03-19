import * as Yup from "yup";

export function initialValues() {
  return {
    avatar: "",
    fileAvatar: "",
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    password: "",
  };
}

export function validationSchema() {
  return Yup.object({
    firstname: Yup.string().required(true),
    lastname: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    role: Yup.string().required(true),
    password: Yup.string().required(true),
  });
}