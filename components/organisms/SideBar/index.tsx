import Profile from './Profile';
import Footer from './Footer';
import MenuItem from './MenuItem';

export default function SideBar() {
  return (
    <section className="sidebar">
      <div className="content pt-50 pb-30 ps-30">
        <Profile />
        <div className="menus">
          <MenuItem title="Overview" icon="overview" href="/member" active />
          <MenuItem title="Transactions" icon="transactions" href="/member/transactions" />
          <MenuItem title="Messages" icon="messages" href="/member/messages" />
          <MenuItem title="Card" icon="card" href="/member/cards" />
          <MenuItem title="Rewards" icon="rewards" href="/member/rewards" />
          <MenuItem title="Settings" icon="settings" href="/member/edit-profile" />
          <MenuItem title="Log Out" icon="logout" href="/logout" />
        </div>
        <Footer />
      </div>
    </section>
  );
}
