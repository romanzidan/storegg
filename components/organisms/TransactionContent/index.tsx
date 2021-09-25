import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import NumberFormat from 'react-number-format';
import TableRow from './TableRow';
import ButtonTab from './ButtonTab';
import { getMemberTransactions } from '../../../services/member';

export default function TransactionContent() {
  const IMG = process.env.NEXT_PUBLIC_IMG;
  const [data, setData] = useState({});
  const [total, setTotal] = useState(0);

  const getMemberTransactionsAPI = useCallback(async () => {
    const response = await getMemberTransactions();
    if (response.error) {
      toast.error(response.message, {
        position: 'top-center',
        theme: 'dark',
      });
    } else {
      setData(response.data.data);
      setTotal(response.data.total);
    }
  }, []);

  useEffect(() => {
    getMemberTransactionsAPI();
  }, []);
  return (
    <section className="transactions overflow-auto">
      <main className="main-wrapper">
        <div className="ps-lg-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-30">My Transactions</h2>
          <div className="mb-30">
            <p className="text-lg color-palette-2 mb-12">You’ve spent</p>
            <h3 className="text-5xl fw-medium color-palette-1">
              <NumberFormat
                value={total}
                prefix="Rp. "
                displayType="text"
                thousandSeparator="."
                decimalSeparator=","
              />
            </h3>
          </div>
          <div className="row mt-30 mb-20">
            <div className="col-lg-12 col-12 main-content">
              <div id="list_status_title">
                <ButtonTab title="All Trx" active />
                <ButtonTab title="Success" active={false} />
                <ButtonTab title="Pending" active={false} />
                <ButtonTab title="Failed" active={false} />
              </div>
            </div>
          </div>
          <div className="latest-transaction">
            <p className="text-lg fw-medium color-palette-1 mb-14">Latest Transactions</p>
            <div className="main-content main-content-table overflow-auto">
              <table className="table table-borderless">
                <thead>
                  <tr className="color-palette-1">
                    <th className="" scope="col">Game</th>
                    <th scope="col">Item</th>
                    <th scope="col">Price</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody id="list_status_item">
                  <TableRow title="The Royal Game" category="Dekstop" item={290} price={550000} status="Success" image="overview-1" />
                  <TableRow title="Call of Duty:Modern" category="Mobile" item={550} price={720000} status="Pending" image="overview-2" />
                  <TableRow title="Clash of Clans" category="Mobile" item={330} price={450000} status="Failed" image="overview-3" />
                  <TableRow title="Mobile Legends: The New Battle 2021" category="Mobile" item={200} price={290000} status="Pending" image="overview-4" />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
