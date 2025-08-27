import { Provider, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { store } from './redux/store';
import Home from './pages/Home';
import AuthForm from './components/AuthForm';
import 'react-toastify/dist/ReactToastify.css';

function AppContent() {
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <div className="App">
      {isAuthenticated ? <Home /> : <AuthForm />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App
