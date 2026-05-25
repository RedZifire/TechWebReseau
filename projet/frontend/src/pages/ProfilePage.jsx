import { useEffect, useState } from 'react' //useState() crée des variables dynamiques que React met à jour. const[nom, setNom]=useState(valeure initiale) (nom=valeur actuel ; setNom=fonction qui change le valeur).
import ProfileHeader from '../components/ProfileHeader'
import UploadPostForm from '../components/UploadPostForm'
import PostCard from '../components/PostCard'

function ProfilePage() { //creation de la composante react ProfilePage (chaque comp. c'est une fonction qui rend du HTML JSX)
  const [profile, setProfile] = useState(null)  //profile contient les données du profile ; et profile met à jour le profil. la valeure initiale est null car il y a pas encore de données
  const user = JSON.parse(localStorage.getItem('user')) //on prend et on sauvgarde dans une const la valeur avec clé 'user' trouvé dans la memoire du broswer (local storage). JSON.parse convert une string json en un objet javascript

  if (!user) { //si user l'existe pas (parce que pour cette session on s'est pas connecté)
    return <p>Connecte-toi pour voir cette page.</p>
}

  function loadProfile() { //fonction qui prend le profile du backend
    fetch(`http://127.0.0.1:5001/profile/${user.id}`) //fetch() fait une requeste HTTP du profile au backend
      .then((response) => response.json()) //convert la reponse HTTP en JSON
      .then((data) => setProfile(data)) //on sauvgarde les données en Profile (et react met à jour la page)
  }

  useEffect(() => { // useEffect(() => execute du code automatiquement
    if (user) { //si le profile existe
      loadProfile() //va au profil
    }
  }, []) //[] ça veut dire d'éxecuter le code une seule fois

  if (!user) {
    return <p>Connecte-toi pour voir ton profil.</p>
  }

  return ( // on retourne du HTML dans javascript (react transforme du javascript en vrai HTML)
    <div>
      <ProfileHeader user={profile} /> {/* on utilise la composante react ProfileHeader et on lui passe (à utiliser) les données de profile */}

      <UploadPostForm onPostCreated={loadProfile} /> {/* on utilise la composante UploadPostForm et on lui passe a fonction loadProfile */}

      <h3>Mes posts</h3>

      <div className="row"> {/* avec bootstrap */} 
        {/* profile && permet d'executer le code seulement si le profile existe (si existe on prends la liste des post, et pour chaque post: ) */}
        {profile && profile.posts.map((post) => ( 
          <div className="col-12 col-md-6 col-lg-4" key={post.id}>
            {/* on utilise la composante PostCard et on lui donne: */}
            <PostCard 
              post={post} 
              onPostDeleted={loadProfile} 
              showDeleteButton={true} 
            /> {/* données du post */} {/* mettre à jour la page */} {/* montrer le bouton pour eliminer le post */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfilePage //pour epuvoir exporter la page