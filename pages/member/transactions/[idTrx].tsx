import SideBar from '../../../components/organisms/SideBar';
import TransactionDetailContent from '../../../components/organisms/TransactionDetailContent';
import { HistoryTransactionTypes } from '../../../services/data-types';
import { getTransactionDetail } from '../../../services/member';

interface TransactionsDetailProps{
  transactionDetail: HistoryTransactionTypes
}

export default function TransactionsDetail(props: TransactionsDetailProps) {
  const { transactionDetail } = props;
  return (
    <>
      <SideBar activeMenu="transactions" />
      <TransactionDetailContent data={transactionDetail} />
    </>
  );
}

interface GetServerSideProps{
  req: {
    cookies: {
      token: string
    }
  },
  params: {
    idTrx: string
  }
}

export async function getServerSideProps({ req, params }: GetServerSideProps) {
  const { idTrx } = params;
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
  const response = await getTransactionDetail(idTrx, jwtToken);
  return {
    props: {
      transactionDetail: response.data,
    },
  };
}
