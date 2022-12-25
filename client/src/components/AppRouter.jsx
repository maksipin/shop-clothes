import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useRoutes } from "react-router-dom";
import routes from "../routes";
import { getCurrentAuth } from "../store/users";

const AppRouter = () => {
  const auth = useSelector(getCurrentAuth());
  const location = useLocation();
  const elements = useRoutes(routes(auth, location));
  return <>{elements}</>;
};

export default AppRouter;
