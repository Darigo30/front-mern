import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import { User } from "../../../../api";
import { useAuth } from "../../../../hooks"
import { UserItem } from "../UserItem"

const userController = new User();

export function ListUsers(props) {
    const {usersActive, reload} = props;
    const [users, setUsers] = useState(null)
    const { accessToken } = useAuth();

    console.log("users ListUsers", users)

    useEffect(() => {
        (async () => {
            try {
                const response = await userController.getUsers(
                    accessToken,
                    usersActive
                );
                console.log("response en ListUsers", response)
                setUsers(response)
            } catch (error) {   
                console.error(error)
            }
        })()
    }, [usersActive, reload])

    if (!users) return <Loader active>Cargando Usuarios</Loader>
    if (size(users) === 0) return <h2>No hay usuarios</h2> 

    return map(users, (user) => <UserItem key={user._id} user={user} />)
}