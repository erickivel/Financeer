import React, { useEffect, useState } from 'react';
import { FiPlus, FiFileText, FiPieChart } from 'react-icons/fi';

import { Link, useLocation } from 'react-router-dom';

import { Container } from './styles';

import LogoImg from '../../assets/logo.svg';

const Header: React.FC = () => {
  const [buttonSelected, setButtonSelected] = useState('');

  const { pathname } = useLocation();

  useEffect(() => {
    const location = pathname.slice(1);

    setButtonSelected(location);
  }, [pathname]);

  return (
    <Container selected={buttonSelected}>
      <header>
        <Link to="/adicionar">
          <img src={LogoImg} alt="Financeer" />
        </Link>
        <nav>
          <Link to="/adicionar" className="adicionar">
            <FiPlus size={20} color="#F4EDE8" strokeWidth={1.5} />
            Adicionar
          </Link>
          <Link to="/extrato" className="extrato">
            <FiFileText size={20} color="#F4EDE8" strokeWidth={1.5} />
            Extrato
          </Link>
          <Link to="/meus-produtos" className="produtos">
            <FiPieChart size={20} color="#F4EDE8" strokeWidth={1.5} />
            Meus Produtos
          </Link>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
