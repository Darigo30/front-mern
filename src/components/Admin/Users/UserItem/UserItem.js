import React, { useState } from "react";
import { Image, Button, Icon, Confirm } from "semantic-ui-react";
import { image } from "../../../../assets";
import { ENV } from "../../../../utils";
import { BasicModal} from "../../../Shared";
import { User } from "../../../../api";
import { useAuth } from "../../../../hooks";    
import { UserForm } from "../UseForm";
import "./userItem.css";

const userController = new User();

export function UserItem (props) {
const { user, onReload } = props;
const { accessToken } = useAuth();

const [showModal, setShowModal] = useState(false);
const [titleModal, setTitleModal] = useState("");

const [showConfirm, setShowConfirm] = useState(false);
const [confirmMessage, setConfirmMessage] = useState("");
const [isDelete, setIsDelete] = useState(false);


const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
const onOpenCloseCOnfirm = () => setShowConfirm((prevState) => !prevState);

const openUpdateUser = () => {
    setTitleModal(`Actualizar usuario ${user.email}`);
    onOpenCloseModal();
}


const openDesactivateConfirm = () => {
    setIsDelete(false);
    setConfirmMessage(
        user.active
        ? `Desactivar usuario ${user.email}`
        : `Activar usuario ${user.email}`
    );
    onOpenCloseCOnfirm();
}

const onActivateDeactivate = async () => {
    try {
        await userController.updateUser(accessToken, user._id,{ 
            active: !user.active 
        });
        onReload();
        onOpenCloseCOnfirm();
    } catch (error) {
        console.error(error)
    }
}


const openDeleteConfirm = () => {
    setIsDelete(true);
    setConfirmMessage(`Eliminar usuario ${user.email}`);
    onOpenCloseCOnfirm();
}


const onDelete = async () => {
    try {
        await userController.deleteUser(accessToken, user._id);
        onReload();
        onOpenCloseCOnfirm();
    } catch (error) {
        console.error(error)
    }
}

  return (
    <>
    <div className="row userItem">
        <div className="col-4">
            <span>{user.firstname}</span> <span>{user.lastname}</span>
            <p className="mt-5">{user.email}</p>
        </div>
        <div className="col-4 d-flex justify-content-center">
            <p>{user.role}</p>
        </div>
        <div className="col-4 d-flex justify-content-center">
            <Button icon primary onClick={openUpdateUser}>
                <Icon name="pencil" />
            </Button>
            <Button icon color={user.active ? "orange" : "teal"} onClick={openDesactivateConfirm}>
                <Icon name={user.active ? "ban" : "check"}/>
            </Button>
            <Button icon color="red" onClick={openDeleteConfirm}>
                <Icon name="trash" />
            </Button>
        </div>
    </div>
        <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
            <UserForm close={onOpenCloseModal} onReload={onReload} user ={user} />
        </BasicModal>
        
        <Confirm
        open={showConfirm}
        onCancel={onOpenCloseCOnfirm}
        onConfirm={isDelete ? onDelete : onActivateDeactivate } content={confirmMessage} size="mini" />
    </>
  );
}