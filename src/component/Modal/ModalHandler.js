import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { connect } from 'react-redux'
import { toggleModal} from '../../redux/ducks/modal'
import './Modal.css'
import { useHistory } from "react-router-dom";
function ModalHandler(props) {
  const {modal, toggleModal} = props;
  //console.log(modal)
  const {component: MyPanel} = modal;
  const modalClass = modal.showModal?"panel-pop panel-pop-image show":"panel-pop panel-pop-image hide";
  const history = useHistory()
  return (
    <React.Fragment>
      <div className="put-wrap-pop">
        {modal.showModal ? <div className='wrap-pop' onClick={toggleModal}></div> : null}
      </div>
      <div className={modalClass}>
        <i className='icon-cancel'>
          <FontAwesomeIcon icon={faTimes} size='xs' onClick={toggleModal}/>
        </i>
        <div className='pop-border-radius'>
          {MyPanel==null?"":<MyPanel history={history}/>}
        </div>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal
  }
}

const mapDispatchToProps = {
  toggleModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalHandler)