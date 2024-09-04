
import { TQueryParam } from "../../../constants/global";
import { TResponseRedux, TSemester } from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addRegisteredSemester: builder.mutation({
      query: (data) => ({
        url: `/semester-registrations/create-semester-registration`,
        method: "POST",
        body: data,
      }),
    }),
    // updateStudent: builder.mutation({
    //   query: (data) => ({
    //     url: `/students/${data.studentId}`,
    //     method: "PATCH",
    //     body: data.body,
    //   }),
    // }),

    getAllRegisteredSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: `/semester-registrations`,
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<TSemester[]>) => {
        // console.log(response)
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    //   providesTags:[tagTypes.student]
    }),

    // student: builder.query({
    //   query: ({ studentId }) => ({
    //     url: `/students/${studentId}`,
    //     method: "GET",
    //   }),
    // }),

    // deleteStudent: builder.mutation({
    //   query: (id) => ({
    //     url: `/students/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [tagTypes.student],
    // }),

   
  }),
});

export const {
  useAddRegisteredSemesterMutation,
  useGetAllRegisteredSemestersQuery

} = courseManagementApi;
