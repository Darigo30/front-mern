import React, { useState, useEffect } from "react";
import { Course } from "../../../../api";


const courseCOntroller = new Course();

export function ListCourses() {
    const [courses, setCourses] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const repsonse = await courseCOntroller.getCourses();
                setCourses(repsonse.docs);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (
        <div>
            <p>Lista de cursos</p>
        </div>
    );
}