// import logo from './logo.svg';
// import './App.scss';
import Homepage from "./Components/Homepage/Hompage"
import OrdinaryLayout from "./Components/Layouts/OrdinaryLayout/OrdinaryLayout";
import { HashRouter, Route, Switch } from "react-router-dom"

function RouteWithLayout({ Layout, Component, ...rest }) {
  return (
    <Route {...rest} >
      <Layout {...rest} >
        <Component {...rest} />
      </Layout>
    </Route>

  )
}




function App() {
  return (
    <>
      <HashRouter>
        <div>
          <Switch>
             <RouteWithLayout Layout={OrdinaryLayout} exact path="/" Component={Homepage} >

            </RouteWithLayout>
          </Switch>

        </div>
      </HashRouter>
    </>
  );
}

export default App;
