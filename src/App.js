import React, { useState } from 'react';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Home from './Home';
import Todos from './Todos';

import { getUser, setUser as setSessionUser, deleteUser } from './session';


const LoginLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
const RegisterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
const TodosLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

function App() {
	const [user, setUser] = useState(getUser());

	const updateUser = value => {
		setSessionUser(value);
		setUser(value);
	};

	const logout = () => {
		deleteUser();
		setUser(undefined);
	};

	return (
		<>
			<Router>
				<AppBar position="static">
					<Toolbar>
						{!user && (
							<>
								<Button color="inherit" component={LoginLink} to="/login">
									Login
								</Button>
								<Button color="inherit" component={RegisterLink} to="/register">
									Register
								</Button>
							</>
						)}

						{user && (
							<>
              	<Button color="inherit" component={TodosLink} to="/todos">
									Manage Todos
								</Button>
								<div style={{ flexGrow: 1 }}></div>
								<Button color="inherit" onClick={logout}>
									Logout
								</Button>
							</>
						)}
					</Toolbar>
				</AppBar>
				<Switch>
        <Route exact path="/">
					<Home />
				</Route>
					<Route path="/login">
						<Login onLogin={updateUser} />
					</Route>
					<Route path="/register">
						<Register onRegister={updateUser} />
					</Route>
          <Route path="/todos">
						<Todos onAddTodo={updateUser} />
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
