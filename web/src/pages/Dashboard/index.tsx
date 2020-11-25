import React, { useCallback, useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
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
  const {
    categoriesBalance,
    categoryNames,
    productNames,
    movements,
    createMovement,
  } = useExtract();

  const applicationFormRef = useRef<FormHandles>(null);
  const redemptionFormRef = useRef<FormHandles>(null);
  const [movement_type, setMovementType] = useState<
    'application' | 'redemption'
  >('application');

  const categoryApplicationSelectOptions = categoryNames.map(category => {
    return { value: category.id, label: category.name };
  });

  const productNameRedemptionSelectOptions = productNames.map(name => {
    return { value: name, label: name };
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
        applicationFormRef.current?.reset();
        redemptionFormRef.current?.reset();
        setMovementType(movementTypeToChange);
      }
    },
    [movement_type],
  );

  const handleApplicationFormSubmit = useCallback(
    (data: FormData) => {
      if (data.category_id === undefined) {
        alert('Preencha o campo "Categoria"');
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

  const handleRedemptionFormSubmit = useCallback(
    (data: FormData) => {
      if (data.product_name === '') {
        alert('Preencha o campo "Ticker do ativo"');
        return;
      }

      const movementWithEqualProductName = movements.find(
        movement => movement.product_name === data.product_name,
      );

      if (!movementWithEqualProductName) {
        alert('Esse ativo ainda não foi cadastrado!');
        return;
      }

      const category_id = movementWithEqualProductName.category.id;

      console.log({
        category_id,
        product_name: data.product_name.toUpperCase(),
        movement_date: new Date(data.movement_date),
        financial_institution: data.financial_institution,
        movement_value: Number(data.movement_value),
        movement_type,
        amount: Number(data.amount),
      });

      createMovement({
        category_id,
        product_name: data.product_name.toUpperCase(),
        movement_date: new Date(data.movement_date),
        financial_institution: data.financial_institution,
        movement_value: Number(data.movement_value),
        movement_type,
        amount: Number(data.amount),
      });
    },
    [createMovement, movement_type, movements],
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
                  <span className="category-name">{balance.category_name}</span>
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
            <Form
              ref={applicationFormRef}
              onSubmit={handleApplicationFormSubmit}
              initialData={{ category_id: 'id' }}
            >
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

                <div className="category-application">
                  Categoria
                  <Select
                    name="category_id"
                    options={categoryApplicationSelectOptions}
                    placeholder="Escolha uma"
                  />
                </div>
              </div>

              <button type="submit">Confirmar</button>
            </Form>
          )}
          {movement_type === 'redemption' && (
            <Form ref={redemptionFormRef} onSubmit={handleRedemptionFormSubmit}>
              <div className="movement_data">
                <Input
                  required
                  scale="large"
                  type="text"
                  name="financial_institution"
                  label="Instituição Financeira"
                  placeholder="Onde foi realizada a movimentação"
                />
                <div className="product-name-redemption">
                  Ticker do ativo
                  <Select
                    name="product_name"
                    options={productNameRedemptionSelectOptions}
                    placeholder="Escolha um"
                  />
                </div>
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
            </Form>
          )}
        </RegisterSection>
      </Container>
    </>
  );
};

export default Dashboard;
