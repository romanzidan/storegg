import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { JWTPayloadTypes, UserTypes } from '../../../services/data-types';

export default function Profile() {
  const imgAPI = process.env.NEXT_PUBLIC_IMG;
  const [user, setUser] = useState({
    name: '',
    avatar: '',
    email: '',
  });
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const jwtToken = atob(token);
      const payload: JWTPayloadTypes = jwtDecode(jwtToken);
      const userFromPayload: UserTypes = payload.player;
      setUser(userFromPayload);
    }
  }, []);
  return (
    <div className="user text-center pb-50 pe-30">
      {user.avatar ? (
        <Image src={`${imgAPI}/${user.avatar}`} width={90} height={90} alt="avatar" className="img-fluid mb-20 rounded-circle" />
      ) : (
        <p>Loading...</p>
      )}
      <h2 className="fw-bold text-xl color-palette-1 m-0">{user.name}</h2>
      <p className="color-palette-2 m-0">{user.email}</p>
    </div>
  );
}
