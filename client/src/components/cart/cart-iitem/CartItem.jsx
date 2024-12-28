import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './cartItem.module.css';
import { useRemoveFromUserCart } from '../../../hooks/useCart.js';
import { useAuthContext } from '../../../contexts/AuthContext.jsx';

// TODO: when listing cart items, look in stock for said size,
// 1) if quantity is less than chosen amount, display message that the max amount available is: ___
// and do not add item for the next step until the amount is less or equal to the in stock amount
// 2) if item is out of stock of said size, display message to user and do not add item for the next step
export default function CartItem({ size, quantity, productInfo, setUserCartProducts }) {
    const { userId } = useAuthContext();
    const removeFromCart = useRemoveFromUserCart();

    const deleteCartItemHandler = async () => {
        try {
            await removeFromCart(productInfo._id, userId, size);

            setUserCartProducts((oldProducts) => {
                const index = oldProducts.findIndex((product) => product.productInfo._id == productInfo._id);
                return oldProducts.toSpliced(index, 1);
            });
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <Row className="d-flex flex-column flex-xs-row flex-sm-row flex-md-row flex-lg-row mt-4 bg-light border rounded shadow">
            <Col sm={2} className="p-3 p-sm-0 d-flex justify-content-center align-items-center">
                <Card as={Link} to={`/catalog/${productInfo._id}/details`}>
                    <img src={productInfo.imageUrl} className={styles['img-fixed-height']} />
                </Card>
            </Col>
            <Col sm={8} className="col-7 col-md-8 col-lg-8 col-xl-8 col-xxl-8 d-flex flex-column justify-content-around">
                <Link
                    className="d-flex align-items-center gap-4 text-decoration-none text-dark"
                    to={`/catalog/${productInfo._id}/details`}
                >
                    <h5 className="text-secondary">{productInfo.brand}</h5>
                    <h4 className="">{productInfo.name}</h4>
                </Link>
                <div className="d-flex gap-3 align-items-center">
                    <p>
                        Size: <span>{size}</span>
                    </p>
                    <p>
                        Amount: <span>{quantity}</span>
                    </p>
                </div>
            </Col>
            <Col sm={1} className="d-flex flex-column justify-content-between py-3">
                <i onClick={deleteCartItemHandler} role="button" className="fa-solid fa-trash fa fa-2x text-danger mx-3"></i>
                <h4>${Number(productInfo.price).toFixed(2)}</h4>
            </Col>
        </Row>
    );
}
