function ProfileHeader({ user }) {    //le composant reçoit la prop user 
  if (!user) {
    return <p>Chargement...</p>       //affiche chargement le temps que Flask répondent car dans ProfilePage, profile=null initialement
  }

  return (    //affichage
    <div className="profile-header text-center mb-4">
      <img
        src={user.profile_picture || 'https://via.placeholder.com/150'} //src=image affichée //user.profile_picture || 'https://via.placeholder.com/150' signifie "utilise la pdp si elle existe sinon met --- par défaut (ligne suivante)"
        alt="---"
        className="rounded-circle mb-3 profile-image" //image ronde, marge en bas 
      />

      <h2>{user.username}</h2> {/*affiche pseudo*/}
    </div>
  )
}

export default ProfileHeader

//généralités
//le composant ProfileHeader affiche la pdp et le pseudo
//ProfilePage récupère le profil depuis Flask, l'envoie à ProfileHeader qui affiche photo et username