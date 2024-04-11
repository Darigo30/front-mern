import React from "react";
import { Image, Button, Icon, Confirm } from "semantic-ui-react";
import { image } from "../../../../assets";
import "./userItem.css";

export function UserItem (props) {
const { user } = props;
console.log(user)

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
                <Button icon primary>
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
    </>
  );
}