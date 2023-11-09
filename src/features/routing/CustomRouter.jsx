import React from "react"
import {RootRoute, Route, Router, RouterProvider} from "@tanstack/react-router";
import {pages} from "./pages";
import App from "../../App";

const CustomRouter = () => {

    const rootRoute = new RootRoute({component: App})

    const makeRoutes = pages.map(({path, component}) => new Route({
        getParentRoute: () => rootRoute,
        path,
        component
    }))

    const routeTree = rootRoute.addChildren(makeRoutes)
    const router = new Router({routeTree})

    return (
        <RouterProvider router={router}/>
    )
}

export default CustomRouter