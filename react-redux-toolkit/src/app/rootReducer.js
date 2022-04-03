import { combineReducers } from 'redux'
import productReducer from '../features/slice/ProductSlice'
import categoryReducer from '../features/slice/CategorySlice'

const rootReducer = combineReducers({
    products : productReducer,
    category : categoryReducer
});
export default rootReducer;