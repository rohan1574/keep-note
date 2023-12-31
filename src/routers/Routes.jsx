import { createBrowserRouter } from "react-router-dom";
import Error from "../components/Error/Error";
import Root from "../layouts/Root/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Dashboard from "../pages/Dashboard/Dashboard";
import Notes from "../pages/Dashboard/Notes/Notes";
import Trash from "../pages/Dashboard/Trash/Trash";
import Tags from "../pages/Dashboard/Tags/Tags";
import Project from "../pages/Dashboard/Project/Project";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <Error></Error>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/registration",
                element: <Registration></Registration>,
            },
        ],
    },
    {
        path: "/Dashboard",
        element: <ProtectedRoute> <Dashboard></Dashboard></ProtectedRoute>,
        errorElement: <Error></Error>,
        children: [
            {
                path: "/Dashboard",
                element: <Notes></Notes>,
            },
            {
                path: "/Dashboard/trash",
                element: <Trash></Trash>,
            },
            {
                path: "/Dashboard/projects",
                element: <Project></Project>,
            },
            {
                path: "/Dashboard/tags/:tag",
                loader: ({ params }) => fetch(`https://seequenzetechnologies.vercel.app/tagsData?tag=${params.tag}`),
                element: <Tags></Tags>,
            },

        ],
    },
]);
export default router;