import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Home from "./components/home/Home"
import NotFound from "./components/404/NotFound.js"
import Navbar from "./components/Navbar"

const Router = () => (
  <BrowserRouter>
    <Navbar/>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route component={NotFound} />
      </Switch>
  </BrowserRouter>
)

export default Router
