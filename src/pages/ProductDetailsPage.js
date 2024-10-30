import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Rating } from '../components';
import { useParams } from 'react-router-dom';
import { useTitle } from '../hooks/useTitle';
import { useCart } from '../context';
import { getProduct } from '../services';

export const ProductDetailsPage = () => {
	const [product, setProduct] = useState({});
	const [isInCart, setIsInCart] = useState(false);
	const { id } = useParams();
	const { addToCart, removeFromCart, cartList } = useCart();

	useEffect(() => {
		async function fetchProducts() {
			try {
				const data = await getProduct(id);
				setProduct(data);
			} catch (err) {
				toast.error(`Ebook details error: ${err.message}`, {
					closeButton: false,
					position: 'top-center', // modified to "center-center" in index.css
					autoClose: 5000,
					closeOnClick: true
				});
			}
		}
		fetchProducts();
	}, [id]);

	useEffect(() => {
		const isProductInCart = cartList.find(item => item.id === product.id);

		setIsInCart(isProductInCart);
	}, [cartList, product.id]);

	useTitle(`${product.name}`);

	return (
		<main>
			<section>
				{product.id && (
					<>
						<h1 className='mt-10 mb-5 text-4xl text-center font-bold text-gray-900 dark:text-slate-200'>
							{product.name}
						</h1>
						<p className='mb-5 text-lg text-center text-gray-900 dark:text-slate-200'>
							{product.overview}
						</p>
						<div className='flex flex-wrap justify-center gap-14'>
							<div className='max-w-lg my-4'>
								<img
									className='rounded'
									src={product.cover}
									alt={`Cover of ${product.name}`}
								/>
							</div>
							<div className='max-w-xl my-3 text-left'>
								<p className='text-3xl font-bold text-gray-900 dark:text-slate-200'>
									<span className='mr-1'>$</span>
									<span className=''>{product.price}</span>
								</p>
								<p className='my-3'>
									<Rating rate={product.rating} />
								</p>
								<p className='my-4 select-none'>
									{product.best_seller && (
										<span className='font-semibold text-amber-500 border bg-amber-50 rounded-lg px-3 py-1 mr-2'>
											BEST SELLER
										</span>
									)}
									{product.in_stock ? (
										<span className='font-semibold text-emerald-600	border bg-slate-100 rounded-lg px-3 py-1 mr-2'>
											INSTOCK
										</span>
									) : (
										<span className='font-semibold text-rose-700 border bg-slate-100 rounded-lg px-3 py-1 mr-2'>
											OUT OF STOCK
										</span>
									)}
									<span className='font-semibold text-blue-500 border bg-slate-100 rounded-lg px-3 py-1 mr-2'>
										{product.size} MB
									</span>
								</p>
								<p className='my-3'>
									{!isInCart ? (
										<button
											onClick={() => addToCart(product)}
											className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 ${
												product.in_stock
													? ''
													: 'cursor-not-allowed bg-gray-400 hover:bg-gray-400'
											}`}
											disabled={product.in_stock ? '' : 'disabled'}
										>
											Add To Cart <i className='ml-1 bi bi-plus-lg'></i>
										</button>
									) : (
										<button
											onClick={() => removeFromCart(product)}
											className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800`}
										>
											Remove Item <i className='ml-1 bi bi-trash3'></i>
										</button>
									)}
								</p>
								<p className='text-lg text-gray-900 dark:text-slate-200'>
									{product.long_description}
								</p>
							</div>
						</div>
					</>
				)}
			</section>
		</main>
	);
};
