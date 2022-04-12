import { useDispatch } from 'react-redux'
import * as AppActions from '../actions/AppActions.js'
import Button from '../component/Button'
import './AlertBox.scss'

const AlertBox = ({ title, message, submitCallBack }) => {
  const dispatch = useDispatch()
  function closeModal() {
    dispatch(AppActions.closeModal())
  }
  return (
    <div className="alertBox">
      <div className="alertBoxTitle">{title}</div>
      <div className="alertBoxMessage">{message}</div>
      <Button
        propsClassName="noButton"
        text="no"
        onClick={() => closeModal()}
      />
      <Button
        propsClassName="yesButton"
        text="yes"
        onClick={() => {
          closeModal()
          submitCallBack()
        }}
      />
    </div>
  )
}

export default AlertBox
