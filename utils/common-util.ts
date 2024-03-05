//currencyRate
// const initialState = {
//   currency:
//        window.localStorage.getItem("currency"),

//       rate:
//         localStorage.getItem("currencyRate")
// };
export const getRate = (): any => {
  let value
  try {
      value = sessionStorage.getItem("currencyRate") || ""
    
  } catch (error) {}
  console.log(value)
  return value
}
//currency
export const getCurrency = (): any => {
  let value
  try {
      value = sessionStorage.getItem("currency")?.toString() || ""
  } catch (error) {}
  return value
}



