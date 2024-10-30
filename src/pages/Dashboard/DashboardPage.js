import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { DashboardCard } from './components/DashboardCard';
import { DashboardEmpty } from './components/DashboardEmpty';
import { getUserOrders } from '../../services';
import { useTitle } from '../../hooks/useTitle';

export const DashboardPage = () => {
	useTitle('Dashboard');

	// const token = JSON.parse(sessionStorage.getItem("token"));
	// const cbid = JSON.parse(sessionStorage.getItem("cbid"));

	const [orders, setOrders] = useState([]);

	useEffect(() => {
		async function fetchOrders() {
			try {
				const data = await getUserOrders();
				setOrders(data);
			} catch (err) {
				toast.error(`${err.message}`, {
					closeButton: false,
					position: 'top-center', // modified to "center-center" in index.css
					autoClose: 5000,
					closeOnClick: true
				});
			}
		}
		fetchOrders();
	}, []);

	return (
		<main>
			<section>
				<p className='text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8'>
					My Dashboard
				</p>
			</section>

			<section>
				{orders.length ? (
					orders.map(order => <DashboardCard key={order.id} order={order} />)
				) : (
					<DashboardEmpty />
				)}
			</section>
		</main>
	);
};
