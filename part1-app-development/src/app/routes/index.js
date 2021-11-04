import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, useHistory } from "react-router-native";
import { selectUser } from "../../store/user/selectors";
import LoginScreen from "../containers/Login/LoginScreen";
import DetailPhoto from "../containers/Photos/DetailPhoto";
import ListPhoto from "../containers/Photos/ListPhoto";

const AppRoute = () => {
  const history = useHistory();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (typeof user.accessToken !== "string") {
      history.push("/login");
    } else {
      // Check token outdated?
      history.push("/photos");
    }
  }, [user?.accessToken]);

  return (
    <>
      <Route exact path="/photos/:photoId" component={DetailPhoto} />
      <Route exact path="/photos" component={ListPhoto} />
      <Route exact path="/login" component={LoginScreen} />
      <Route exact path="/" component={LoginScreen} />
    </>
  );
};

export default AppRoute;
