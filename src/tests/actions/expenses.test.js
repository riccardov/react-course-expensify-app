import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startAddExpense,
  addExpense,
  editExpense,
  startEditExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);
const uid = 'testUID';
const defaultAuthState = { auth: { uid } };

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
  const id = '123abc';
  const action = removeExpense({id : id});
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: id
  });
});

test('should remove expense from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id;

  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });
    return database.ref(`users/${uid}/expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });
});

test('should setup edit expense action object', () => {
  const id = '123abc';
  const updates = 'new note';
  const action = editExpense(id, { note: updates });

  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id,
    updates: {
      note: updates
    }
  })
});

test('should edit expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const updates = {
    note: 'new note'
  };
  const id = expenses[0].id;

  store.dispatch(startEditExpense(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    });

    return database.ref(`users/${uid}/expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual({
      amount: expenses[0].amount,
      createdAt:  expenses[0].createdAt,
      note: expenses[0].note,
      description: expenses[0].description,
      ...updates
    });
    done();
  });
});

test('should setup add expense action object with provided values', () => {
  const expense = expenses[0];
  const action = addExpense(expense);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expense
  });
});

test('should add expense to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description: 'this is a description',
    amount: 335,
    note: 'this is the note',
    createdAt: 4564564456
  }

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const defaultData = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  };

  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...defaultData
      }
    });

    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(defaultData);
    done();
  });
});

test('should setup expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});