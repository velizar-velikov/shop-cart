import Pagination from 'react-bootstrap/Pagination';

export default function Paginator() {
    return (
        <div className="d-flex justify-content-center mt-4">
            <Pagination>
                <Pagination.First />
                <Pagination.Prev />

                <Pagination.Item active>{1}</Pagination.Item>

                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        </div>
    );
}
