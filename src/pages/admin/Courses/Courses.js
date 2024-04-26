import React, { useState } from "react";
import { Tab, Button } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared";
import {ListCourses } from "../../../components/Admin/Course"
import "./courses.css";

export function Courses () {
  const [showModal, setShowModal] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  
  const panes = [
    {
      render: () => (
        <Tab.Pane attached={false}>
          <ListCourses />
        </Tab.Pane>
      )
    }
  ]

  return (
    <>
      <div className="courses__button mt-20 mr-16">
        <Button className="users__button" primary onClick={onOpenCloseModal}>
          Nuevo Curso
        </Button>
      </div>

      <Tab menu={{ secondary: true }} panes={panes} />

      <BasicModal
        show={showModal}
        close={onOpenCloseModal}
        title="Crear nuevo curso"
        >
          <p>Formilario para crear curso</p>
      </BasicModal>

    </>
  );
}
