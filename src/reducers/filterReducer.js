export const filterReducer = (state, action) => {
  const {type, payload} = action;

  switch(type){
    case "PRODUCT_LIST":
      return {productsList: payload.products};

    case "SORT_BY":
      return {...state, sortBy: payload.sortBy};

    case "RATINGS":
      return {...state, ratings: payload.ratings};

    case "ONLY_BEST_SELLER":
      return {...state, onlyBestSeller: payload.onlyBestSeller};
    
    case "ONLY_IN_STOCK":
      return {...state, onlyInStock: payload.onlyInStock};

    case "CLEAR_FILTERS":
      return {...state, onlyInStock: false, onlyBestSeller: false, sortBy: null, ratings: null};

    default:
      throw new Error("No Reducer Case Found");
  }
}