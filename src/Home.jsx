import React from 'react';
import { makeStyles } from '@material-ui/core';
import { getUser } from './session';

const useStyles = makeStyles(() => ({
	root: {
		textAlign: 'center',
	},
}));

function Home() {
	const classes = useStyles();

	const user = getUser();

	return (
		<div className={classes.root}>
			<h1>Welcome {user ? user.username : ''}</h1>
			{!user && 'Please register or login to continue'}
		</div>
	);
}

export default Home;
