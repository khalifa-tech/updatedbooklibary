import React from 'react'
import {Button,Modal} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrash,} from '@fortawesome/free-solid-svg-icons'


const Example = ({show, handleClose, handleShow, handleDelete}) => {
    
    return (
      <>
        <Button variant="secondary" style={{marginRight: 10, color: 'red'}} onClick={handleShow}>
              <FontAwesomeIcon icon={faTrash} />
        </Button>
  
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Warning!!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this book?</Modal.Body>
          <Modal.Footer className='modalfooter'>
            <Button variant="secondary" style={{backgroundColor: 'green'}} onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="secondary" style={{backgroundColor: 'red'}} onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  export default Example;