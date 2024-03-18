import React, { useState } from 'react';
import { Tab } from 'semantic-ui-react';
import { RegisterForm, LoginForm } from "../../../components/Admin/Auth";
import { Icon } from "../../../assets/index.js";
import "./Auth.css";

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
        <>
        <section>
            <div className='container'>
                <div className='row d-flex justify-content-center'>

                    <div className='col-12 col-md-6'>
                        <Icon.LogoColor className="logo" />
                        <div>
                            <Tab panes={panes} activeIndex={activeIndex} onTabChange={(_, data) => setActiveIndex(data.activeIndex)}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}