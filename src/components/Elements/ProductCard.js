import { Link } from "react-router-dom"
import { Rating } from "./Rating"
import { useCart } from "../../context"
import { useEffect, useState } from "react";

export const ProductCard = ({product}) => {
  const {cartList, addToCart, removeFromCart} = useCart();
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const isProductInCart = cartList.find(item => item.id === product.id);

    setIsInCart(isProductInCart);
  }, [cartList, product.id])

  return (
    <div className="text-left m-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between">
        <div className="h-3/4 relative">
            <div className="h-3/4">
                <Link to={`/products/${product.id}`} >
                    {product.best_seller && <span className="absolute top-4 right-2 px-2 bg-orange-500 bg-opacity-90 text-white rounded z-10">Best Seller</span>}
                    <img className="h-full min-w-full mx-auto rounded-t-lg" src={product.cover} alt={`Cover of ${product.name}`} />
                </Link>
            </div>
            <div className="p-5">
                <Link to={`/products/${product.id}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                </Link>
                <p className="overflow-hidden mb-3 font-normal text-gray-700 dark:text-gray-400">{product.overview}</p>
            </div>
        </div>
        <div className="px-4 my-4">
            <Rating rate={product.rating} />

            <p className="flex justify-between items-center">
                <span className="text-2xl dark:text-gray-200">
                    <span>$</span><span>{product.price}</span>
                </span>
                {!isInCart ? 
                <button onClick={() => addToCart(product)} className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 ${product.in_stock ? "" : "cursor-not-allowed bg-gray-400 hover:bg-gray-400"}`} disabled={ product.in_stock ? "" : "disabled"}>Add To Cart <i className="ml-1 bi bi-plus-lg"></i></button> :
                <button onClick={() => removeFromCart(product)} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800">Remove Item <i className="ml-1 bi bi-trash3"></i></button> }
            </p>
        </div>
    </div>
  )
}