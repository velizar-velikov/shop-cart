import { Button, Container, FormControl, FormSelect, Row } from 'react-bootstrap';

export default function CatalogSearch() {
    return (
        <Container>
            <Row className="justify-content-center">
                <div className="col-md-6">
                    <form>
                        <div className="input-group mb-3">
                            <FormSelect
                                className="form-select"
                                style={{ maxWidth: 150 }}
                                name="category"
                                defaultValue="All categories"
                            >
                                <option>All Categories</option>
                                <option>T-shirts</option>
                                <option>Shorts</option>
                                <option>Sweatshirts</option>
                            </FormSelect>
                            <FormControl type="text" placeholder="Product name" name="name" />
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
