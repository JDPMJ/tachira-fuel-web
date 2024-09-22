"use client";
import React, { useContext, useEffect, useState } from "react";
import { signOut as firebaseSigninOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { AuthContext } from "@/contexts/AuthContext"; 

export default function Navbar() {
  const {isLogget} = useContext(AuthContext);
  const [userData, setUserData] = useState("");

  const handleUserOptions = () => {
    firebaseSigninOut(auth);
  };

  useEffect(() => {
    console.log("isLogget in Navbar: ", isLogget);
    onAuthStateChanged(auth, (user) => {
      setUserData(user!.email!);
    });
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Combustible Táchira</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/products">Reportes</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/users">Usuarios</a>
              </li>
            </ul>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {/*<img src={index.src} style={{ width: 40, marginRight: "10px" }} />*/}
                {userData}
              </button>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                <li><button className="dropdown-item" onClick={handleUserOptions}>Cerrar sesión</button></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}