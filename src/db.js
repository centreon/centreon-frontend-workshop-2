import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-find').default);

const name = 'centreon-frontend-workshop-2';

const connection = () => new PouchDB(name);

connection().createIndex({
	index: { fields: ['username', 'password'] },
});

function putUser(user) {
	return connection().put({ _id: user.username, ...user }).then(() => getUser(user.username));
}

function getUser(username) {
	return connection().get(username);
}

function findUser({ username, password }) {
	return connection()
		.find({
			selector: { username, password },
		})
		.then(({ docs }) => docs);
}

function addTodo({ username, name }) {
	return connection()
		.get(username)
		.then(user => {
			const todos = user.todos ? user.todos : [];
			const id = todos.length;

			return connection().put({
				...user,
				_id: username,
				_rev: user._rev,
				todos: [...todos, { id, name, done: false }],
			});
		})
		.then(() => connection().get(username));
}

function checkTodo({ username, id }) {
	return getUser(username).then(user => {
		const todos = user.todos;

		todos[id].done = !todos[id].done;

		return connection().put({
			...user,
			_id: username,
			_rev: user._rev,
			todos,
		}).then(() => getUser(username));
	});
}

export { putUser, findUser, getUser, addTodo, checkTodo };
