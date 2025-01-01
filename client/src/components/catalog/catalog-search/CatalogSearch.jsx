import { Button, Container, FormControl, FormSelect, Row } from 'react-bootstrap';
import { useForm } from '../../../hooks/abstracts/useForm.js';

export default function CatalogSearch({ searchState, updateSearch, setSearchParams }) {
    const searchHandler = (values) => {
        values.category = values.category.trim();
        values.name = values.name.trim();

        try {
            if (!values.category) {
                throw new Error('Please select a category first');
            }
            const query = {};

            if (values.category !== 'All categories') {
                query.category = values.category;
            }
            if (values.name) {
                query.name = values.name;
            }
            setSearchParams(query);
            updateSearch(values);
        } catch (error) {
            console.log(error.message);
        }
    };

    const { values, changeHandler, submitHandler } = useForm(searchState, searchHandler);
    return (
        <Container>
            <Row className="justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={submitHandler}>
                        <div className="input-group mb-3">
                            <FormSelect
                                className="form-select"
                                style={{ maxWidth: 150 }}
                                name="category"
                                value={values.category}
                                onChange={changeHandler}
                            >
                                <option>All categories</option>
                                <option>T-shirts</option>
                                <option>Shorts</option>
                                <option>Sweatshirts</option>
                                <option>Pants</option>
                            </FormSelect>
                            <FormControl
                                type="text"
                                placeholder="Product name"
                                name="name"
                                value={values.name}
                                onChange={changeHandler}
                            />
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
