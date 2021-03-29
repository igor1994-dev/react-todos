import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import Main from './pages/main/Main';
import Todos from './pages/todos/Todos';
import TodoNew from './pages/todoNew/TodoNew';
import TodoEdit from './pages/todoEdit/TodoEdit';
import NotAuthRoute from './components/customRoute/NotAuthRoute';
import AuthRoute from './components/customRoute/AuthRoute';


function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <AuthRoute exact path='/' component={Main} />
          <AuthRoute exact path='/signin' component={SignIn} />
          <AuthRoute exact path='/signup' component={SignUp} />
          <NotAuthRoute exact path='/todos' component={Todos} />
          <NotAuthRoute exact path='/todos/new' component={TodoNew} />
          <NotAuthRoute exact path='/todos/edit/:id?' component={TodoEdit} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;