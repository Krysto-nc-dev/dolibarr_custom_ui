import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useLoginMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'
import backgroundImage from '../assets/images/BG_bouchons.jpeg'
import { Loader, MoveLeftIcon, MoveRightIcon } from 'lucide-react'
import { BsFacebook, BsGoogle } from 'react-icons/bs'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()

  const { userInfo } = useSelector((state) => state.auth)

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin) {
        navigate('/admin-dashboard')
      } else if (userInfo.role === 'User') {
        navigate('/dashboard')
      } else {
        navigate(redirect)
      }
    }
  }, [navigate, redirect, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate(redirect)
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (

    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative flex flex-col m-6 space-y-10 bg-gray-700 shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0">
          {/* left side  */}
          <div className="p-4 md:p-20 ">
            {/* top content */}
            <h2 className="mb-5 text-4xl font-bold ">Connection</h2>
            <p className="max-w-md mb-12 font-light">
              Connectez-vous à votre compte pour profiter de notre plateforme.
            </p>
            <form onSubmit={submitHandler}>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-textColor rounded-md placeholder:font-light mb-3 "
                placeholder="Entrez votre addresse"
              />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-textColor rounded-md placeholder:font-light "
                placeholder="Entrez votre mot de passe"
              />
              <button
                type="submit"
                className="w-full mt-6  flex justify-center items-center p-3 space-x-4 font-bold  rounded-md  px-9  bg-primaryColor shadow-gray-600 hover:bg-opacity-90 shadow-sm hover:shadow-lg transition hover:-translate-y-0.5 duration-150"
              >
                {isLoading ? <Loader /> : 'Connexion'}
              </button>
            </form>
            <div className="flex items-center justify-between mt-6">
              <Link to="/register" className="text-primaryColor hover:text-opacity-90">
                Créer un compte
              </Link>
              <Link to="/forgot-password" className="text-primaryColor hover:text-opacity-90">
                Mot de passe oublié ?
              </Link>
            </div>

            {/* middle-content */}
           
            <div className="mt-8 border-b border-b-gray-200"></div>

               <div className="flex flex-col items-center justify-between mt-6 space-y-6 md:flex-row md:space-y-0">
              <Link to={"/"} className="w-full  flex justify-center items-center p-3 space-x-4 font-bold text-white  rounded-md  px-9  bg-primaryColor shadow-gray-600 hover:bg-opacity-90 shadow-sm hover:shadow-lg  transition hover:-translate-y-0.5 duration-150">
                <MoveRightIcon className="mr-5" />
               Retour au site
              </Link>
            </div>
          </div>

          {/* right side  */}
          <img
            src={backgroundImage}
            className="w-[600px] hidden md:block object-cover rounded-r-2xl"
            alt="Bouchons de bouteilles en plastique"
          />
        </div>
      </div>
    </>
  )
}

export default LoginScreen
