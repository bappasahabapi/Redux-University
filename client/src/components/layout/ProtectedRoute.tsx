import { ReactNode } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";

type TProcetedRoute={
  children:ReactNode;
  role:string|undefined;
}
const ProtectedRoute = ({children,role}:TProcetedRoute) => {

    const token =useAppSelector(store=>store.auth.token);
    const user =useAppSelector(useCurrentUser);
    const dispatch =useAppDispatch()
    // console.log(role,user)
    if(role !==undefined &&role!==user?.role){
      dispatch(logout())
      return <Navigate to="/login" replace={true}/>;
    }


    if(!token){
        return <Navigate to="/login" replace={true}/>;
    }
    
  return children;
}

export default ProtectedRoute