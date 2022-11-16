import classNames from 'classnames'
import { lazy, Suspense } from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('./views/Home'))
const About = lazy(() => import('./views/About'))

function App() {
  return (
    <BrowserRouter>
      <section className="w-full">
        <header className="w-full h-16 bg-white flex flex-row flex-nowrap justify-start items-center gap-4 px-4 shadow-md sticky z-10 top-0 dark:bg-slate-800">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              classNames(
                'hover:text-blue-500',
                'hover:underline',
                'focus:text-blue-600',
                'focus-within:underline',
                'focus-within:outline-none',
                'transition-colors',
                {
                  'text-blue-500': isActive,
                  'text-gray-400': !isActive
                }
              )
            }>
            Home
          </NavLink>
          <span className="text-gray-400">|</span>
          <NavLink
            to="/about"
            end
            className={({ isActive }) =>
              classNames(
                'hover:text-blue-500',
                'hover:underline',
                'focus:text-blue-600',
                'focus-within:underline',
                'focus-within:outline-none',
                'transition-colors',
                {
                  'text-blue-500': isActive,
                  'text-gray-400': !isActive
                }
              )
            }>
            About
          </NavLink>
        </header>
        <main className="p-4">
          <Routes>
            <Route
              index
              element={
                <Suspense>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="about"
              element={
                <Suspense>
                  <About />
                </Suspense>
              }
            />
          </Routes>
        </main>
      </section>
    </BrowserRouter>
  )
}

export default App
