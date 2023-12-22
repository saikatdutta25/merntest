import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Layout from './Components/Layout/Layout';
import { Home } from './Components/Home';
// import Todo from "./Components/Todo";
import Todo from './Components/TodoList/Todo';
import { NotfoundPage } from "./Components/NotfoundPage";
import Login from "./Components/Login";
import AuthGuard from './Components/Authguard';
import { Register } from "./Components/Register";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <AuthGuard path="/todos" component={Todo} />
          <Route path="*" component={NotfoundPage} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
