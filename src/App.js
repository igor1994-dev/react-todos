import React from 'react';
// import TodoList from './components/TodoList';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import Main from './pages/main/Main';
import Todos from './pages/todos/Todos';
import TodoNew from './pages/todoNew/TodoNew';
import TodoEdit from './pages/todoEdit/TodoEdit';


function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path='/' component={Main} />
          {/* <Route path='/todolist' component={TodoList} /> */}
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route exact path='/todos' component={Todos} />
          <Route exact path='/todos/new' component={TodoNew} />
          <Route exact path='/todos/edit/:id' component={TodoEdit} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;