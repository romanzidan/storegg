import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import Input from '../../components/atoms/Input';
import SideBar from '../../components/organisms/SideBar';
import { JWTPayloadTypes, UserTypes } from '../../services/data-types';

export default function EditProfile() {
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    phoneNumber: '',
    avatar: '',
  });
  const IMG = process.env.NEXT_PUBLIC_IMG;
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
    <>
      <SideBar activeMenu="settings" />
      <section className="edit-profile overflow-auto">
        <main className="main-wrapper">
          <div className="ps-lg-0">
            <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
            <div className="bg-card pt-30 ps-30 pe-30 pb-30">
              <form action="">
                <div className="photo d-flex">
                  <div className="position-relative me-20">
                    <img src={`${IMG}/${user.avatar}`} width="90" height="90" alt="" className="avatar img-fluid rounded-circle" />
                    <div
                      className="avatar-overlay position-absolute top-0 d-flex justify-content-center align-items-center"
                    >
                      <img src="/icon/trash.svg" alt="upload" />
                    </div>
                  </div>
                  <div className="image-upload">
                    <label htmlFor="avatar">
                      <img src="/icon/upload.svg" alt="avatar upload" width={90} height={90} />
                    </label>
                    <input id="avatar" type="file" name="avatar" accept="image/png, image/jpeg" />
                  </div>
                </div>
                <div className="pt-30">
                  <Input
                    label="Full Name"
                    value={user.name}
                  />
                </div>
                <div className="pt-30">
                  <Input
                    label="Email Address"
                    value={user.email}
                  />
                </div>
                <div className="pt-30">
                  <Input
                    label="Phone"
                    value={user.phoneNumber}
                  />
                </div>
                <div className="button-group d-flex flex-column pt-50">
                  <button
                    type="button"
                    className="btn btn-save fw-medium text-lg text-white rounded-pill"
                  >
                    Save My Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}
