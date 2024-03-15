import React from 'react';
import { image } from "../../assets/index.js";
import { AdminMenu } from "../../components/Admin/AdminLayout/AdminMenu/";
import "./AdminLayout.css";

export function AdminLayout(props) {
    const {children} = props;

  return (
    <div className='section'>
      <div className='admin-layout'>
        <div className='row'>
          <div className='col-12 col-md-2 pr-0'>
              <div className='admin-layout__left'>
                <img src={image.logoCato} alt="Logo Cato"/>
                <AdminMenu />
              </div>
          </div>
          <div className='col-12 col-md-10 pl-0'>
              <div className='admin-layout__right-header d-flex justify-content-end pl-0'>
                <span>logout</span>
              </div>
              <div className='admin-layout__right-content'>{children}</div>
          </div>
        </div>
      </div>
    </div>
    
  );
}