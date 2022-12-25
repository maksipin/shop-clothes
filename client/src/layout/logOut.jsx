import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { getIsLoggedIn, logOut } from "../store/users";

const LogOut = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logOut());
  }, []);

  if (!isLoggedIn) navigate("../../");
  console.log(isLoggedIn);
  return (
    <div className="m-auto">
      <Loader />
    </div>
  );
};

export default LogOut;
