import { Button, Container, FormControl, FormSelect, Row } from 'react-bootstrap';

export default function CatalogSearch() {
    return (
        <Container>
            <Row className="justify-content-center">
                <div className="col-md-6">
                    <form>
                        <div className="input-group mb-3">
                            <FormSelect className="form-select" style={{ maxWidth: 150 }}>
                                <option defaultValue="All categories">All Categories</option>
                                <option defaultValue="1">T-shirts</option>
                                <option defaultValue="2">Shorts</option>
                                <option defaultValue="3">Sweatshirts</option>
                            </FormSelect>
                            <FormControl type="text" placeholder="Product name" />
                            <Button className="btn-primary" type="submit">
                                Search
                            </Button>
                        </div>
                    </form>
                </div>
            </Row>
        </Container>
    );
}
