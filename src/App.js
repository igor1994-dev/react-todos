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
import PrivateRoute from './components/customRoute/PrivateRoute';


function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <NotAuthRoute exact path='/' component={Main} />
          <NotAuthRoute exact path='/signin' component={SignIn} />
          <NotAuthRoute exact path='/signup' component={SignUp} />

          <PrivateRoute exact path='/todos' component={Todos} />
          <PrivateRoute exact path='/todos/new' component={TodoNew} />
          <PrivateRoute exact path='/todos/edit/:id?' component={TodoEdit} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;