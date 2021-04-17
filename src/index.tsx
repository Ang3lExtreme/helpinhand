import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login';
import Register from './Register'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import HelpH from './HelpinHand'
import UserPage from './UserPage'






ReactDOM.render(
  <BrowserRouter >
    <Switch>
      <Route path="/" component={HelpH} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/register" component={Register} exact />
      <Route path='/userpage' component={UserPage} exact />
      
      <Route component = {() => <div> Page 404</div>}/>


    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
