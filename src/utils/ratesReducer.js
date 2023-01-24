export default function ratesReducer(state, action) {
  switch (action.type) {
    case '/first':
      return { ...state, first: action.payload };
    case '/second':
      return { ...state, second: action.payload };
    case '/third':
      return { ...state, third: action.payload };
    default:
      throw new Error();
  }
}