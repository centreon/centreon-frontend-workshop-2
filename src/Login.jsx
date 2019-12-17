import React, { useState } from 'react';

import { Button, Grid, TextField, FormHelperText } from '@material-ui/core';
import { useFormik } from 'formik';
import { Redirect } from 'react-router-dom';
import { findUser } from './db';
import * as Yup from 'yup';

const initialValues = { username: '', password: '' };

const validationSchema = Yup.object().shape({
	username: Yup.string().required('Login is required'),
	password: Yup.string().required('Password is required'),
});

function Login({ onLogin }) {
	const [loggedIn, setLoggedIn] = useState(false);
	const [error, setError] = useState();

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: ({ username, password }) => {
			findUser({ username, password }).then(result => {
				if (result.length === 0) {
					setError('Login or password invalid');
					return;
				}
				onLogin(result[0]);
				setLoggedIn(true);
			});
		},
	});

	const { handleBlur, handleSubmit, handleChange, values, errors, touched, isValid } = formik;

	return (
		<>
			{loggedIn && <Redirect to="/"></Redirect>}
			<form autoComplete="off" onSubmit={handleSubmit}>
				<Grid
					container
					spacing={2}
					direction="column"
					justify="center"
					alignItems="center"
					style={{ marginTop: 30 }}
				>
					{error && (
						<Grid item>
							<FormHelperText error>{error}</FormHelperText>
						</Grid>
					)}
					<Grid item>
						<TextField
							label="Login"
							inputProps={{ "aria-label": 'Login' }}
							value={values.username}
							error={!!errors.username && touched.username}
							helperText={touched.username ? errors.username : undefined}
							onChange={handleChange('username')}
							onBlur={handleBlur('username')}
						/>
					</Grid>
					<Grid item>
						<TextField
							label="Password"
							inputProps={{ "aria-label": 'Password' }}
							type="password"
							value={values.password}
							onChange={handleChange('password')}
							onBlur={handleBlur('password')}
							error={!!errors.password && touched.password}
							helperText={touched.password ? errors.password : undefined}
						/>
					</Grid>
					<Grid item>
						<Button
							disabled={!isValid || values === initialValues}
							variant="contained"
							color="primary"
							type="submit"
						>
							Submit
						</Button>
					</Grid>
				</Grid>
			</form>
		</>
	);
}

export default Login;
