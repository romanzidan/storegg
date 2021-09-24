import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getMemberOverview } from '../../../services/player';
import Category from './Category';
import TableRow from './TableRow';

export default function OverviewContent() {
  const IMG = process.env.NEXT_PUBLIC_IMG;
  const [count, setCount] = useState([{
    _id: '',
    value: 0,
    name: '',
  }]);
  const [data, setData] = useState([{
    _id: '',
    historyVoucherTopup: {
      gameName: '',
      category: '',
      thumbnail: '',
      coinName: '',
      coinQuantity: 0,
      price: 0,
    },
    value: 0,
    status: 'pending',
  }]);

  useEffect(() => {
    (async () => {
      const response = await getMemberOverview();
      if (response.error) {
        toast.error(response.message, {
          position: 'top-center',
          theme: 'dark',
        });
      } else {
        setCount(response.data.count);
        setData(response.data.data);
        console.log(response.data);
      }
    })();
  }, []);
  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">Overview</h2>
        <div className="top-up-categories mb-30">
          <p className="text-lg fw-medium color-palette-1 mb-14">Top Up Categories</p>
          <div className="main-content">
            <div className="row">
              {count.map((item) => {
                if (item.name !== 'Desktop' && item.name !== 'Mobile') {
                  return (
                    <div
                      key={item._id}
                      className="col-lg-4 ps-15 pe-15 pb-lg-0 pb-4"
                    >
                      <Category
                        nominal={item.value}
                        icon="Desktop"
                      >
                        Game
                        {' '}
                        <br />
                        {' '}
                        {item.name}
                      </Category>
                    </div>
                  );
                }
                return (
                  <div
                    key={item._id}
                    className="col-lg-4 ps-15 pe-15 pb-lg-0 pb-4"
                  >
                    <Category
                      nominal={item.value}
                      icon={item.name}
                    >
                      Game
                      {' '}
                      <br />
                      {' '}
                      {item.name}
                    </Category>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="latest-transaction">
          <p className="text-lg fw-medium color-palette-1 mb-14">Latest Transactions</p>
          <div className="main-content main-content-table overflow-auto">
            <table className="table table-borderless">
              <thead>
                <tr className="color-palette-1">
                  <th className="text-start" scope="col">Game</th>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <TableRow
                    key={item._id}
                    title={item.historyVoucherTopup.gameName}
                    category={item.historyVoucherTopup.category}
                    item={`${item.historyVoucherTopup.coinQuantity} ${item.historyVoucherTopup.coinName}`}
                    price={item.value}
                    status={item.status}
                    image={`${IMG}/${item.historyVoucherTopup.thumbnail}`}
                  />
                ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
