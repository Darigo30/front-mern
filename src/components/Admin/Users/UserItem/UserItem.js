import React from "react";
import { Image, Button, Icon, Confirm } from "semantic-ui-react";
import { image } from "../../../../assets";
import { ENV } from "../../../../utils";
import { BasicModal} from "../../../Shared";
import { UserForm } from "../UseForm";
import "./userItem.css";

export function UserItem (props) {
const { user, onReload } = props;

const [showModal, setShowModal] = React.useState(false);
const [titleModal, setTitleModal] = React.useState("");

const [showConfirm, setShowConfirm] = useState(false);
const [confirmMessage, setConfirmMessage] = useState("");
const [isDelete, setIsDelete] = useState(false);


const openCloseModal = () => setShowModal((prevState) => !prevState);
const onOpenCloseCOnfirm = () => setShowConfirm((prevState) => !prevState);

const openUpdateUser = () => {
    setTitleModal(`Actualizar usuario ${user.email}`);
    openCloseModal();
}
const onActivateDeactivate = () => {
    console.log("activar")
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
            <Button icon color={user.active ? "orange" : "teal"}>
                <Icon name={user.active ? "ban" : "check"}/>
            </Button>
            <Button icon color="red">
                <Icon name="trash" />
            </Button>
        </div>
    </div>
        <BasicModal show={showModal} close={openCloseModal} title={titleModal}>
            <UserForm close={openCloseModal} onReload={onReload} user ={user} />
        </BasicModal>
        
        <Confirm onOpen={showConfirm} onCancel={onOpenCloseCOnfirm} onConfirm={isDelete ? () => console.log("confirmar borrar") : "activodesactivo"} content={confirmMessage} size="mini" />
    </>
  );
}