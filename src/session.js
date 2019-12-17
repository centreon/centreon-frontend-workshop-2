const setUser = (user) => localStorage.setItem('user', JSON.stringify(user));

const deleteUser = () => localStorage.removeItem('user');

const getUser = () => JSON.parse(localStorage.getItem('user'));

export { getUser, setUser, deleteUser };