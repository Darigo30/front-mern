import React, { useCallback } from 'react';
import { Form, Image } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { useDropzone } from "react-dropzone";
import { image } from "../../../../assets";
import { initialValues, validationSchema } from "./UserForm.form";
import "./UserForm.css";

export function UserForm(props) {
    const { close, onReload, user } = props;

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                console.log(formValue);
            } catch (error) {
                console.error(error);
            }
        }
    });


    const onDrop = useCallback(acceptedFiles => {
      const file = acceptedFiles[0];
        formik.setFieldValue("avatar", URL.createObjectURL(file));
        formik.setFieldValue("fileAvatar", file);
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        onDrop,
    });

    const getAvatar = () => {
        if(formik.values.avatar) {
            return formik.values.avatar;
        }
        return image.noAvatar;
    };

    return (
        <Form className='user-form' onSubmit={formik.handleSubmit}>
            <div className='user-form__avatardiv' {...getRootProps()}>
                <input {...getInputProps()} />
                <Image className='user-form__avatar' avatar size="small" src={getAvatar()} />
            </div>

            <Form.Group widths='equal'>
                <Form.Input name='firstname'placeholder='Nombre'
                onChange={formik.handleChange}
                value={formik.values.firstname}
                error={formik.errors.firstname}
                />
                <Form.Input name='lastname' placeholder='Apellidos'
                 onChange={formik.handleChange}
                 value={formik.values.lastname}
                 error={formik.errors.lastname}
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input name='email' placeholder='Correo electrónico'
                 onChange={formik.handleChange}
                 value={formik.values.email}
                 error={formik.errors.email}
                 />
                <Form.Dropdown
                    placeholder='Selecciona un rol'
                    options={roleOptions}
                    selection
                    onChange={(_, data) => formik.setFieldValue("role", data.value)}
                    value={formik.values.role}
                    error={formik.errors.role}
                />
            </Form.Group>
                <Form.Input type='password' name='password' placeholder='Contraseña'
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.errors.password}
                />
            <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
                {user ? 'Actualizar usuario' : 'Crear usuario'}
            </Form.Button>
        </Form>
    )
}

const roleOptions = [
    {
        key: "user",
        text: "Usuario",
        value: "user"
    },
    {
        key: "admin",
        text: "Administrador",
        value: "admin"
    }
]