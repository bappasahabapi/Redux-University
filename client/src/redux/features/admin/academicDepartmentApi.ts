import { TResponseRedux } from "../../../types";
import { TAcademicDepartment } from "../../../types/academicDepartment.type";
import { baseApi } from "../../api/baseApi";


const academicDepartmentApi =baseApi.injectEndpoints({
    endpoints:(builder)=>({

    getAllDepartment: builder.query({
        query:()=>({
            url:`/academic-departments`,
            method: 'GET',
        }),
        transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
            return {
              data: response.data,
              meta: response.meta,
            };
          },
    })


    })
});

export const {
    useGetAllDepartmentQuery
}=academicDepartmentApi;