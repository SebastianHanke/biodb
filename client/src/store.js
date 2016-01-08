/*
*
* @flow
* */

import {createStore} from 'redux';
import { primerReducer } from './reducers';


export const store = createStore(primerReducer);
