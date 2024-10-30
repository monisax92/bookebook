import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTitle } from '../../hooks/useTitle';
import { ProductCard } from '../../components';
import { ProductsFilterBar } from './components/ProductsFilterBar';
import { useLocation } from 'react-router-dom';
import { useFilter } from '../../context';
import { getProductsList } from '../../services';

export const ProductsPage = () => {
	const { productsList, initializeProductsList } = useFilter();

	useTitle('Our EBooks');
	const [isOpen, setIsOpen] = useState(false);
	const search = useLocation().search;
	const searchTerm = new URLSearchParams(search).get('q');

	useEffect(() => {
		async function fetchProducts() {
			try {
				const data = await getProductsList(searchTerm);
				initializeProductsList(data);
			} catch (err) {
				toast.error(err.message, {
					closeButton: false,
					position: 'top-center', // modified to "center-center" in index.css
					autoClose: 5000,
					closeOnClick: true
				});
			}
		}
		fetchProducts();
	}, [searchTerm]); //eslint-disable-line

	return (
		<main>
			<section className='my-5'>
				<div className='my-5 flex justify-between'>
					<span className='text-2xl font-semibold dark:text-slate-100 mb-5'>
						{searchTerm === null
							? `All eBooks (${productsList.length})`
							: productsList.length === 0
							? `No results for "${searchTerm}"`
							: `Search results for "${searchTerm}" (${productsList.length})`}
					</span>
					<span>
						<button
							onClick={() => setIsOpen(!isOpen)}
							id='dropdownMenuIconButton'
							data-dropdown-toggle='dropdownDots'
							className='inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700'
							type='button'
						>
							<svg
								className='w-6 h-6'
								aria-hidden='true'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z'></path>
							</svg>
						</button>
					</span>
				</div>

				<div className='flex flex-wrap justify-center lg:flex-row gap-3'>
					{productsList.map(product => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</section>

			{isOpen && <ProductsFilterBar setIsOpen={setIsOpen} />}
		</main>
	);
};
