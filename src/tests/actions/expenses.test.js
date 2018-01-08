import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

test('should setup remove expense action object', () => {
  const id = '123abc';
  const action = removeExpense({id : id});
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: id
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

test('should setup add expense action object with provided values', () => {
  const expense = expenses[0];
  const action = addExpense(expense);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expense
  });
});

test('should add expense to database and store', (done) => {
  const store = createMockStore({});
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

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore({});
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

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(defaultData);
    done();
  });
});

// test('should setup add expense action object with default values', () => {
//   const action = addExpense();

//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: {
//       description: '',
//       note: '',
//       amount: 0,
//       createdAt: 0,
//       id: expect.any(String)
//     }
//   });
// });

