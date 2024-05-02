import React, { useCallback } from "react";
import { Form, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./CourseForm.form";



export function CourseForm() {

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
        },
    });

    const onDrop = useCallback((acceptedFile) => {
        const file = acceptedFile[0];
        formik.setFieldValue("miniature", URL.createObjectURL(file));
        formik.setFieldValue("file", file);
    });

    const { getRootProps, getInputProps} = useDropzone({
        accept: "image/jpeg, image/png",
        onDrop,
    });

    const getMiniature = () => {
        if (formik.values.file) {
            return formik.values.miniature;
        } 
        return null
    };

    return (
        <Form className="course-form" onSubmit={formik.handleSubmit}>
            <div className="" {...getRootProps()}>
                <input {...getInputProps()}/>
                {getMiniature() ? (
                 <Image size="small" src={getMiniature()} />
                ) : (
                    <div> Arrastra tu imagen hasta acá </div>  
                )}
            </div>

            <Form.Input name="title" type="text" label="Titulo del curso" placeholder="Titulo del curso"
                onChange={formik.handleChange}
                value={formik.values.title}
                error={formik.errors.title}
            />
            <Form.Input name="url" type="text" label="URL del curso" placeholder="URL del curso"
            onChange={formik.handleChange}
            value={formik.values.url}
            error={formik.errors.url}
            />
            <Form.TextArea name="description" label="Descripción del curso" placeholder="Descripción del curso"
                onChange={formik.handleChange}
                value={formik.values.description}
                error={formik.errors.description}
            />

            <Form.Group widths="equal">
                <Form.Input name="price" type="number" label="Precio del curso" placeholder="Precio del curso"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    error={formik.errors.price}
                />
                <Form.Input name="discount" type="number" label="Descuento del curso" placeholder="Descuento del curso"
                    onChange={formik.handleChange}
                    value={formik.values.discount}
                    error={formik.errors.discount}
                />
            </Form.Group>
            <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>Crear curso</Form.Button>
        </Form>
    );
}