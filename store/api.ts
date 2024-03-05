import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { ICart } from 'types';
const getStoreCode = process.env.STORE_CODE || 15


// Define a service using a base URL and expected endpoints
export const alphaCoreAPI = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl:  'http://15.206.195.194:8081/'+'api/',
    prepareHeaders: async (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      headers.set('X-Tenant-Code', 'demo')
    }
    return headers;
},
  }),
  endpoints: builder => ({
    getAccount: builder.mutation({
      query: () => {
        return {
          url: 'account',
          method: 'GET'
        };
      },
    }),
    addToCart: builder.mutation({
      query: cartItem => {
        return {
          url: 'carts',
          method: 'POST',
          body: cartItem,
          headers: {
            'Content-type': 'application/json',
            observe: 'response' 
          },
        };
      },
    }),
    getStoreImages: builder.query({
      query: (catCode) => {
        return {
          url:'open/storeItems',
          method: 'GET',
          params:{catCode:catCode,size:1000,storeCode:"talemein"}
        };
      }
    }),
    getStoreItembyid: builder.query({
      query: (id) => {
        console.log(id)
        return {
          url:'open/storeItem',
          method: 'GET',
          params:{itemCode:id,storeCode:"talemein"}
        };
      },
    }),
    getCurrency: builder.query({
      query: () => {
        return {
          url:'getCurrency',
          method: 'GET',
          params:{storeCode:getStoreCode}
        };
      },
    }),
    getCartItem: builder.query({
      query: (orderId) => {
        return {
          url:'checkout',
          method: 'GET',
          params:{orderId:orderId,storeCode:getStoreCode}
        };
      },
    }),
    deleteCartItem: builder.mutation({
      query: (item:ICart) => {
        return {
          url:'open/clearCart',
          method: 'DELETE',
          params:{orderID:item.orderID,storeCode:getStoreCode,id:item.id,itemCode:item.itemCode}
        };
      },
    }),
    getbannersBasedOnStore: builder.query({
      query: () => {
        return {
          url: 'bannersBasedOnStore/' + getStoreCode,
          method: 'GET',
        };
      },
    }),
    getcategoriesBasedOnStore: builder.query({
      query: () => {
        return {
          url: 'categoriesBasedOnStore/' + getStoreCode,
          method: 'GET',
        };
      },
    }),
    getstoreItems: builder.query({
      query: () => {
        return {
          url: 'open/storeItems',
          method: 'GET',
          params: { storeCode: getStoreCode, size: 1000 }
        };
      },
    }),
    getstoreItem: builder.query({
      query: (itemCode) => {
        return {
          url: 'open/storeItem',
          method: 'GET',
          params: { storeCode: getStoreCode,itemCode:itemCode }
        };
      },
    }),
    getSubcategory: builder.query({
      query: (catCode) => {
        return {
          url: 'open/storeItems',
          method: 'GET',
          params: { storeCode: getStoreCode,catCode:catCode }
        };
      },
    }),
    getStoreConfigurations: builder.query({
      query: () => {
        return {
          url: 'open/storeConfigurations',
          method: 'GET',
          params: { storeCode: getStoreCode,configurationCode:'STORE_CONFIGURATION' }
        };
      },
    }),
    postUser: builder.mutation({
      query:  user => {
          return {
            url: 'userTest',
            method: 'POST',
            body: user
          };
      
      },
    }),

  }),
});

export const {
    useGetAccountMutation,
    useAddToCartMutation,
    useLazyGetCartItemQuery,
    useGetStoreImagesQuery,
    useGetbannersBasedOnStoreQuery,
    useGetStoreItembyidQuery,
    useGetCurrencyQuery,
    usePostUserMutation,
    useGetcategoriesBasedOnStoreQuery,
    useGetstoreItemsQuery,
    useGetstoreItemQuery,
    useGetSubcategoryQuery,
    useDeleteCartItemMutation,
    useGetStoreConfigurationsQuery} = alphaCoreAPI;