import React, { FormEvent, useCallback, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import Select, { ValueType, ActionMeta } from 'react-select';

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

type MyOptionType = { label: string; value: number };

type OnChange = (
  value: ValueType<MyOptionType>,
  actionMeta: ActionMeta<MyOptionType>,
) => void;

const Dashboard: React.FC = () => {
  const { categoriesBalance, categoryNames } = useExtract();

  const [movement_type, setMovementType] = useState<
    'application' | 'redemption'
  >();
  const [product_name, setProductName] = useState('');
  const [movement_date, setMovementDate] = useState('');
  const [financial_institution, setFinancialInstitution] = useState('');
  const [movement_value, setMovementValue] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryName, setCategoryName] = useState<MyOptionType>({
    label: '',
    value: 0,
  });

  const handleFormSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      console.log(movement_type);
      console.log(financial_institution);
      console.log(product_name);
      console.log(amount);
      console.log(movement_value);
      console.log(movement_date);
      console.log(categoryName.label);
    },
    [
      movement_type,
      financial_institution,
      product_name,
      amount,
      movement_value,
      movement_date,
      categoryName,
    ],
  );

  const selectOptions = categoryNames.map((category, index) => {
    return { value: index, label: category.name } as MyOptionType;
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
          <form onSubmit={handleFormSubmit}>
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
                    required
                    value={financial_institution}
                    onChange={e => setFinancialInstitution(e.target.value)}
                    scale="large"
                    type="text"
                    name="financial-institution"
                    label="Instituição Financeira"
                    placeholder="Onde foi realizada a movimentação"
                  />
                  <Input
                    required
                    value={product_name}
                    onChange={e => setProductName(e.target.value)}
                    scale="small"
                    type="text"
                    name="product-name"
                    label="Ticker do ativo"
                    placeholder="Ex: ITSA4"
                  />
                  <Input
                    required
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    scale="small"
                    type="number"
                    name="amount"
                    label="Quantidade"
                    placeholder="Quantidade de cotas"
                  />
                  <Input
                    required
                    value={movement_value}
                    onChange={e => setMovementValue(e.target.value)}
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
                    value={movement_date}
                    onChange={e => setMovementDate(e.target.value)}
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
                      defaultValue={categoryName}
                      onChange={setCategoryName as OnChange}
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
                    value={financial_institution}
                    onChange={e => setFinancialInstitution(e.target.value)}
                    scale="large"
                    type="text"
                    name="financial-institution"
                    label="Instituição Financeira"
                    placeholder="Onde foi realizada a movimentação"
                  />
                  <Input
                    required
                    value={product_name}
                    onChange={e => setProductName(e.target.value)}
                    scale="small"
                    type="text"
                    name="product-name"
                    label="Ticker do ativo"
                    placeholder="Ex: ITSA4"
                  />
                  <Input
                    required
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    scale="small"
                    type="number"
                    name="amount"
                    label="Quantidade"
                    placeholder="Quantidade de cotas"
                  />
                  <Input
                    required
                    value={movement_value}
                    onChange={e => setMovementValue(e.target.value)}
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
                    value={movement_date}
                    onChange={e => setMovementDate(e.target.value)}
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
