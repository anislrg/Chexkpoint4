const initialState = {
  id: null,
  email: "",
  role: "",
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...action.payload };
    case "LOGOUT":
      return { ...initialState };
    default:
      return state;
  }
};

export default userReducer;
export { initialState };
