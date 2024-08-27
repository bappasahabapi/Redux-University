import { TQueryParam } from "../../../constants/global";
import { TResponseRedux } from "../../../types";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { baseApi } from "../../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemester: builder.query({
      // query: () => ({
      //   url: `/academic-semesters`,
      //   method: "GET",
      //   params:{name:'Fall'}
      // }),
      query: (args) => {

        // params.append(args[0].name, args[0].value )
        // params.append("name", "Fall" )
        // params.append(args[0].name, args[0].value )
        const params =new URLSearchParams();
        if (args) {
          args.forEach((item:TQueryParam)=> {
            params.append(item.name, item.value as string)
          })
        }


        return {
          url: `/academic-semesters`,
          method: "GET",
          params:params
          // params: { name: "Fall" },
        };
      },

      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        // console.log(response)
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: `/academic-semesters/create-academic-semester`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllSemesterQuery, useAddAcademicSemesterMutation } =
  academicSemesterApi;
