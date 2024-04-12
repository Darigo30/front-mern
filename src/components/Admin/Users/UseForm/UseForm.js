import React, { useCallback } from 'react';
import { Form, Image } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { useDropzone } from "react-dropzone";
import { image } from "../../../../assets";
import { User } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { initialValues, validationSchema } from "./UserForm.form";
import { ENV } from "../../../../utils";
import "./UserForm.css";

const userController = new User();

export function UserForm(props) {
    const { close, onReload, user } = props;
    
    const { accessToken } = useAuth();

    console.log("user en UseForm", user)

    const formik = useFormik({
        initialValues: initialValues(user),
        validationSchema: validationSchema(user),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            console.log(formValue,"formValue");
            try {
                if(!user) {
                await userController.createUser(accessToken, formValue);
                } else {
                    console.log("UPDATE USER")
                    console.log("formValue en actualizar", formValue);
                    await userController.updateUser(accessToken, user._id, formValue);
                }
                onReload();
                close();
            } catch (error) {
                close();
               console.log("error", error);
            }
        }
    });


    const onDrop = useCallback(acceptedFiles => {
      const file = acceptedFiles[0];
      console.log(file,'file');
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
        } else if(formik.values.noAvatar) {
            return `${ENV.BASE_PATH}/${formik.values.avatar}`;
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