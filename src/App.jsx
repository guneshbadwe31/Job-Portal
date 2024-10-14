import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayout from './Layouts/app-layout'
import LandingPage from './pages/landing'
import Onboarding from './pages/onboarding'
import JobListing from './pages/job-listing'
import MyJobs from './pages/my-jobs'
import PostJob from './pages/post-job'
import SavedJobs from './pages/saved-jobs'
import JobPage from './pages/job'
import { ThemeProvider } from './components/ui/theme-provider'
import ProtectedRoutes from './components/protected-routes'


const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoutes>
          <Onboarding />
        </ProtectedRoutes>
        ),
      },
      // {
      //   path: "/joblisting",
      //   element: (
      //     <ProtectedRoutes>
      //     <JobListing />
      //   </ProtectedRoutes>
      //   ),
      // },
      {
        path: "/job",
        element: (
          <ProtectedRoutes>
          <JobListing/>
        </ProtectedRoutes>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoutes>
          <JobPage/>
        </ProtectedRoutes>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoutes>
          <MyJobs/>
        </ProtectedRoutes>
        ),
      },
      {
        path: "/post-job",
        element: (
          <ProtectedRoutes>
          <PostJob/>
        </ProtectedRoutes>
        ),
      },
      {
        path: "/saved-jobs",
        element:(
          <ProtectedRoutes>
          <SavedJobs/>
        </ProtectedRoutes> 
        ),
      },

    ]
  }

])


function App() {

  return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        </ThemeProvider>
  );
}

export default App
