
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";
import { tagTypesList } from "../tag-types";


interface ErrorResponse {
  message: string;
  // Add other fields as needed
}


const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQuesyWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  // console.log(result);

  if(result?.error?.status===404){
    // toast.error(result.error.data.message) 
    const errorData = result.error.data as ErrorResponse; // Type assertion
    toast.error(errorData.message);
  }
  if(result?.error?.status===403){
    // toast.error(result.error.data.message) 
    const errorData = result.error.data as ErrorResponse; // Type assertion
    toast.error(errorData.message,{description:"old password is: student123"});
  }

  //!:create new refresh token handle unauthorized requests [Not Working]
  if (result?.error?.status === 401) {
    //* send refersh token
    console.log("Sending refresh token...");

    //! [Not Working]
    const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(
        setUser({
          user: user,
          token: data.data.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  // baseQuery:baseQuery,
  baseQuery: baseQuesyWithRefreshToken,
  tagTypes:tagTypesList,
  endpoints: () => ({}),
});
