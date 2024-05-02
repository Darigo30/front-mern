import React, { useState, useEffect } from "react";
import { Loader, Pagination } from "semantic-ui-react";
import { size, map } from "lodash";
import { Course } from "../../../../api";
import { CourseItem } from "../CourseItem"


const courseCOntroller = new Course();

export function ListCourses() {
    const [courses, setCourses] = useState(false);
     const [page, setPage] = useState(1);
     const [pagination, setPagination] = useState();

    useEffect(() => {
        (async () => {
            try {
                const repsonse = await courseCOntroller.getCourses({page, limit: 1});
                setCourses(repsonse.docs);
                setPagination({
                    limit: repsonse.limit,
                    page: repsonse.page,
                    pages: repsonse.pages,
                    total: repsonse.total
                });
            } catch (error) {
                console.error(error);
            }
        })();
    }, [page]);


    const changePage = (_, data) => {
        console.log(data);
        setPage(data.activePage);
    }

    if(!courses) return <Loader active inline="centered" />;
    if(!size(courses) === 0) return "No hay cursos creados"

    return (
        <div>
            {map(courses, (course) => (
                <CourseItem key={course._id} course={course} />
            ))}

            <Pagination 
            totalPages={20} // colocar pagination.page cuando agregues mas cursos
            defaultActivePage={pagination.page}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            onPageChange={changePage}
            />
        </div>
    );
}