import { TQueryParam } from "../../../constants/global";
import { TResponseRedux, TStudent } from "../../../types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addStudent: builder.mutation({
      query: (data) => ({
        url: `/users/create-student`,
        method: "POST",
        body: data,
      }),
    }),
    updateStudent: builder.mutation({
      query: (data) => ({
        url: `/students/${data.studentId}`,
        method: "PATCH",
        body: data.body,
      }),
    }),

    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: `/students`,
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        // console.log(response)
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags:[tagTypes.student]
    }),

    student: builder.query({
      query: ({ studentId }) => ({
        url: `/students/${studentId}`,
        method: "GET",
      }),
    }),

    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.student],
    }),

   
  }),
});

export const {
  useAddStudentMutation,
  useGetAllStudentsQuery,
  useStudentQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation
} = userManagementApi;
