import { TQueryParam } from '../../../constants/global';
import { TOfferedCourse, TResponseRedux } from '../../../types';
import { baseApi } from '../../api/baseApi';
import { tagTypes } from '../../tag-types';

const studentCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOfferedCourses: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: '/offered-courses/my-offered-courses',
          method: 'GET',
          params: params,
        };
      },
      providesTags: [tagTypes.offeredCourse],
      transformResponse: (response: TResponseRedux<TOfferedCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    // getAllEnrolledCourses: builder.query({
    //   query: (args) => {
    //     console.log(args);
    //     const params = new URLSearchParams();

    //     if (args) {
    //       args.forEach((item: TQueryParam) => {
    //         params.append(item.name, item.value as string);
    //       });
    //     }
    //     return {
    //       url: '/enrolled-courses/my-enrolled-courses',
    //       method: 'GET',
    //       params: params,
    //     };
    //   },
    //   providesTags: ['offeredCourse'],
    //   transformResponse: (response: TResponseRedux<any>) => {
    //     return {
    //       data: response.data,
    //       meta: response.meta,
    //     };
    //   },
    // }),
    enrolCourse: builder.mutation({
      query: (data) => ({
        url: '/enrolled-courses/create-enrolled-course',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.offeredCourse],
    }),
  }),
});

export const {
  useGetAllOfferedCoursesQuery,
  useEnrolCourseMutation,
  // useGetAllEnrolledCoursesQuery,
} = studentCourseApi;
