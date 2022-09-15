import Counter from './components/Counter'
import './App.scss'
import AddOnForm from './components/AddOnForm'
import ProductForm from './components/ProductForm'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        Home page
        <Link to="addon">Add on Page</Link>
        <Link to="productForm">Product Form</Link>
      </div>
    ),
  },
  {
    path: '/addon',
    element: <AddOnForm headerText="Add on" />,
  },
  {
    path: '/productForm',
    element: <ProductForm headerText="Product Form" />,
  },
])

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Counter /> */}
        {/* <ProductForm /> */}
      </header>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
