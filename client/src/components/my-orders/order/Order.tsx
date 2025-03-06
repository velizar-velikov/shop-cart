import { Container } from 'react-bootstrap';
import { parseDate } from '../../../util/parseDate.ts';
import OrderItem from './order-item/OrderItem.tsx';

import styles from './order.module.css';
import { OrderDetailed } from '../../../types/order.ts';

export default function Order({ _createdOn, paymentType, address, products }: OrderDetailed) {
    const date = parseDate(_createdOn);
    const priceOfOrder = products.reduce((acc, val) => acc + val.priceOfPurchase * val.quantity, 0);

    return (
        <Container className="px-0 pt-3 border rounded-1">
            <h4 className="m-0 pb-2 px-3 pt-2 border-bottom">Order #{_createdOn.toString().slice(4)}</h4>
            <div className="p-3">
                <div className="d-flex align-items-center gap-2">
                    <p className={`mb-1 ${styles.para}`}>{date}</p>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <p className={`mb-1 ${styles.para}`}>Total: </p>
                    <p className={`mb-1 ${styles.para}`}>${priceOfOrder}</p>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <p className={`mb-1 ${styles.para}`}>Delivery address: </p>
                    <p className={`mb-1 ${styles.para}`}>{address}</p>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <p className={`mb-0 ${styles.para}`}>Payment method: </p>
                    <p className={`mb-0 ${styles.para}`}>{paymentType[0].toUpperCase() + paymentType.slice(1)}</p>
                </div>
            </div>
            <Container className="d-flex gap-2 flex-wrap p-3 pt-4">
                {products.map((product) => (
                    <OrderItem key={product.productId} {...product} />
                ))}
            </Container>
        </Container>
    );
}
