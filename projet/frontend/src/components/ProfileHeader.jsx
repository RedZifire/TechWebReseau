function ProfileHeader({ user }) {
  if (!user) {
    return <p>Chargement...</p>
  }

  return (
    <div className="profile-header text-center mb-4">
      <img
        src={user.profile_picture || 'https://via.placeholder.com/150'}
        alt="---"
        className="rounded-circle mb-3 profile-image"
      />

      <h2>{user.username}</h2>
    </div>
  )
}

export default ProfileHeader