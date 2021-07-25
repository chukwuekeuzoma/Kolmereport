// import logo from './logo.svg';
// import './App.scss';
import React, { useState, useEffect } from 'react'
import OrdinaryLayout from "./Components/Layouts/OrdinaryLayout/OrdinaryLayout";
import Homepage from "./Components/Homepage/Hompage"
import Preloder from "./Components/Preloder/Preloder";
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

    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 6000)
    }, [])

      useEffect(() => {
        const timer = setInterval(() => {
          setProgress((oldProgress) => {
            if (oldProgress === 100) {
              return 0;
            }
            const diff = Math.random() * 10;
            return Math.min(oldProgress + diff, 100);
          });
        }, 300);
    
        return () => {
          clearInterval(timer);
        };
      }, []);


  return (
    <>{
      isLoading?<Preloder Progress={progress}/>:
      <HashRouter>
        <div>
          <Switch>
             <RouteWithLayout Layout={OrdinaryLayout} exact path="/" Component={Homepage} >

            </RouteWithLayout>
          </Switch>

        </div>
      </HashRouter>
     }
    </>
  );
}

export default App;
