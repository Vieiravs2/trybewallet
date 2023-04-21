export const addUser = (email) => ({
  type: 'ADD_USER',
  email,
});

export const requestStarted = () => ({
  type: 'REQUEST_STARTED',
});

export const requestSucess = (payload) => ({
  type: 'REQUEST_SUCESS',
  coins: payload,
});

export const requestAPI = () => (dispatch) => {
  dispatch(requestStarted());
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => dispatch(requestSucess((data))));
};
