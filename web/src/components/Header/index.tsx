import React, { useState } from 'react';
import { FiPlus, FiFileText, FiPieChart } from 'react-icons/fi';

import { Link } from 'react-router-dom';

import { Container } from './styles';

import LogoImg from '../../assets/logo.svg';

const Header: React.FC = () => {
  const [buttonSelected, setButtonSelected] = useState('adicionar');

  return (
    <Container selected={buttonSelected}>
      <header>
        <Link to="/">
          <img src={LogoImg} alt="Financeer" />
        </Link>
        <nav>
          <Link
            to="/"
            className="adicionar"
            onClick={() => setButtonSelected('adicionar')}
          >
            <FiPlus size={20} color="#F4EDE8" strokeWidth={1.5} />
            Adicionar
          </Link>
          <Link
            to="/extrato"
            className="extrato"
            onClick={() => setButtonSelected('extrato')}
          >
            <FiFileText size={20} color="#F4EDE8" strokeWidth={1.5} />
            Extrato
          </Link>
          <Link
            to="/meus-produtos"
            className="produtos"
            onClick={() => setButtonSelected('produtos')}
          >
            <FiPieChart size={20} color="#F4EDE8" strokeWidth={1.5} />
            Meus Produtos
          </Link>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
