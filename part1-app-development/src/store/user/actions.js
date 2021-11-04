export const setUser = (user) => ({
  type: "USER/SET_USER",
  payload: user,
});

export const login = (payload) => ({
  type: "USER/LOGIN",
  payload,
});

export const logout = () => ({ type: "USER/LOGOUT" });
