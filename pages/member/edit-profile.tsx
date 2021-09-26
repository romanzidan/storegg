import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import Input from '../../components/atoms/Input';
import SideBar from '../../components/organisms/SideBar';
import { JWTPayloadTypes, UserTypes } from '../../services/data-types';

interface UserProps{
  user : UserTypes
}

export default function EditProfile(props: UserProps) {
  const { user } = props;
  const [dataUser, setDataUser] = useState({});
  const IMG = process.env.NEXT_PUBLIC_IMG;
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    setDataUser(user);
  }, []);

  const onDeletePreviewAvatar = () => {
    setAvatarPreview(null);
    setDataUser({
      ...dataUser,
      avatar: user.avatar,
    });
  };

  const onSubmit = () => {
    console.log('data: ', dataUser);
  };

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
                    {avatarPreview ? (
                      <img src={avatarPreview} width={90} height={90} alt="" className="avatar img-fluid rounded-circle" />
                    ) : (
                      <img src={`${IMG}/${dataUser.avatar}`} width="90" height="90" alt="" className="avatar img-fluid rounded-circle" />
                    )}
                    <div
                      className="avatar-overlay position-absolute top-0 d-flex justify-content-center align-items-center"
                      onClick={onDeletePreviewAvatar}
                      aria-hidden="true"
                    >
                      <img src="/icon/trash.svg" alt="upload" />
                    </div>
                  </div>
                  <div className="image-upload">
                    <label htmlFor="avatar">
                      <img src="/icon/upload.svg" alt="avatar upload" width={90} height={90} />
                    </label>
                    <input
                      id="avatar"
                      type="file"
                      name="avatar"
                      accept="image/png, image/jpeg"
                      onChange={(event) => {
                        const img = event.target.files[0];
                        setAvatarPreview(URL.createObjectURL(img));
                        return setDataUser({
                          ...dataUser,
                          avatar: img,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="pt-30">
                  <Input
                    label="Full Name"
                    value={dataUser.name}
                    onChange={(event) => setDataUser({
                      ...dataUser,
                      name: event.target.value,
                    })}
                  />
                </div>
                <div className="pt-30">
                  <Input
                    label="Email Address"
                    value={dataUser.email}
                    onChange={(event) => setDataUser({
                      ...dataUser,
                      email: event.target.value,
                    })}
                  />
                </div>
                <div className="pt-30">
                  <Input
                    label="Phone"
                    value={dataUser.phoneNumber}
                    onChange={(event) => setDataUser({
                      ...dataUser,
                      phoneNumber: event.target.value,
                    })}
                  />
                </div>
                <div className="button-group d-flex flex-column pt-50">
                  <button
                    type="button"
                    className="btn btn-save fw-medium text-lg text-white rounded-pill"
                    onClick={onSubmit}
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

interface GetServerSideProps{
  req: {
    cookies: {
      token: string
    }
  }
}

export async function getServerSideProps({ req }: GetServerSideProps) {
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }

  const jwtToken = Buffer.from(token, 'base64').toString('ascii');
  const payload: JWTPayloadTypes = jwtDecode(jwtToken);
  const userFromPayload: UserTypes = payload.player;
  return {
    props: {
      user: userFromPayload,
    },
  };
}
