export const checkFakeToken = (error: any) => {
  if (error.response.status === 511) {
    localStorage.removeItem("authToken");
  }
};
