import SideBar from '../../../components/organisms/SideBar';
import TransactionDetailContent from '../../../components/organisms/TransactionDetailContent';

export default function TransactionsDetail() {
  return (
    <>
      <SideBar activeMenu="transactions" />
      <TransactionDetailContent />
    </>
  );
}
