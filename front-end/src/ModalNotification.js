/**
* Modal notification component when try to delete a quiniela
*/
import React, { useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

function ModalNotification({ modalShow, setModalShow, deleteQuiniela }){
    const [buttonLoading, setButtonLoading] = useState(false);
    const handleDelete = () => {
        setButtonLoading(true);
        deleteQuiniela();
    }
    return (
        <Modal show={modalShow} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>If you want to delete the quiniela, click on the DELETE button otherwise click on the CANCEL button. After a quiniela is eliminated, the data cannot be recovered.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setModalShow(false)} disabled={buttonLoading}>Cancel</Button>
                <Button variant="danger" onClick={() => handleDelete()} disabled={buttonLoading}>
                    { buttonLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Delete" }
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalNotification;