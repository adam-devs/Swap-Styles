import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Badge from 'react-bootstrap/Badge';
import InputGroup from 'react-bootstrap/InputGroup';


function TradeOut() {
    const [item, setItem] = React.useState('');
    const [validated, setValidated] = React.useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        console.log(this.state.item.title);
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: this.state.item.title,
                description: this.state.item.description,
                image: this.state.item.image,
                age: this.state.item.age,
                condition: this.state.item.condition
             })
        };
        
        fetch('/api/addProduct', request);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setItem({
            ...item,
            [name]: value
        });
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group controlId="validationCustom01" as={Col}>
                    <FloatingLabel label="Name of Item">
                        <Form.Control 
                            required
                            type="text" 
                            placeholder="Enter Title" 
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback>Cool Title!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please provide a title.</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group controlId="validationCustom02" as={Col}>
                    <FloatingLabel label="Description">
                        <Form.Control 
                            required
                            type="text"
                            placeholder="Enter Description"
                            onChange={handleChange} 
                        />
                        <Form.Control.Feedback>Nice Description!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please provide a description.</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group controlId="validationCustom03" as={Col} lg={8}>
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control 
                        required
                        type="file"
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback>Great Image!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Please provide an image.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationCustom04" as={Col}>
                    <Form.Label>Age</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            required
                            type="number"
                            max={10}
                            min={0}
                            class="form-control"
                            aria-describedby="inputGroupPrepend"
                            onChange={handleChange}
                        />
                        <InputGroup.Text id="inputGroupPrepend">Year(s)</InputGroup.Text>
                        <Form.Control.Feedback type="invalid">Please provide an age.</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group controlId="validationCustom05" as={Col}>
                    <Form.Label>Condition</Form.Label>
                    <Row>
                        <Col lg={1}>
                            <Badge pill bg="danger"> 
                                Poor
                            </Badge>
                        </Col>
                        <Col>
                            <Form.Range onChange={
                                (event) => {
                                    setItem({
                                        ...item,
                                        condition: event.target.value
                                    });
                                }
                            }/>
                        </Col>
                        <Col lg={1}>
                            <Badge pill bg="success">
                                Excellent
                            </Badge>
                        </Col>
                    </Row>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Button variant="primary" type="submit">
                            Submit
                    </Button>
                </Form.Group>
            </Row>
        </Form>

    );

}

export default TradeOut;