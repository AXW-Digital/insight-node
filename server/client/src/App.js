import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';

//pages
import LandingPage from './pages/LandingPage'
import Signin from './components/forms/Signin';
import Signup from './components/forms/Signup';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import KyselyPage from './pages/KyselyPage'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route exact path = "/" component = {LandingPage} />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;

