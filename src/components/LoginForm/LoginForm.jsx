import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Eye, EyeOff, LogIn } from 'lucide-react';

import { signIn } from '../../redux/slices/authSlice';
import { loginSchema } from '../../utils/validationSchemas';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      console.log('Login form submitted with data:', data);
      const result = await dispatch(signIn(data)).unwrap();
      console.log('Login successful:', result);
      toast.success('🎉 Successfully logged in!');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(`❌ Login failed: ${error || 'Please try again.'}`);
    }
  };

  return (
    <div className={styles.loginForm}>
      <h2 className={styles.title}>Sign In</h2>
      <p className={styles.subtitle}>Welcome back! Please sign in to your account</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Email"
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            {...register('email')}
          />
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email.message}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.passwordInputWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className={`${styles.input} ${styles.passwordInput} ${errors.password ? styles.inputError : ''}`}
              {...register('password')}
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <span className={styles.errorMessage}>{errors.password.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
        >
          {isLoading ? (
            <span className={styles.spinner}></span>
          ) : (
            <>
              <LogIn size={20} />
              Log In
            </>
          )}
        </button>
      </form>

      <p className={styles.linkText}>
        Don't have an account?{' '}
        <Link to="/register" className={styles.link}>
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
