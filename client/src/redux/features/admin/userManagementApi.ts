
import { TQueryParam } from "../../../constants/global";
import { TResponseRedux, TStudent } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   
    addStudent: builder.mutation({
      query: (data) => ({
        url: `/users/create-student`,
        method: "POST",
        body: data,
      }),
    }),

    getAllStudents: builder.query({
      query: (args) => {
  
        const params =new URLSearchParams();
        if (args) {
          args.forEach((item:TQueryParam)=> {
            params.append(item.name, item.value as string)
          })
        }
  
        return {
          url: `/students`,
          method: "GET",
          params:params
        };
      },
  
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        // console.log(response)
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),


  }),

 



});

export const { useAddStudentMutation, useGetAllStudentsQuery  } =
userManagementApi;
