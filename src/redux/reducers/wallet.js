const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_SUCESS':
    return {
      ...state,
      currencies: Object.entries(action.coins).map((element) => element[0])
        .filter((coins) => coins !== 'USDT'),
    };
  case 'ADD_EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  default:
    return state;
  }
};

export default wallet;
