import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import EditProfilePage from './pages/EditProfilePage'
import PostDetailsPage from './pages/PostDetailsPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/accueil" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/modifier" element={<EditProfilePage />} />
          <Route path="/post/:id" element={<PostDetailsPage />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App