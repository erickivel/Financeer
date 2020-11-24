import React from 'react';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { useExtract } from '../../hooks/extract';
import formatValue from '../../utils/formatValue';

import Header from '../../components/Header';

import { Container, TableContainer } from './styles';

const Extract: React.FC = () => {
  const { movements } = useExtract();

  return (
    <>
      <Header />
      <Container>
        <h1>Extrato</h1>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Quantidade</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Tipo</th>
                <th>Instituição Financeira</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {movements.map(movement => (
                <tr key={movement.id}>
                  <td>{movement.product_name}</td>
                  <td>{movement.amount}</td>
                  <td className={movement.movement_type}>
                    {formatValue(movement.movement_value)}
                  </td>
                  <td>{movement.category.name}</td>
                  <td className={movement.movement_type}>
                    {movement.movement_type === 'redemption'
                      ? 'Resgate'
                      : 'Aplicação'}
                  </td>
                  <td>{movement.financial_institution}</td>
                  <td>
                    {format(parseISO(movement.movement_date), 'dd/MM/yyyy', {
                      locale: ptBR,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Extract;
