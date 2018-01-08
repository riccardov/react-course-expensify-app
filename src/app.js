import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import validator from 'validator';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense, removeExpense, editExpense } from './actions/expenses';
import { setTextFilter, setStartDate, setEndDate, sortByDate, sortByAmount } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import expensesReducer from './reducers/expenses';
import filtersReducer from './reducers/filters';
import 'normalize.css/normalize.css'
import './styles/style.scss';
import 'react-dates/lib/css/_datepicker.css';
import './firebase/firebase';

const store = configureStore();

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
});

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));