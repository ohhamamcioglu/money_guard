import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Eye, EyeOff, UserPlus } from 'lucide-react';

import { signUp } from '../../redux/slices/authSlice';
import { registrationSchema } from '../../utils/validationSchemas';
import ProgressBar from '../ProgressBar';
import styles from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(registrationSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const onSubmit = async (data) => {
    try {
      console.log('Form submitted with data:', data);
      const { confirmPassword: _, ...userData } = data;
      
      const result = await dispatch(signUp(userData)).unwrap();
      console.log('Registration successful:', result);
      
      toast.success('🎉 Registration successful! Welcome to Money Guard!');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error(`❌ Registration failed: ${error || 'Please try again.'}`);
    }
  };

  return (
    <div className={styles.registrationForm}>
      <h2 className={styles.title}>Sign Up</h2>
      <p className={styles.subtitle}>Create your account to start managing your finances</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Username"
            className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
            {...register('username')}
          />
          {errors.username && (
            <span className={styles.errorMessage}>{errors.username.message}</span>
          )}
        </div>

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

        <div className={styles.inputGroup}>
          <div className={styles.passwordInputWrapper}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              className={`${styles.input} ${styles.passwordInput} ${errors.confirmPassword ? styles.inputError : ''}`}
              {...register('confirmPassword')}
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className={styles.errorMessage}>{errors.confirmPassword.message}</span>
          )}
          
          {confirmPassword && (
            <ProgressBar 
              password={password} 
              confirmPassword={confirmPassword}
            />
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
              <UserPlus size={20} />
              Register
            </>
          )}
        </button>
      </form>

      <p className={styles.linkText}>
        Already have an account?{' '}
        <Link to="/login" className={styles.link}>
          Log in
        </Link>
      </p>
    </div>
  );
};

export default RegistrationForm;
