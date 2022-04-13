import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as AppAction from '../../actions/AppActions'
import Button from '../../component/Button/Button'
import './LoginPage.scss'

const isEmpty = (value) => value === ''
const validateEmail = (email) => {
  const test = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
  return !test
}

const FormWrap = ({ title, value, onChange, err, type = 'text' }) => {
  return (
    <div className="formWrap" data-login-err={`${err}`}>
      {title}
      <input
        type={type}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
      {err && <span className="err">{`please check your ${title}`}</span>}
    </div>
  )
}

const LoginModal = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const AppReducer = useSelector((state) => state.AppReducer)
  const { account, password } = AppReducer
  const [checkData, setCheckData] = useState(false)

  function onClosePage() {
    dispatch(AppAction.handleChangeAccount(''))
    dispatch(AppAction.handleChangePassword(''))
    navigate('/')
  }

  function onChangeAccount(value) {
    dispatch(AppAction.handleChangeAccount(value))
  }

  function onChangePassword(value) {
    dispatch(AppAction.handleChangePassword(value))
  }

  function fetchLogin() {
    setCheckData(true)
    setTimeout(() => {
      const errRow = document.querySelectorAll(`[data-login-err='true']`)
      if (errRow.length === 0) {
        //可以fetch
        dispatch(AppAction.fetchLoginSaga(account, password, navigate))
      }
    }, 300)
  }

  return (
    <div className="loginModal">
      <div className="modalTitle">
        <div>Login</div>
        <div
          onClick={() => {
            onClosePage()
          }}
          className="closeModal"
        >
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="formWrapBox">
        <FormWrap
          title="Email"
          value={account}
          onChange={onChangeAccount}
          err={checkData && validateEmail(account)}
        />
        <FormWrap
          title="password"
          value={password}
          onChange={onChangePassword}
          err={checkData && isEmpty(password)}
          type="password"
        />
      </div>
      <div className="modalLoginBox">
        <Button
          propsClassName="login"
          onClick={() => fetchLogin()}
          text="login"
        />
      </div>
    </div>
  )
}

export default LoginModal
