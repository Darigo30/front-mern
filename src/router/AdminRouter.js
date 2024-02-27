import React from "react";
import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "../layouts"
import { Auth } from "../pages/admin";

export function AdminRouter() {

  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
        <Route path="/admin/*" element={loadLayout(AdminLayout, Auth)} />
    </Routes>
  );
}