import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Input from '../../components/atoms/Input';
import SideBar from '../../components/organisms/SideBar';
import { JWTPayloadTypes, UserTypes } from '../../services/data-types';
import { updateProfile } from '../../services/member';

interface UserProps{
  user: UserTypes
}

interface dataUserProps{
  name: string;
  username: string;
  phoneNumber: string;
  avatar: any;
}

export default function EditProfile({ user }: UserProps) {
  const router = useRouter();
  const [dataUser, setDataUser] = useState<dataUserProps>({
    name: '',
    avatar: '',
    username: '',
    phoneNumber: '',
  });
  const IMG = process.env.NEXT_PUBLIC_IMG;
  const [avatarPreview, setAvatarPreview] = useState('/');

  useEffect(() => {
    setDataUser(user);
  }, []);

  const onDeletePreviewAvatar = () => {
    setAvatarPreview('/');
    setDataUser({
      ...dataUser,
      avatar: user.avatar,
    });
  };

  const onSubmit = async () => {
    const data = new FormData();

    data.append('name', dataUser.name);
    data.append('username', dataUser.username);
    data.append('phoneNumber', dataUser.phoneNumber);
    data.append('avatar', dataUser.avatar);

    const response = await updateProfile(data);
    if (response.error) {
      toast.error(response.message);
    } else {
      toast.success('Edit Profile Berhasil, Silahkan Login Kembali !!', {
        position: 'top-center',
        theme: 'colored',
        pauseOnHover: false,
        hideProgressBar: true,
      });
      Cookies.remove('token');
      router.push('/sign-in');
    }
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
                    {avatarPreview === '/' ? (
                      <img src={`${IMG}/${dataUser.avatar}`} width="90" height="90" alt="" className="avatar img-fluid rounded-circle" />
                    ) : (
                      <img src={avatarPreview} width={90} height={90} alt="" className="avatar img-fluid rounded-circle" />
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
                        const img = event.target.files![0];
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
                    label="Username"
                    value={dataUser.username}
                    onChange={(event) => setDataUser({
                      ...dataUser,
                      username: event.target.value,
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
