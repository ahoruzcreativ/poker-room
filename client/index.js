import '@tmkelly28/tk-css'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store/store'
import Test from './test'

ReactDOM.render(
  <Provider store={store}>
<Test />
  </Provider>,
  document.getElementById('app')
)
