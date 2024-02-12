import React from 'react'

interface ModalProps {
  onClose: () => void
}

const NicknameModal: React.FC<ModalProps> = ({onClose}) => {
  return (
    <div className="click-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <p id="nickname-text">변경하실 닉네임을 입력해 주세요</p>
        <input type="text" />
        <button className="check">.</button>
      </div>
    </div>
  )
}

export default NicknameModal
