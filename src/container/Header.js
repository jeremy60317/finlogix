import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as AppActions from '../actions/AppActions.js'
import Button from '../component/Button.js'
import pathName from '../utils/path'
import logo from '../static/ACY Securities.jpeg'
import './Header.scss'

const Header = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const AppReducer = useSelector((state) => state.AppReducer)
  const {
    auth: { username },
  } = AppReducer

  function toPageType(type = '') {
    navigate(`/${type}`)
  }

  function openModal(type) {
    dispatch(AppActions.openModal(type))
  }

  return (
    <div className="header" id="headerDiv">
      <div className="logoBox" onClick={() => toPageType()}>
        <img className="logo" src={logo} alt="logo" />
      </div>
      <div
        className="burger"
        onClick={() => {
          username ? openModal('logout') : toPageType(pathName.Login)
        }}
      >
        <div className="burgerLine"></div>
        <div className="burgerLine"></div>
        <div className="burgerLine"></div>
      </div>
      <div className="loginBox">
        {username && (
          <Button
            propsClassName="myWebinar"
            onClick={() => toPageType(pathName.MyWebinars)}
            text="My Webinar"
          />
        )}
        {username ? (
          <Button
            propsClassName="login"
            onClick={() => openModal('logout')}
            text="logout"
          />
        ) : (
          <Button
            propsClassName="login"
            onClick={() => {
              toPageType(pathName.Login)
            }}
            text="login"
          />
        )}
      </div>
    </div>
  )
}

export default Header
