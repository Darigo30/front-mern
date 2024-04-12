import React, { useState } from "react";
import { Tab, Button } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared";
import { UserForm, ListUsers } from "../../../components/Admin/Users";
import "./Users.css";
import { set } from "lodash";

export function Users() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      menuItem: "Usuarios activos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers usersActive={true} reload={reload} onReload={onReload}/>
        </Tab.Pane>
      )
    },
    {
      menuItem: "Usuarios inactivos",
      render: () => (
        <Tab.Pane attached={false}>
         <ListUsers usersActive={false} reload={reload} onReload={onReload}/>
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
        <UserForm close={onOpenCloseModal} onReload={onReload}/>
      </BasicModal>
    </>
  );
}