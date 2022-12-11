export const convertPromiseToArray = (promise: Promise<any>): Array<any> => {
  let result: Array<any> = [];
  promise.then((response) => {
    result = response;
  });
  return result;
};
