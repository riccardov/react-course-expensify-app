import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  login,
  logout,
  startLogin,
  startLogout
} from '../../actions/auth';
import database from '../../firebase/firebase';

test('should generate login action object', () => {
  const uid = 'abc123';
  const action = login(uid);

  expect(action).toEqual({
    type: 'LOGIN',
    uid: 'abc123'
  });
});

test('should generate logout action object', () => {
  const action = logout();

  expect(action).toEqual({
    type: 'LOGOUT'
  });
});