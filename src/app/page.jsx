import BusinessForm from '@/pages/BusinessForm'
import store from '@/lib/store'
import { Provider } from 'react-redux'

export default function Home() {
  return (
    <Provider store={store}>
      <div className="flex items-center justify-center h-screen">
        <BusinessForm className="ss" />
      </div>
    </Provider>
  )
}
