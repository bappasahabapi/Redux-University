import { TQueryParam } from "../../../constants/global";
import { TResponseRedux, TSemester } from "../../../types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addRegisteredSemester: builder.mutation({
      query: (data) => ({
        url: `/semester-registrations/create-semester-registration`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.semester],
    }),
    updateSemesterStatus: builder.mutation({
      query: (args) => ({
        url: `/semester-registrations/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: [tagTypes.semester],
    }),
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
      providesTags: [tagTypes.semester],
    }),

    // ------------- Courses ----------------------------------------------------------------

    getAllCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: `/courses`,
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<any>) => {
        // console.log(response)
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: [tagTypes.courses],
    }),
    addCourse: builder.mutation({
      query: (data) => ({
        url: `/courses/create-course`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.courses],
    }),
    addFaculties: builder.mutation({
      query: (args) => ({
        url: `/courses/${args.courseId}/assign-faculties`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: [tagTypes.courses],
    }),

    getCourseFaculties: builder.query({
      query: (id) => {
        console.log(id)
        return {
          url: `/courses/${id}/get-faculties`,
          method: 'GET',
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    createOfferedCourse: builder.mutation({
      query: (data) => ({
        url: `offered-courses/create-offered-course`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.courses],
    }),
  }),
});

export const {
  useAddRegisteredSemesterMutation,
  useGetAllRegisteredSemestersQuery,
  useUpdateSemesterStatusMutation,
  useGetAllCoursesQuery,
  useAddCourseMutation,
  useAddFacultiesMutation,
  useGetCourseFacultiesQuery,
  useCreateOfferedCourseMutation
} = courseManagementApi;
