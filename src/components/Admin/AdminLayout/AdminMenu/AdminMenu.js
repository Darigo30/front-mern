import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import "./AdminMenu.css";

export function AdminMenu() {
  const { pathname } = useLocation();
  const { 
    user: { role },
   } = useAuth();
  const isAdmin = role === "admin"; //TODO: AGREGAR EL SI ES ADMIN
  const isCurrentPath = (path) => {
      if(pathname === path) {
          return true;
      }
      return false;
  }
  return (
    <Menu fluid vertical icon text className="">
      {/* TODO: AGREGAR EL SI ES ADMIN */}
        <Menu.Item className="menuvertical_menu" as={Link} to="/admin/users" active={isCurrentPath("/admin/users")}>
          <Icon className="menuvertical_menu-ico" name="user outline" />
          Usuario
        </Menu.Item>
        <Menu.Item className="menuvertical_menu" as={Link} to="/admin/courses" active={isCurrentPath("/admin/courses")}>
            <Icon className="menuvertical_menu-ico" name="computer" />
            Cursos
        </Menu.Item>
        <Menu.Item className="menuvertical_menu" as={Link} to="/admin/newsletter" active={isCurrentPath("/admin/newsletter")}>
            <Icon className="menuvertical_menu-ico" name="mail" />
            Newsletter
        </Menu.Item>
        <Menu.Item className="menuvertical_menu" as={Link} to="/admin/blog" active={isCurrentPath("/admin/blog")}>
            <Icon className="menuvertical_menu-ico" name="comment alternate outline" />
            Blog
        </Menu.Item>
    </Menu>

  );
}