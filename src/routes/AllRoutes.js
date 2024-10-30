import { Routes, Route } from 'react-router-dom';
import {
	HomePage,
	ProductsPage,
	ProductDetailsPage,
	RegisterPage,
	LoginPage,
	CartPage,
	OrderPage,
	DashboardPage,
	PageNotFound
} from '../pages';
import { ProtectedRoutes } from './ProtectedRoutes';

export const AllRoutes = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<HomePage />} end />
				<Route path='products' element={<ProductsPage />} />
				<Route path='products/:id' element={<ProductDetailsPage />} />

				<Route path='register' element={<RegisterPage />} />
				<Route path='login' element={<LoginPage />} />

				<Route
					path='cart'
					element={
						<ProtectedRoutes>
							<CartPage />
						</ProtectedRoutes>
					}
				/>
				<Route
					path='order-summary'
					element={
						<ProtectedRoutes>
							<OrderPage />
						</ProtectedRoutes>
					}
				/>
				<Route
					path='dashboard'
					element={
						<ProtectedRoutes>
							<DashboardPage />
						</ProtectedRoutes>
					}
				/>

				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</>
	);
};
