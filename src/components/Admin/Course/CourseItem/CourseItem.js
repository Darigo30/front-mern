import React from 'react';
import { Image, Button, Icon, Confirm } from 'semantic-ui-react';
import { ENV } from "../../../../utils";
import "./CourseItem.css";

export function CourseItem(props) {
const { course } = props;

  return (
    <>
      <div className='course-item row'>
        <div className='course-item__item col-12 d-flex justify-content-between align-items-center'>
            <div className='col-8 d-flex justify-content-start'>
                <Image src={`${ENV.BASE_PATH}/${course.miniature}`}/>
                <h3 className='ml-12'>{course.title}</h3>
            </div>
   
            <div className='col-4 d-flex justify-content-end'>
                <Button icon as="a" href={course.url} color='yellow'>
                    <Icon name='eye' />
                </Button>
                <Button icon primary>
                    <Icon name='pencil' />
                </Button>
                <Button icon color='red'>
                    <Icon name='trash' />
                </Button>
            </div>
        </div>
      </div>
    </>
  );
}