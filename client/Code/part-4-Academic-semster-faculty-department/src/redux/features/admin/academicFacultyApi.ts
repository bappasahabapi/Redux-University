
import { TResponseRedux } from "../../../types";
import { TAcademicFaculty } from "../../../types/academicFaculty.type";
import { baseApi } from "../../api/baseApi";

const academicFacultyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFaculty: builder.query({
      query: () => ({
        url: `/academic-faculties`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        console.log(response)
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    
    addAcademicFaculty: builder.mutation({
      query: (data) => (
        console.log(data),{
        url: `/academic-faculties/create-academic-faculty`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllFacultyQuery,useAddAcademicFacultyMutation } =
  academicFacultyApi;
