import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import pathName from '../../utils/path'
import * as AppActions from '../../actions/AppActions.js'
import AlertBox from '../AlerBox/AlertBox'
import './Modal.scss'

const Modal = ({ open }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const AppReducer = useSelector((state) => state.AppReducer)
  const { modalType } = AppReducer

  let modalChild = null
  switch (modalType) {
    case 'logout': {
      modalChild = (
        <AlertBox
          title="Logout"
          message="Are you sure?"
          submitCallBack={() => dispatch(AppActions.fetchLogoutSaga())}
        />
      )
      break
    }
    case 'goToLogin': {
      modalChild = (
        <AlertBox
          title="Please login before register"
          message="Login?"
          submitCallBack={() => navigate(pathName.Login)}
        />
      )
      break
    }
    default:
  }

  if (!open) return null
  return <div className="Modal">{modalChild}</div>
}

export default Modal
