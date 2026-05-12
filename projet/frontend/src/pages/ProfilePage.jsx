import { useEffect, useState } from 'react'

import ProfileHeader from '../components/ProfileHeader'
import UploadPostForm from '../components/UploadPostForm'
import PostCard from '../components/PostCard'

function ProfilePage() {
  const [profile, setProfile] = useState(null)
  const user = JSON.parse(localStorage.getItem('user'))

  if (!user) {
    return <p>Connecte-toi pour voir cette page.</p>
}

  function loadProfile() {
    fetch(`http://127.0.0.1:5001/profile/${user.id}`)
      .then((response) => response.json())
      .then((data) => setProfile(data))
  }

  useEffect(() => {
    if (user) {
      loadProfile()
    }
  }, [])

  if (!user) {
    return <p>Connecte-toi pour voir ton profil.</p>
  }

  return (
    <div>
      <ProfileHeader user={profile} />

      <UploadPostForm onPostCreated={loadProfile} />

      <h3>Mes posts</h3>

      <div className="row">
        {profile && profile.posts.map((post) => (
          <div className="col-12 col-md-6 col-lg-4" key={post.id}>
            <PostCard post={post} onPostDeleted={loadProfile} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfilePage