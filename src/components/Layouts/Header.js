import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { Search } from '../Sections/Search';
import { DropdownLoggedOut, DropdownLoggedIn } from '../../components';
import { useCart } from '../../context';

export const Header = () => {
	const [darkMode, setDarkMode] = useState(
		JSON.parse(localStorage.getItem('darkMode')) || false
	);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [dropdown, setDropdown] = useState(false);
	const { cartList } = useCart();
	const token = JSON.parse(sessionStorage.getItem('token'));

	useEffect(() => {
		localStorage.setItem('darkMode', JSON.stringify(darkMode));

		if (darkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [darkMode]);

	return (
		<header>
			<nav className='bg-white dark:bg-gray-900'>
				<div className='border-b border-slate-200 dark:border-b-0 flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-3'>
					<Link to='/' className='flex items-center'>
						<img src={Logo} className='mr-3 h-16' alt='BookEBook Logo' />
						<span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
							BookEBook
						</span>
					</Link>
					<div className='flex items-center relative'>
						<span
							onClick={() => setDarkMode(!darkMode)}
							className='cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-gear'
						></span>
						<span
							onClick={() => setIsSearchOpen(!isSearchOpen)}
							className='cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-search'
						></span>
						<Link to='/cart' className='text-gray-700 dark:text-white mr-5'>
							<span className='text-2xl bi bi-cart relative'>
								{cartList.length !== 0 && (
									<span className='text-white text-sm absolute -top-1 left-2.5 bg-rose-500 px-1 rounded-full '>
										{cartList.length}
									</span>
								)}
							</span>
						</Link>
						<span
							onClick={() => setDropdown(!dropdown)}
							className='bi bi-person-circle cursor-pointer text-2xl text-gray-700 dark:text-white'
						></span>
						{dropdown &&
							(token ? (
								<DropdownLoggedIn setDropdown={setDropdown} />
							) : (
								<DropdownLoggedOut setDropdown={setDropdown} />
							))}
					</div>
				</div>
			</nav>
			{isSearchOpen && <Search setIsSearchOpen={setIsSearchOpen} />}
		</header>
	);
};
