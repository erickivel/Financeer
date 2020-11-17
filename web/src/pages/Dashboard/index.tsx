import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import Select from 'react-select';

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

const Dashboard: React.FC = () => {
  const { categoriesBalance } = useExtract();

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

  const [movement_type, setMovementType] = useState<
    'application' | 'redemption'
  >();

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
          <form
            onSubmit={() => {
              console.log('enviou');
            }}
          >
            <div className="movement-type">
              <strong>Tipo de Movimentação</strong>

              <ButtonsMovementType buttonSelected={movement_type}>
                <button
                  type="button"
                  className="application-button"
                  onClick={() => setMovementType('application')}
                >
                  Aplicação
                </button>
                <button
                  type="button"
                  className="redemption-button"
                  onClick={() => setMovementType('redemption')}
                >
                  Resgate
                </button>
              </ButtonsMovementType>
            </div>
            {movement_type === 'application' && (
              <>
                <div className="movement_data">
                  <Input
                    scale="large"
                    type="text"
                    name="financial-institution"
                    label="Instituição Financeira"
                    placeholder="Onde foi realizada a movimentação"
                  />
                  <Input
                    scale="small"
                    type="text"
                    name="product-name"
                    label="Ticker do ativo"
                    placeholder="Ex: ITSA4"
                  />
                  <Input
                    scale="small"
                    type="number"
                    name="amount"
                    label="Quantidade"
                    placeholder="Quantidade de cotas"
                  />
                  <Input
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
                    scale="small"
                    type="date"
                    name="movement_date"
                    label="Data da compra"
                    placeholder="dd/mm/aaaa"
                  />

                  <div className="category">
                    Categoria
                    <Select
                      className="react-select-container"
                      classNamePrefix="react-select"
                      options={[
                        { value: 'test', label: 'Test' },
                        { value: 'test2', label: 'Test2' },
                        { value: 'test3', label: 'Test3' },
                        { value: 'test4', label: 'Test4' },
                      ]}
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
                    scale="large"
                    type="text"
                    name="financial-institution"
                    label="Instituição Financeira"
                    placeholder="Onde foi realizada a movimentação"
                  />
                  <Input
                    scale="small"
                    type="text"
                    name="product-name"
                    label="Ticker do ativo"
                    placeholder="Ex: ITSA4"
                  />
                  <Input
                    scale="small"
                    type="number"
                    name="amount"
                    label="Quantidade"
                    placeholder="Quantidade de cotas"
                  />
                  <Input
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
          </form>
        </RegisterSection>
      </Container>
    </>
  );
};

export default Dashboard;
