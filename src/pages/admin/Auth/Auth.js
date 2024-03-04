import React, { useState } from 'react';
import { Tab } from 'semantic-ui-react';
import { Icon } from "../../../assets/index.js";

export function Auth() {
    
    const [activeIndex, setActiveIndex] = useState(1)
    const openLogin = () => setActiveIndex(0)

    const panes = [
        {
            menuItem: "Iniciar sesión",
            render: () => <Tab.Pane>Iniciar sesión</Tab.Pane>
        },
        {
            menuItem: "Registrarse",
            render: () => <Tab.Pane>Registrarse</Tab.Pane>
        }
    ]
    return (
        <div>
            <Icon.LogoWhite />
            <div>
                <Tab panes={panes} activeIndex={activeIndex} onTabChange={(_, data) => setActiveIndex(data.activeIndex)}/>
            </div>
        </div>
    )
}