import { getUserProfileAction } from '../../redux/slices/users/userSlice';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminOnly from '../NotAuthorised/AdminOnly';


const AdminRoutes = ({children}) => {

   //dispatch
   const dispatch = useDispatch();
   useEffect(() => {
     dispatch(getUserProfileAction());
   }, [dispatch]);
   //get user from store
   const { userAuth } = useSelector((state) => state?.users);
  //  console.log("userAuth",userAuth.userInfo?.userFound?.isAdmin); 


   //ye bata rha h ki user admin h ya nhi
    const isAdmin =userAuth?.userInfo?.userFound?.isAdmin?true:false;
    if(!isAdmin)
    return <AdminOnly/>
    return (
    <>
        {children}
    </>
  )
}

export default AdminRoutes
