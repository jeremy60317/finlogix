import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as AppAction from '../actions/AppActions'
import Button from '../component/Button/Button'
import './RegisterForm.scss'

const isEmpty = (value) => value === ''
const validateEmail = (email) => {
  const test = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
  return !test
}

const FormWrap = ({ title, onChange, value, err }) => {
  return (
    <div className="contentFormBox">
      <div className="contentFormTitle">{title}</div>
      <div className="inputBox">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      {err && (
        <span className="contentFormErr">{`please check your ${title}`}</span>
      )}
    </div>
  )
}

const RegisterForm = () => {
  const dispatch = useDispatch()
  const AppReducer = useSelector((state) => state.AppReducer)
  const {
    list: { data },
    selectedList,
    FirstName,
    LastName,
    Email,
    auth: { username },
  } = AppReducer
  const [firName, setFirName] = useState(false)
  const [lasName, setLasName] = useState(false)
  const [email, setEmail] = useState(false)

  useEffect(() => {
    setFirName(FirstName ? true : false)
    setLasName(LastName ? true : false)
    setEmail(Email ? true : false)
  }, [FirstName, LastName, Email])

  function handleOnChangeText(title, value) {
    dispatch(AppAction.onChangeRegisterInput(title, value))
  }

  function onSubmitDisabled() {
    return (
      !username ||
      isEmpty(FirstName) ||
      isEmpty(LastName) ||
      validateEmail(Email)
    )
  }

  function onClickRegisterButton() {
    dispatch(AppAction.fetchFavorPostSaga())
  }

  function openModal(type) {
    dispatch(AppAction.openModal(type))
  }

  return (
    <div className="registerFormBox" id="registerForm">
      <div className="title">Register for a Webinar now</div>
      <div className="content">
        Please fill in the form below and you will be contacted within 1 working
        day by our professional business experts.
      </div>
      <div className="contentForm">
        {data.length > 0 && (
          <div>
            <div className="contentFormTitle">Topic</div>
            <div className="inputBox">
              <select
                value={data[selectedList].title}
                name={data[selectedList].title}
                onChange={(e) => {
                  dispatch(AppAction.selectedList(e.target.selectedIndex))
                }}
              >
                {data.map((itm, idx) => (
                  <option key={itm.id} value={itm.title}>
                    {itm.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        <FormWrap
          title="First Name"
          onChange={(value) => handleOnChangeText('FirstName', value)}
          key="First Name"
          value={FirstName}
          err={firName ? isEmpty(FirstName) : false}
        />
        <FormWrap
          title="Last Name"
          onChange={(value) => handleOnChangeText('LastName', value)}
          key="Last Name"
          value={LastName}
          err={lasName ? isEmpty(LastName) : false}
        />
        <FormWrap
          title="Email"
          onChange={(value) => handleOnChangeText('Email', value)}
          key="Email"
          value={Email}
          err={email ? validateEmail(Email) : false}
        />
      </div>
      <Button
        propsClassName={
          onSubmitDisabled() ? 'registerSubmitDisabled' : 'registerSubmit'
        }
        onClick={() =>
          onSubmitDisabled() ? openModal('goToLogin') : onClickRegisterButton()
        }
        text="Register"
      />
    </div>
  )
}

export default RegisterForm
