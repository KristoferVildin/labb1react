import {
  createHashRouter,
  Link,
  Outlet,
  Router,
  RouterProvider,
} from "react-router-dom";
import Play from "./Play";
import Home from "./Home";

function App() {
  const router = createHashRouter([
    {
      children: [
        { element: <Play />, path: "/play" },
        { element: <Home />, path: "/" },
      ],
      element: (
        <>
          <ul>
            <li>
              <Link to="/">Hem</Link>
            </li>
            <li>
              <Link to="/play">Quiz</Link>
            </li>
          </ul>
          <main>
            <Outlet />
          </main>
        </>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
