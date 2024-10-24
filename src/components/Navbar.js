// src/components/Navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useCart } from '../context/CartContext'; // Importe o contexto
import '../style/Navbar.css'; // Certifique-se de ter o arquivo CSS atualizado
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from '../assets/logo.jpg'; // Caminho correto para a imagem

const Navbar = ({ user }) => {
  const { cartItems } = useCart(); // Obtenha os itens do carrinho do contexto
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('Usuário deslogado com sucesso');
        navigate('/'); // Redirecionar para a Home após o logout
      })
      .catch((error) => {
        console.error('Erro ao fazer logout', error);
      });
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container custom-navbar-container d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center logo-container">
          <img
            src={logo}
            alt="Logo"
            className="rounded-circle logo-image"
          />
          <Link className="navbar-brand custom-brand ms-2" to="/">
            Poder aos Pés
          </Link>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link custom-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link custom-link" to="/products">
                Produtos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link custom-link" to="/about">
                Sobre Nós
              </Link>
            </li>
            {user && user.email === 'adm@adm.com' ? (
              <li className="nav-item">
                <Link className="nav-link custom-link" to="/add-product">
                  Cadastrar Produtos
                </Link>
              </li>
            ) : (
              user && (
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/cart" aria-label="Carrinho">              
                    Carrinho
                    <FaShoppingCart size={20} />
                    {cartItems > 0 && (
                      <span className="badge custom-cart-badge">
                        {cartItems}
                      </span>
                    )}
                  </Link>
                </li>
              )
            )}
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link custom-link">
                    {user.displayName ? `Olá, ${user.displayName}` : 'Olá, Usuário'}
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn custom-btn-logout" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn custom-btn-login" to="/auth" aria-label="Login">
                  <FaUser className="me-1" /> Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
