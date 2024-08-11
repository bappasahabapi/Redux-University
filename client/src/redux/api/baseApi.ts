
import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const baseQuery =fetchBaseQuery({
  baseUrl:'http://localhost:5000/api/v1/',
  credentials:'include',
  prepareHeaders:(headers, api)=>{

    const token =(api.getState()as RootState).auth.token;
    if(token){
      headers.set('authorization',`${token}`);
    }
    return headers;
  }
})

const baseQuesyWithRefreshToken =async(args,api, extraOptions)=>{
  const result = await baseQuery(args,api,extraOptions);
  console.log(result)
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  // baseQuery:baseQuery,
  baseQuery:baseQuesyWithRefreshToken,
  endpoints: () => ({}),
  
});