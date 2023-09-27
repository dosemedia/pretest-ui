import { Outlet } from "react-router-dom";

export default function RootLayout() {
    return (
      <>
        <h1>App Name</h1>
        <div id="detail">
            <Outlet />
        </div>
      </>
    );
}