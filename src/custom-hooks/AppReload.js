import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "../redux/slices/usersSlice";
import { loadSeller } from "../redux/slices/sellersSlice";
import { getAllProducts } from "../redux/slices/productSlice";
import { getAllEvents } from "../redux/slices/eventSlice";


const useAppReload = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadSeller());
    dispatch(getAllProducts());
    dispatch(getAllEvents());

  }, [dispatch]);
};

export default useAppReload;
