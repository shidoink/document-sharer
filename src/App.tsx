import {HashRouter, Routes, Route, Link} from 'react-router-dom'
import Navbar from './components/Navbar'
import routes from './config/routes'
import AuthChecker from './auth/AuthChecker'
import './index.css'

function App() {
  return (
    <HashRouter>
    <Navbar/>
        <Routes>
          { routes.map( (route: any, index: any)=>(
            <Route
            key={index}
            path = {route.path}
            element = {
              route.protected?(
                <AuthChecker>
                <route.component/>
                </AuthChecker>
                ):(<route.component/>)
            } />
          )) }
        </Routes>
     
   </HashRouter>
  )
}

export default App
