import React, { useEffect, useState } from 'react';
import './App.css';
import {Switch,Route} from "react-router-dom";
import MainPage from "./view/components/mainPage/mainPage";
import ModificationByField  from "./view/components/modificationByField/modificationByField";
function App() {
  
  return (


    <div >
     <Switch> 
       <Route path="/MainPage" component={MainPage}> </Route>

     </Switch>
      
   </div>
  );
}

export default App;
