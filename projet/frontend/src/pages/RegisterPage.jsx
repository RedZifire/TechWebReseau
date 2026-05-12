import RegisterForm from '../components/RegisterForm'

function RegisterPage() {
  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-6">
        <h1 className="mb-4 text-center">Créer un compte</h1>

        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage