import SideBar from '../../../components/organisms/SideBar';
import TransactionDetailContent from '../../../components/organisms/TransactionDetailContent';
import { getTransactionDetail } from '../../../services/member';

export default function TransactionsDetail({ transactionDetail }) {
  console.log('detail: ', transactionDetail);
  return (
    <>
      <SideBar activeMenu="transactions" />
      <TransactionDetailContent />
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
