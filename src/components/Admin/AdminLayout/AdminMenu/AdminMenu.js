import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./AdminMenu.css";

export function AdminMenu() {
  return (
    <Menu fluid vertical icon text className="">
        <Menu.Item as={Link} to="/admin/users">
            <Icon name="user outline" />
            Usuario
        </Menu.Item>
    </Menu>
  );
}