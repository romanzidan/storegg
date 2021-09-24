import Image from 'next/image';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Profile from './Profile';
import Footer from './Footer';
import MenuItem from './MenuItem';

interface SideBarProps{
  activeMenu: 'overview' | 'transactions' | 'settings'
}

export default function SideBar(props: SideBarProps) {
  const { activeMenu } = props;
  const router = useRouter();

  const onLogout = () => {
    Cookies.remove('token');
    toast.success('Logout Berhasil !!!', {
      position: 'top-center',
      theme: 'colored',
      pauseOnHover: false,
      autoClose: 3000,
    });
    router.push('/sign-in');
  };

  return (
    <section className="sidebar">
      <div className="content pt-50 pb-30 ps-30">
        <Profile />
        <div className="menus">
          <MenuItem title="Overview" icon="overview" href="/member" active={activeMenu === 'overview'} />
          <MenuItem title="Transactions" icon="transactions" href="/member/transactions" active={activeMenu === 'transactions'} />
          <MenuItem title="Messages" icon="messages" href="/member" />
          <MenuItem title="Card" icon="card" href="/member" />
          <MenuItem title="Rewards" icon="rewards" href="/member" />
          <MenuItem title="Settings" icon="settings" href="/member/edit-profile" active={activeMenu === 'settings'} />
          <div className="item mb-30">
            <div className="me-3">
              <Image src="/icon/ic-menu/logout.svg" width={25} height={25} alt="Overview" />
            </div>
            <p className="item-title m-0">
              <button
                type="button"
                className="text-lg text-decoration-none"
                onClick={onLogout}
              >
                Logout
              </button>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </section>
  );
}
