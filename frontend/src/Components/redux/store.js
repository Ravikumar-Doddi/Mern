import { createStore } from 'redux'

import {userReducer} from './reducers.reducer'
export const store = createStore(userReducer)