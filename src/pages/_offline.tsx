import React from "react";
import Layout from "../components/template/Layout";

export default function offline() {
  return (
    <div className={``}>
      <Layout
        titulo="Perfil de usuario"
        subtitulo="Gerencie suas informações aqui!"
      >
        <div className="flex flex-col items-center justify-between">
          <h1>.............hmmm</h1>
          <h2>Parece que você está offile!</h2>
          <p>Esse app ainda não pode ser usado sem internet. Desculpe!</p>
        </div>
      </Layout>
    </div>
  );
}
