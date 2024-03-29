import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { useFormik } from "formik";
import { Auth } from "../../../../api";
import { initialValues, validationSchema } from './RegisterForm.form';

const authController = new Auth();

export  function RegisterForm(props) {
    const { openLogin } = props;
    const [error, setError] = useState("")

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                console.log("este es el form", formValue)
                setError("")
                await authController.register(formValue);
                openLogin();
            } catch (error) {
                console.log(error)
                setError("Error al registrar el usuario")
            }
        }
    })
    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Input
            name="email"
            placeholder="Correo electrónico"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
            />
            <Form.Input
            name="password"
            type="password"
            placeholder="Contraseña"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
            />
            <Form.Input
            name="repeatPassword"
            type="password"
            placeholder="Repetir contraseña"
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            error={formik.errors.repeatPassword}
            />
            <Form.Checkbox
            name="condicion"
            label="Acepto los términos y condiciones"
            onChange={(_, data) => 
                formik.setFieldValue("condicion", data.checked)}
            checked={formik.values.condicion}
            error={formik.errors.condicion}
            />
            
            <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>Registrarse</Form.Button>
            <p className=''>{error}</p>
        </Form>
    )
}