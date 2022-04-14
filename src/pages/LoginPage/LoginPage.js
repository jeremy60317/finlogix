import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
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
  const [checkData, setCheckData] = useState(false)
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  function onClosePage() {
    setAccount('')
    setPassword('')
    navigate('/')
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
          onChange={(value) => setAccount(value)}
          err={checkData && validateEmail(account)}
        />
        <FormWrap
          title="password"
          value={password}
          onChange={(value) => setPassword(value)}
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
