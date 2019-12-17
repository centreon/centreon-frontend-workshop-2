import React, { useState } from 'react';

import { Button, Grid, TextField, FormHelperText } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { putUser } from './db';
import { Redirect } from 'react-router-dom';

const validationSchema = Yup.object().shape({
	username: Yup.string().required('Login is required'),
	password: Yup.string()
		.min(6, 'Password is too short')
		.required('Password is required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Passwords must match')
		.required('Password confirmation is required'),
});

const initialValues = { username: '', password: '', confirmPassword: '' };

function Register({ onRegister }) {
	const [registered, setRegistered] = useState(false);
	const [error, setError] = useState();

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: ({ username, password }) => {
			putUser({ username, password })
				.then(user => {
					onRegister(user);
					setRegistered(true);
				})
				.catch(({ status }) => {
					if (status === 409) {
						setError('Login already taken');
					}
				});
		},
	});

	const { handleBlur, handleSubmit, handleChange, values, errors, touched, isValid } = formik;

	return (
		<>
			{registered && <Redirect to="/"></Redirect>}
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
							inputProps={{ 'aria-label': 'Login' }}
							aria-label="Login"
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
							inputProps={{ 'aria-label': 'Password' }}
							type="password"
							value={values.password}
							onChange={handleChange('password')}
							onBlur={handleBlur('password')}
							error={!!errors.password && touched.password}
							helperText={touched.password ? errors.password : undefined}
						/>
					</Grid>
					<Grid item>
						<TextField
							label="Confirm password"
							inputProps={{ 'aria-label': 'Confirm password' }}
							type="password"
							value={values.confirmPassword}
							onChange={handleChange('confirmPassword')}
							onBlur={handleBlur('confirmPassword')}
							error={!!errors.confirmPassword && touched.confirmPassword}
							helperText={touched.confirmPassword ? errors.confirmPassword : undefined}
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

export default Register;
