import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // show unauthorized screen if no user is found in redux store
  if (!userInfo) {
    return (
      <div className="">
        <h1>Unauthorized :(</h1>
        <span>
          <NavLink to="/login">Login</NavLink> to gain access
        </span>
      </div>
    );
  }

  return <Outlet />;
};

export default PrivateRoute;
