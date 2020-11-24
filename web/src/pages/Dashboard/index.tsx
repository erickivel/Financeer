import React, { useCallback, useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { da } from 'date-fns/locale';
import Select from '../../components/Select';

import { useExtract } from '../../hooks/extract';

import Header from '../../components/Header';
import Input from '../../components/Input';

import formatValue from '../../utils/formatValue';

import {
  Container,
  InvestmentsInformations,
  CategoriesSection,
  CategoryItemContainer,
  CategoryItem,
  TotalContainer,
  RegisterSection,
  ButtonsMovementType,
} from './styles';

interface FormData {
  category_id: string;
  product_name: string;
  movement_date: string;
  financial_institution: string;
  movement_value: string;
  movement_type: 'application' | 'redemption';
  amount: string;
}

const Dashboard: React.FC = () => {
  const { categoriesBalance, categoryNames, createMovement } = useExtract();

  const formRef = useRef<FormHandles>(null);
  const [movement_type, setMovementType] = useState<
    'application' | 'redemption'
  >('application');

  const selectOptions = categoryNames.map(category => {
    return { value: category.id, label: category.name };
  });

  const chartData: ChartData = {
    labels: categoriesBalance.categoriesBalances.map(
      balance => balance.category_name,
    ),

    datasets: [
      {
        label: 'categorias',
        data: categoriesBalance.categoriesBalances.map(
          balance => balance.total_value_invested,
        ),

        backgroundColor: ['#3A49D0', '#3396CE', '#793BC9', '#2CA487'],
        borderWidth: 0,
      },
    ],
  };

  const switchForm = useCallback(
    (movementTypeToChange: 'application' | 'redemption') => {
      if (movement_type !== movementTypeToChange) {
        formRef.current?.reset();
        setMovementType(movementTypeToChange);
      }
    },
    [movement_type],
  );

  const handleSubmit = useCallback(
    (data: FormData) => {
      if (data.category_id === undefined) {
        alert('Preencha o campo de "Categoria"');
        return;
      }

      createMovement({
        category_id: data.category_id,
        product_name: data.product_name.toUpperCase(),
        movement_date: new Date(data.movement_date),
        financial_institution: data.financial_institution,
        movement_value: Number(data.movement_value),
        movement_type,
        amount: Number(data.amount),
      });
    },
    [createMovement, movement_type],
  );

  return (
    <>
      <Header />
      <Container>
        <InvestmentsInformations>
          <CategoriesSection>
            <div>
              <strong className="categories-title">Categorias</strong>
              <Doughnut
                data={chartData}
                width={320}
                height={320}
                options={{
                  maintainAspectRatio: false,
                  responsive: false,
                  legend: {
                    display: false,
                  },
                  cutoutPercentage: 65,
                  tooltips: {
                    displayColors: false,
                    bodyFontSize: 16,
                    bodyFontFamily: 'Poppins',
                    yPadding: 12,

                    callbacks: {
                      label: (tooltipItem, data: ChartData) => {
                        const thisData: number[] =
                          data.datasets && data.datasets[0].data
                            ? (data.datasets[0].data as number[])
                            : [0];

                        const tooltipValue =
                          tooltipItem.index !== undefined && thisData
                            ? thisData[tooltipItem.index]
                            : 0;

                        const dataLabel =
                          data.labels && tooltipItem.index !== undefined
                            ? data.labels[tooltipItem.index]
                            : '';

                        return (
                          `${dataLabel}: ${formatValue(tooltipValue)}` || ''
                        );
                      },
                    },
                  },
                }}
              />
            </div>
            <CategoryItemContainer>
              {categoriesBalance.categoriesBalances.map(balance => (
                <CategoryItem key={balance.category_name}>
                  <strong>{balance.category_name}</strong>
                  <section>
                    <div>
                      <small>Saldo na categoria</small>
                      <strong>
                        {formatValue(balance.total_value_invested)}
                      </strong>
                    </div>
                    <div>
                      <small>% carteira</small>
                      <strong>{balance.category_percentage}</strong>
                    </div>
                  </section>
                </CategoryItem>
              ))}
            </CategoryItemContainer>
          </CategoriesSection>
          <TotalContainer>
            <h2>Total Investido</h2>
            <strong>{formatValue(categoriesBalance.total)}</strong>
          </TotalContainer>
        </InvestmentsInformations>
        <RegisterSection>
          <h2>Registre uma movimentação</h2>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{ category_id: 'id' }}
          >
            <div className="movement-type">
              <strong>Tipo de Movimentação</strong>

              <ButtonsMovementType buttonSelected={movement_type}>
                <button
                  type="button"
                  className="application-button"
                  onClick={() => switchForm('application')}
                >
                  Aplicação
                </button>
                <button
                  type="button"
                  className="redemption-button"
                  onClick={() => switchForm('redemption')}
                >
                  Resgate
                </button>
              </ButtonsMovementType>
            </div>
            {movement_type === 'application' && (
              <>
                <div className="movement_data">
                  <Input
                    required
                    scale="large"
                    type="text"
                    name="financial_institution"
                    label="Instituição Financeira"
                    placeholder="Onde foi realizada a movimentação"
                  />
                  <Input
                    required
                    scale="small"
                    type="text"
                    name="product_name"
                    label="Ticker do ativo"
                    placeholder="Ex: ITSA4"
                  />
                  <Input
                    required
                    scale="small"
                    type="number"
                    name="amount"
                    label="Quantidade"
                    placeholder="Quantidade de cotas"
                  />
                  <Input
                    required
                    scale="small"
                    type="number"
                    min="0.01"
                    step="0.01"
                    pattern="^\d+(\.\d{2})? *?$"
                    name="movement_value"
                    label="Preço de compra"
                    placeholder="Ex: 125.40"
                  />
                  <Input
                    required
                    scale="small"
                    type="date"
                    name="movement_date"
                    label="Data da compra"
                    placeholder="dd/mm/aaaa"
                  />

                  <div className="category">
                    Categoria
                    <Select
                      name="category_id"
                      options={selectOptions}
                      placeholder="Escolha uma"
                    />
                  </div>
                </div>

                <button type="submit">Confirmar</button>
              </>
            )}
            {movement_type === 'redemption' && (
              <>
                <div className="movement_data">
                  <Input
                    required
                    scale="large"
                    type="text"
                    name="financial_institution"
                    label="Instituição Financeira"
                    placeholder="Onde foi realizada a movimentação"
                  />
                  <Input
                    required
                    scale="small"
                    type="text"
                    name="product_name"
                    label="Ticker do ativo"
                    placeholder="Ex: ITSA4"
                  />
                  <Input
                    required
                    scale="small"
                    type="number"
                    name="amount"
                    label="Quantidade"
                    placeholder="Quantidade de cotas"
                  />
                  <Input
                    required
                    type="number"
                    min="0.01"
                    step="0.01"
                    scale="small"
                    pattern="^\d+(\.\d{2})? *?$"
                    name="movement_value"
                    label="Preço de Venda"
                    placeholder="Ex: 125.40"
                  />
                  <Input
                    required
                    scale="small"
                    type="date"
                    name="movement_date"
                    label="Data da venda"
                    placeholder="dd/mm/aaaa"
                  />
                </div>

                <button type="submit">Confirmar</button>
              </>
            )}
          </Form>
        </RegisterSection>
      </Container>
    </>
  );
};

export default Dashboard;
