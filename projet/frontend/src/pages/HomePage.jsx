import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'

function HomePage() {
  const [posts, setPosts] = useState([])
  const user = JSON.parse(localStorage.getItem('user'))

  function loadPosts() {
    fetch('http://127.0.0.1:5001/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
  }

  useEffect(() => {
    if (user) {
      loadPosts()
    }
  }, [])

  if (!user) {
    return <p>Connecte-toi pour voir cette page.</p>
  }

  return (
    <div>
      <h1>Accueil</h1>

      <div className="row">
        {posts.map((post) => (
          <div className="col-12 col-md-6 col-lg-4" key={post.id}>
            <PostCard post={post} onPostDeleted={loadPosts} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage