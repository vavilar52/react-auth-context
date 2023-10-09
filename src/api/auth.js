export const getToken = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve("awesome.jwt.token");
    }, 2000);
  });
