import React, { useState, useEffect } from "react";
import { Loader, Pagination } from "semantic-ui-react";
import { size, map } from "lodash";
import { Course } from "../../../../api";
import { CourseItem } from "../CourseItem"


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


    if(!courses) return < active inline="centered" />;
    if(!size(courses)) return "No hay cursos creados"

    return (
        <div>
            {map(courses, (course) => (
                <CourseItem key={course._id} course={course} />
            ))}

            <Pagination 
            totalPages={20}
            defaultActivePage={1}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            onPageChange={(e, data) => console.log('pagina cambiada')}
            />
        </div>
    );
}