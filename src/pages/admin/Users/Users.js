import React, { useState } from "react";
import { Tab, Button } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared";
import { UserForm } from "../../../components/Admin/Users";
import "./Users.css";

export function Users() {
  const [showModal, setShowModal] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const panes = [
    {
      menuItem: "Usuarios activos",
      render: () => (
        <Tab.Pane attached={false}>
          <h2>Usuarios activos</h2>
        </Tab.Pane>
      )
    },
    {
      menuItem: "Usuarios inactivos",
      render: () => (
        <Tab.Pane attached={false}>
          <h2>Usuarios inactivos</h2>
        </Tab.Pane>
      )
    }
  ]

  return (
    <>
      <div className="users">
        <div className="users__button">
          <Button
          className="users__button"
          primary onClick={onOpenCloseModal}>
            Nuevo Usuario
          </Button>
        </div>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

      <BasicModal
        show={showModal}
        close={onOpenCloseModal}
        title="Crear nuevo usuario"
        >
        <UserForm close={onOpenCloseModal}/>
      </BasicModal>
    </>
  );
}