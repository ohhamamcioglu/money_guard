import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { signIn, signUp } from '../../redux/slices/authSlice';
import { toast } from 'react-toastify';
import styles from './AuthForm.module.css';

// Validation schemas
const signInSchema = yup.object({
  email: yup
    .string()
    .email('Geçerli bir email adresi girin')
    .required('Email gereklidir'),
  password: yup
    .string()
    .min(6, 'Şifre en az 6 karakter olmalıdır')
    .required('Şifre gereklidir'),
});

const signUpSchema = yup.object({
  username: yup
    .string()
    .min(2, 'İsim en az 2 karakter olmalıdır')
    .required('İsim gereklidir'),
  email: yup
    .string()
    .email('Geçerli bir email adresi girin')
    .required('Email gereklidir'),
  password: yup
    .string()
    .min(6, 'Şifre en az 6 karakter olmalıdır')
    .required('Şifre gereklidir'),
});

const AuthForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(isSignIn ? signInSchema : signUpSchema),
  });

  const onSubmit = async (data) => {
    try {
      if (isSignIn) {
        await dispatch(signIn(data)).unwrap();
        toast.success('Başarıyla giriş yapıldı!');
      } else {
        await dispatch(signUp(data)).unwrap();
        toast.success('Hesap başarıyla oluşturuldu!');
      }
      reset();
    } catch (error) {
      toast.error(error || 'Bir hata oluştu');
    }
  };

  const toggleMode = () => {
    setIsSignIn(!isSignIn);
    reset();
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>{isSignIn ? 'Giriş Yap' : 'Kayıt Ol'}</h1>
        
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {!isSignIn && (
            <div className={styles.formGroup}>
              <label className={styles.label}>İsim</label>
              <input
                type="text"
                placeholder="Adınız"
                className={`${styles.input} ${errors.username ? styles.error : ''}`}
                {...register('username')}
              />
              {errors.username && (
                <span className={styles.errorMessage}>{errors.username.message}</span>
              )}
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              className={`${styles.input} ${errors.email ? styles.error : ''}`}
              {...register('email')}
            />
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Şifre</label>
            <input
              type="password"
              placeholder="••••••••"
              className={`${styles.input} ${errors.password ? styles.error : ''}`}
              {...register('password')}
            />
            {errors.password && (
              <span className={styles.errorMessage}>{errors.password.message}</span>
            )}
          </div>

          {error && <span className={styles.errorMessage}>{error}</span>}

          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading 
              ? (isSignIn ? 'Giriş yapılıyor...' : 'Kayıt oluşturuluyor...') 
              : (isSignIn ? 'Giriş Yap' : 'Kayıt Ol')
            }
          </button>
        </form>

        <p className={styles.toggleText}>
          {isSignIn ? 'Hesabınız yok mu?' : 'Zaten hesabınız var mı?'}{' '}
          <button type="button" className={styles.toggleLink} onClick={toggleMode}>
            {isSignIn ? 'Kayıt Ol' : 'Giriş Yap'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
