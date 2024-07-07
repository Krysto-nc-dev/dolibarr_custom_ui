import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import backgroundImage from '../assets/images/BG_bouchons.jpeg';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin) {
        navigate('/admin-dashboard');
      } else if (userInfo.role === 'User') {
        navigate('/dashboard');
      } else {
        navigate(redirect);
      }
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt="Background"
          className="w-full h-full object-cover opacity-70"
        />
      </div>
      <div className="relative z-10 w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center text-textColor mb-6">
          Connexion
        </h2>
        <form onSubmit={submitHandler} className="space-y-8">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-textColor">
              Adresse email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-accentColor rounded-md shadow-sm focus:outline-none focus:ring-softBlue focus:border-softBlue sm:text-sm"
              placeholder="Votre email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-textColor">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-accentColor rounded-md shadow-sm focus:outline-none focus:ring-softBlue focus:border-softBlue sm:text-sm"
              placeholder="Votre mot de passe"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                className="h-4 w-4 text-softBlue focus:ring-softBlue border-accentColor rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-textColor">
                Se souvenir de moi
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-softBlue hover:text-accentColor">
                Mot de passe oublié ?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-accentColor rounded-md shadow-sm text-sm font-medium text-textColor bg-accentColor hover:bg-softRed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentColor"
            >
              {isLoading ? 'Connexion...' : 'Connexion'}
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-textColor">
          Vous n'avez pas de compte ?{' '}
          <Link to="/register" className="font-medium text-softBlue hover:text-softRed">
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
