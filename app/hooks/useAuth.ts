"use client";

import { useSelector, useDispatch } from "react-redux";

import { useRouter } from "next/navigation";
import { persistor, RootState } from "../redux/store/store";
import { logout } from "../redux/auth/authSlice";
import Cookies from "js-cookie";

export function useAuth() {
  const dispatch = useDispatch();
  const router = useRouter();


  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = Boolean(token);


  const handleLogout = async () => {
    dispatch(logout()); 
    await persistor.purge(); 
    Cookies.remove("authToken");
    router.push("/login");
  };

  return { isAuthenticated, token, handleLogout };
}
