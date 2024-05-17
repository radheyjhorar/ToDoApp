import './App.css'
import { AddNewTask, Home } from './pages'
import {createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Header } from './template';

function App() {

  const Layout = () => {
    return (
      <div className='main'>
        <Header />
        <div className='container'>
          <div className='menuContainer'>
            {/* <Sidebar /> */}
          </div>
          <div className='contentContainer'>
            <Outlet />
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/addnewtask",
          element: <AddNewTask />
        },
      ]
    },
    // {
    //   path: "/login",
    //   element: <Login />,
    // },
  ])

  return <RouterProvider router={router} />
}

export default App
