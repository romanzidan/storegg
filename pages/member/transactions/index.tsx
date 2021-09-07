import SideBar from '../../../components/organisms/SideBar';
import TransactionContent from '../../../components/organisms/TransactionContent';

export default function Transactions() {
  return (
    <>
      <SideBar activeMenu="transactions" />
      <TransactionContent />
    </>
  );
}
