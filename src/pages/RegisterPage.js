import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../services';
import { useTitle } from '../hooks/useTitle';

export const RegisterPage = () => {
	useTitle('Register');

	const navigate = useNavigate();

	async function handleRegister(e) {
		e.preventDefault();
		const authDetails = {
			name: e.target.name.value,
			email: e.target.email.value,
			password: e.target.password.value
		};

		try {
			const data = await register(authDetails);
			data.accessToken ? navigate('/products') : toast.error(data);
		} catch (err) {
			toast.error(`${err.message}`, {
				closeButton: false,
				position: 'top-center', // modified to "center-center" in index.css
				autoClose: 5000,
				closeOnClick: true
			});
		}
	}

	return (
		<main>
			<section className='text-left'>
				<p className='text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8'>
					Register
				</p>
				<form onSubmit={handleRegister}>
					<div className='mb-6'>
						<label
							htmlFor='name'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
						>
							Your name
						</label>
						<input
							type='name'
							id='name'
							className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
							placeholder='John Doe'
							required
							autoComplete='off'
						/>
					</div>
					<div className='mb-6'>
						<label
							htmlFor='email'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
						>
							Your email
						</label>
						<input
							type='email'
							id='email'
							className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
							placeholder='john_doe@example.com'
							required
							autoComplete='off'
						/>
					</div>
					<div className='mb-6'>
						<label
							htmlFor='password'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
						>
							Your password
						</label>
						<input
							type='password'
							id='password'
							className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
							required
							minLength='7'
						/>
					</div>
					<button
						type='submit'
						className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
					>
						Register
					</button>
				</form>
			</section>
		</main>
	);
};