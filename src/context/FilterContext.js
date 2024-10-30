import { createContext, useContext, useReducer } from "react"
import { filterReducer } from "../reducers";

const filterInitialState = {
  productsList: [],
  onlyInStock: false,
  onlyBestSeller: false,
  sortBy: null,
  ratings: null 
}

export const FilterContext = createContext(filterInitialState);

export const FilterProvider = ({children}) => {
  const [state, dispatch] = useReducer(filterReducer, filterInitialState);

  function initializeProductsList(products) {
    dispatch({
      type: "PRODUCT_LIST",
      payload: {
        products: products
      }
    })
  }

  function filterBestSellers(products) {
    return state.onlyBestSeller ? 
    products.filter(product => product.best_seller === true) :
    products;
  }

  function filterInStock(products) {
    return state.onlyInStock ? 
    products.filter(product => product.in_stock === true) :
    products;
  }

  function sort(products) {
    if (state.sortBy === "lowtohigh") {
      return products.sort((a,b) => Number(a.price) - Number(b.price));
    } else if (state.sortBy === "hightolow") {
      return products.sort((a,b) => Number(b.price) - Number(a.price));
    } else {
      return products;
    }
  }

  function filterByRating(products) {
    if (state.ratings === "4STARSABOVE") {
      return products.filter(product => product.rating >= 4);
    } else if (state.ratings === "3STARSABOVE") {
      return products.filter(product => product.rating >= 3);
    } else if (state.ratings === "2STARSABOVE") {
      return products.filter(product => product.rating >= 2);
    } else if (state.ratings === "1STARSABOVE") {
      return products.filter(product => product.rating >= 1);
    } else {
      return products;
    }
  }

  const filteredProductsList = filterByRating(sort(filterInStock(filterBestSellers(state.productsList))))

  const value = {
    state,
    dispatch,
    productsList: filteredProductsList,
    initializeProductsList
  }

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => useContext(FilterContext);