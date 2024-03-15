import React, { useState } from 'react';
import { Tab } from 'semantic-ui-react';
import { RegisterForm, LoginForm } from "../../../components/Admin/Auth";
import { Icon } from "../../../assets/index.js";

export function Auth() {
    
    const [activeIndex, setActiveIndex] = useState(0)
    const openLogin = () => setActiveIndex(0)

    const panes = [
        {
            menuItem: "Iniciar sesión",
            render: () => (
                <Tab.Pane>
                    <LoginForm />
                </Tab.Pane>
            )
        },
        {
            menuItem: "Registrarse",
            render: () => 
            <Tab.Pane>
                <RegisterForm openLogin={openLogin}/>
            </Tab.Pane>
        }
    ]
    return (
        <div>
            <Icon.LogoColor />
            <div>
                <Tab panes={panes} activeIndex={activeIndex} onTabChange={(_, data) => setActiveIndex(data.activeIndex)}/>
            </div>
        </div>
    )
}