import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Addusers from "./components/addusers";
import List from "./components/List";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <List />
      </>
    ),
  },
  {
    path: "/addContact",
    element: (
      <>
        <Addusers />
      </>
    ),
  },
  {
    path: "/edituser/:userId",
    element: <Addusers />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
