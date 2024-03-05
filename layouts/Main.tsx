import Head from 'next/head';
import Header from 'components/header';
import { useRouter } from 'next/router';
import ReduxToastr from 'react-redux-toastr';
import { AppStore, makeStore } from 'store';
import { createContext, useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { useGetCurrencyQuery, useGetStoreConfigurationsQuery } from 'store/api';
import { getCurrency, getRate } from 'utils/common-util';

type LayoutType = {
  title?: string;
  children?: React.ReactNode;
}
export const DataContext = createContext<any>('');
export default ({ children, title = 'Next.js Ecommerce' }: LayoutType) => {
  const router = useRouter();
  const pathname = router.pathname;
  const [defaultRate, setDefaultrate] = useState('');
  const [selectedDefaultcurrency, setSelectedDefaultcurrency] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const {data:defaultCurrency} =  useGetStoreConfigurationsQuery([])
  const {data:currency} = useGetCurrencyQuery([])
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  useEffect(() => {
    getData();
  }, [defaultCurrency, currency]);
  const getData = async () => {
    let storeConfig = new Map(
      await defaultCurrency?.map((i: { configKey: any; configValue: any }) => [
        i.configKey,
        i.configValue,
      ])
    );
    let getCurrencys: any = storeConfig.get("CURRENCY");
    if (!getCurrency() || getCurrency()=="undefined"  ) {
      sessionStorage.setItem("currency", getCurrencys);
      setSelectedDefaultcurrency(getCurrencys)
    }
    if (!getRate() || getRate()=="undefined") {
      const result: any = await currency?.find(
        (county: any) => county.code == getCurrencys
      );
      sessionStorage.setItem("currencyRate", result?.rate);
      setDefaultrate(result?.rate)
    }
    const result: any = await currency?.find(
      (county: any) => county.code == getCurrency()
    );
    setSelectedCurrency(result)
  };

  

  return (

    <Provider store={storeRef.current}>
      <DataContext.Provider value={{defaultRate,selectedDefaultcurrency,selectedCurrency}}>
      <div className="app-main">
      <Head>
        <title>{ title }</title>
      </Head>

      <Header />

      <main className={(pathname !== '/' ? 'main-page' : '')}>
        { children }
        <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick
          />
      </main>
    </div>
      </DataContext.Provider>

    </Provider>

  )
}