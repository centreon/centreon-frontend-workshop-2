import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField, Checkbox, FormHelperText } from '@material-ui/core';
import { addTodo as addTodoToDb, checkTodo as checkTodoInDb } from './db';
import { Redirect } from 'react-router-dom';
import { getUser } from './session';

function Todos({ onAddTodo }) {
	const [error, setError] = useState();
	const [newTodoName, setNewTodoName] = useState('');
	const user = getUser();

	useEffect(() => {
		if (!user.todos) {
			return;
		}
		if (user.todos.find(({ name }) => name === newTodoName)) {
			setError('Todo already in the list');
		} else {
			setError(undefined);
		}
	}, [newTodoName]);

	const changeNewTodoName = event => setNewTodoName(event.target.value);

	const addTodo = () => {
		addTodoToDb({ username: user.username, name: newTodoName })
			.then(onAddTodo)
			.then(() => setNewTodoName(''));
	};

	const checkTodo = id => {
		checkTodoInDb({ username: user.username, id }).then(onAddTodo);
	};

	return (
		<>
			{!user && <Redirect to="/"></Redirect>}
			{user && (
				<Grid
					container
					direction="column"
					spacing={2}
					style={{ marginTop: 30, marginLeft: 'auto', marginRight: 'auto' }}
					alignItems="flex-start"
					justify="center"
				>
					{!user.todos && 'No todos'}
					{user.todos &&
						user.todos.map(({ id, name, done }) => (
							<Grid key={name} item>
								<Checkbox
									inputProps={{ 'aria-label': `Check ${name}` }}
									checked={done}
									onChange={() => checkTodo(id)}
								></Checkbox>
								<span style={{ textDecoration: done ? 'line-through' : 'none' }}>{name}</span>
							</Grid>
						))}
					<Grid item>
						<TextField
							inputProps={{
								'aria-label': 'New todo',
							}}
							onChange={changeNewTodoName}
							value={newTodoName}
						></TextField>
						<Button
							style={{ marginLeft: 15 }}
							disabled={newTodoName === '' || error !== undefined}
							variant="contained"
							color="primary"
							onClick={addTodo}
						>
							Add
						</Button>
					</Grid>
					{error && (
						<Grid item>
							<FormHelperText error>{error}</FormHelperText>
						</Grid>
					)}
				</Grid>
			)}
		</>
	);
}

export default Todos;
