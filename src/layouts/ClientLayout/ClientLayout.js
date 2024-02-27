import React from "react";

export function ClientLayout(props) {
    const {children} = props;
  return (
    <div>
        <h2>Está cargando el clinet layout</h2>
        {children}
    </div>
  );
}