import { Provider } from 'react-redux'
import './App.css'
import { Navigation } from './Navigation'
import { store } from './store/store'

export const App = () => {
  return (
    <>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </>
  )
}