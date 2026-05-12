import EditProfileForm from '../components/EditProfileForm'

function EditProfilePage() {
  const user = JSON.parse(localStorage.getItem('user'))

  if (!user) {
    return <p>Connecte-toi pour voir cette page.</p>
}
  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-5">
        <EditProfileForm />
      </div>
    </div>
  )
}

export default EditProfilePage