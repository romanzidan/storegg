import Image from 'next/dist/client/image';
import { ReactNode } from 'react';

interface CategoryProps{
    children: ReactNode,
    nominal: number,
    icon: string
}

export default function Category(props: CategoryProps) {
  const { children, nominal, icon } = props;
  return (
    <div className="categories-card">
      <div className="d-flex align-items-center mb-24">
        <Image src={`/icon/ic-category/${icon}.svg`} width={60} height={60} alt=" " />
        <p className="color-palette-1 mb-0 ms-12">
          {children}
        </p>
      </div>
      <div>
        <p className="text-sm color-palette-2 mb-1">Total Spent</p>
        <p className="text-2xl color-palette-1 fw-medium m-0">{nominal}</p>
      </div>
    </div>
  );
}
