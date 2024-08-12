import { jwtDecode } from "jwt-decode";


export const decodeToken =(token:string) => {
    // console.log(jwtDecode(token))  // { userId: 'A-0001', role: 'admin', iat: 1722353375, exp: 1800113375 }
    return jwtDecode(token);

}