export const Rating = ({ rate }) => {
	//2 - full star, 1 - half star, 0 - empty star
	let ratingArray = Array(5).fill(0);
	let fullStars = Math.floor(rate);
	for (let i = 0; i < fullStars; i++) {
		ratingArray[i] = 2;
	}

	let rest = rate - Math.floor(rate);
	if (rest >= 0.75) {
		ratingArray[fullStars] = 2;
	} else if (rest > 0.25) {
		ratingArray[fullStars] = 1;
	}

	return (
		<div className='flex items-center my-2'>
			{ratingArray.map((star, ind) => {
				return star === 2 ? (
					<i
						key={ind}
						className='text-lg bi bi-star-fill text-yellow-500 mr-1'
					></i>
				) : star === 1 ? (
					<i
						key={ind}
						className='text-lg bi bi-star-half text-yellow-500 mr-1'
					></i>
				) : (
					<i key={ind} className='text-lg bi bi-star text-yellow-500 mr-1'></i>
				);
			})}
			<span className='ml-1 dark:text-white'>{rate}</span>
		</div>
	);
};
