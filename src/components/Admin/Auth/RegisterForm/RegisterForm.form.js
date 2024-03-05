import * as Yup from 'yup';

export function initialValues() {
    return {
        email: "",
        password: "",
        repeatPassword: "",
        condicion: false
    }
}
export function validationSchema() {
    return Yup.object({
        email: Yup.string().email("El email no es valido").required("Campo obligatorio"),
        password: Yup.string().required("Campo obligatorio"),
        repeatPassword: Yup.string().required("Campo obligatorio").oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
        condicion: Yup.bool().isTrue(true)
    })
}