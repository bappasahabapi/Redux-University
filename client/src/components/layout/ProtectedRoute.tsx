import { ReactNode } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";
import { logout, TUser,} from "../../redux/features/auth/authSlice";
import { decodeToken } from "../../utils/verifyToken";

type TProcetedRoute={
  children:ReactNode;
  role:string|undefined;
}
const ProtectedRoute = ({children,role}:TProcetedRoute) => {

  const dispatch =useAppDispatch()
    const token =useAppSelector(store=>store.auth.token);
    // const user =useAppSelector(useCurrentUser);

    let user;
    if(token){
      user = decodeToken(token)
    }
    console.log(user)




    if(role !==undefined &&role!==(user as TUser)?.role){
      dispatch(logout())
      return <Navigate to="/login" replace={true}/>;
    }


    if(!token){
        return <Navigate to="/login" replace={true}/>;
    }
    
  return children;
}

export default ProtectedRoute