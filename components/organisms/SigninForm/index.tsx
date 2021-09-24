import cx from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

import { setLogin } from '../../../services/auth';

export default function SigninForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const className = {
    label: cx('form-label text-lg fw-medium color-palette-1 mb-10'),
  };
  const router = useRouter();

  const onSubmit = async () => {
    const data = {
      email,
      password,
    };
    if (!email || !password) {
      toast.dismiss();
      toast.error('Email dan Password wajib diisi!!', {
        position: 'top-center',
        theme: 'colored',
        pauseOnHover: false,
        hideProgressBar: true,
      });
    } else {
      const response = await setLogin(data);
      if (response.error) {
        toast.dismiss();
        toast.error(response.message, {
          position: 'top-center',
          theme: 'colored',
          pauseOnHover: false,
          hideProgressBar: true,
        });
      } else {
        toast.dismiss();
        toast.success('Login Berhasil', {
          position: 'top-center',
          theme: 'colored',
          delay: 3000,
          pauseOnHover: false,
        });
        const { token } = response.data;
        const tokenBase64 = btoa(token);
        Cookies.set('token', tokenBase64, { expires: 1 });
        router.push('/');
      }
    }
  };
  return (
    <>
      <h2 className="text-4xl fw-bold color-palette-1 mb-10">Sign In</h2>
      <p className="text-lg color-palette-1 m-0">Masuk untuk melakukan proses top up</p>
      <div className="pt-50">
        <label htmlFor="email" className={className.label}>
          Email
          Address
        </label>
        <input
          type="email"
          className="form-control rounded-pill text-lg"
          id="email"
          aria-describedby="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="pt-30">
        <label htmlFor="password" className={className.label}>
          Password
        </label>
        <input
          type="password"
          className="form-control rounded-pill text-lg"
          id="password"
          aria-describedby="password"
          placeholder="Your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="button-group d-flex flex-column mx-auto pt-50">
        <button
          type="button"
          className="btn btn-sign-in fw-medium text-lg text-white rounded-pill mb-16"
          onClick={onSubmit}
        >
          Continue to Sign In
        </button>
        <Link href="/sign-up">
          <a
            className="btn btn-sign-up fw-medium text-lg color-palette-1 rounded-pill"
          >
            Sign
            Up
          </a>
        </Link>
      </div>
    </>
  );
}
