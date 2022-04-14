import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as AppAction from '../../actions/AppActions'
import Button from '../../component/Button/Button'
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
    auth: { username },
    selectedList,
  } = AppReducer

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [selectValue, setSelectValue] = useState('')

  useEffect(() => {
    if (data.length > 0 && data[selectedList])
      setSelectValue(data[selectedList].title)
  }, [data, selectedList])

  function onSubmitDisabled() {
    return (
      !username ||
      isEmpty(firstName) ||
      isEmpty(lastName) ||
      validateEmail(email)
    )
  }

  function onClickRegisterButton(firstName, lastName, email, postId) {
    dispatch(
      AppAction.fetchFavorPostSaga({ firstName, lastName, email, postId })
    )
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
        <div>
          <div className="contentFormTitle">Topic</div>
          <div className="inputBox">
            <select
              value={selectValue}
              name={selectValue}
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
        <FormWrap
          title="First Name"
          onChange={(value) => setFirstName(value)}
          key="First Name"
          value={firstName}
          err={firstName ? isEmpty(firstName) : false}
        />
        <FormWrap
          title="Last Name"
          onChange={(value) => setLastName(value)}
          key="Last Name"
          value={lastName}
          err={lastName ? isEmpty(lastName) : false}
        />
        <FormWrap
          title="Email"
          onChange={(value) => setEmail(value)}
          key="Email"
          value={email}
          err={email ? validateEmail(email) : false}
        />
      </div>
      <Button
        className={
          onSubmitDisabled() ? 'registerSubmitDisabled' : 'registerSubmit'
        }
        onClick={() =>
          onSubmitDisabled()
            ? openModal('goToLogin')
            : onClickRegisterButton(
                firstName,
                lastName,
                email,
                data[selectedList].post_id
              )
        }
        text="Register"
      />
    </div>
  )
}

export default RegisterForm
