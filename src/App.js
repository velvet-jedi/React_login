// app component is the root of the component hierarchy
import Register from './components/Register';
import React from 'react';
import Login from './components/Login';
import Admin from './components/Admin';
import Editor from './components/Editor';
import Missing from './components/Missing';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import Home from './components/Home';
import Layout from './components/Layout';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import {Routes, Route} from 'react-router-dom';


// functional componeent
function App() {
  return (
    
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* piublic rutes */}
        <Route path='register' element={<Register/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='linkpage' element={<LinkPage/>}/>
        <Route path='unauthorized' element={<Unauthorized/>}/>
        
        {/* private routes */}
        
        <Route element={<RequireAuth allowedRoles={[5150]}/>}>
          <Route path='admin' element={<Admin/>}/>
        </Route>
        
        <Route element={<RequireAuth allowedRoles={[1984]}/>}>
          <Route path='editor' element={<Editor/>}/>
        </Route>
        
        <Route element={<RequireAuth allowedRoles={[1984, 5150]}/>}>
          <Route path='lounge' element={<Lounge/>}/>
        </Route>
      
        <Route element={<RequireAuth allowedRoles={[2001]}/>}>
          <Route path='/' element={<Home/>}/>
        </Route>
        </Route>

        {/* catch all */}
        <Route path='*' element={<Missing/>}/>
      
    </Routes>
  );
}

export default App;
