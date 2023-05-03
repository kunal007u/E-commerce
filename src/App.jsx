
// 51f592fec339847175cd9eefa6247a6bff3ea176a4d518fbcfc9b3d4e0ce588a2b5a18288b521fd75cd401b778dee42d16b2c0299353f272dbbc9d54346d69e4b0c90b57a1a5bf0f7fc07608310a5a74039b73a4d72fd14d39b595d0bdf240e8e6eb4a8e9b48be72b0ac0c8d19b9449611522147b4d1e16122d73784bc3de828
// NOTE :- Provide the Redux Store to React

import { BrowserRouter } from 'react-router-dom'
import './App.css'
import IndexRoute from './Routes/IndexRoute'
import { store } from '/src/Store/store.jsx'
import { Provider, useSelector } from 'react-redux'


function App() {
  return (
    <>
     
        <Provider store={store}>
          <BrowserRouter >
            <IndexRoute />
          </BrowserRouter>
        </Provider>
      
    </>
  )

}

export default App
