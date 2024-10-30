import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ProductCard } from '../../../components';
import { getFeaturedProducts } from '../../../services';

export const FeaturedProducts = () => {
	const [featuredProducts, setFeaturedProducts] = useState([]);

	useEffect(() => {
		async function fetchFeaturedProducts() {
			try {
				const data = await getFeaturedProducts();
				setFeaturedProducts(data);
			} catch (err) {
				toast.error(`Featured products error: ${err.message}`, {
					closeButton: false,
					position: 'top-center', // modified to "center-center" in index.css
					autoClose: 5000,
					closeOnClick: true
				});
			}
		}
		fetchFeaturedProducts();
	}, []);

	return (
		<section className='my-20'>
			<h1 className='text-2xl text-center font-semibold dark:text-slate-100 mb-5 underline underline-offset-8'>
				Featured eBooks
			</h1>
			<div className='flex flex-wrap justify-center lg:flex-row'>
				{featuredProducts.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</section>
	);
};
