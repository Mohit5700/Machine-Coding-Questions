import { Outlet } from "react-router-dom";
import Header from "./Header";

const AppLayout = () => {
  return (
    <div>
      {/* Persistent top navbar */}
      <Header />
      <main>
        {/* The current route item resolves dynamically right here inside the Outlet */}
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
