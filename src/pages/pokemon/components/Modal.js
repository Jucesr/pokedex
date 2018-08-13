import React from 'react'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'

export const Modal = ({isOpen, title, message, category, closeModal, onYes}) => {

  if(isOpen){
    return (
        <ReactModal
          ariaHideApp={false}
          isOpen={isOpen}
          closeTimeoutMS={200}
          className={`Modal Modal__${category}`}
        >
          {category == 'async' ? <img src="/img/loading.gif"></img> : <img src={`/assets/${category}.png`}></img>}
          <h3 className="Modal__title">{title}</h3>
          {message && <p className = "Modal__body">{message}</p>}


          <div className="Modal__buttons">
            {category == 'question' &&
              [<button key="1" className="Modal__button Modal__button_yes" onClick={() => {
                onYes();
                closeModal();
              }}>Yes</button>,
               <button key="2" className="Modal__button Modal__button_no" onClick={closeModal}>No</button>
              ]
            }

            {category != 'async' && category != 'question' && <button className={`Modal__button Modal__button__${category}`} onClick={closeModal}>Close</button>}
          </div>


        </ReactModal>
    )
  }else {
    return null
  }

}

// Modal.displayName = 'Modal';
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  category: PropTypes.oneOf(['info', 'async', 'error', 'success', 'question']),
  closeModal: PropTypes.func.isRequired,
  onYes: PropTypes.func
}


const mapStateToProps = state => ({
  isOpen: !!state.ui.modal,
  title: state.ui.modal ? state.ui.modal.title : '',
  message: state.ui.modal ? state.ui.modal.message : '',
  category: state.ui.modal ? state.ui.modal.category : 'info',
  onYes: state.ui.modal ? state.ui.modal.onYes : () => {},
})


