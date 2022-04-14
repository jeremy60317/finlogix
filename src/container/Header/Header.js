import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as AppActions from '../../actions/AppActions.js'
import Button from '../../component/Button/Button.js'
import pathName from '../../utils/path'
import logo from '../../static/ACY Securities.jpeg'
import style from './Header.module.scss'

const Header = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const AppReducer = useSelector((state) => state.AppReducer)
  const {
    auth: { username },
  } = AppReducer

  function onClickLoginButton() {
    username ? openModal('logout') : toPageType(pathName.Login)
  }

  function toPageType(type = '') {
    navigate(`/${type}`)
  }

  function openModal(type) {
    dispatch(AppActions.openModal(type))
  }

  return (
    <div className={style.header} id="headerDiv">
      <div className={style.logoBox} onClick={() => toPageType()}>
        <img className={style.logo} src={logo} alt="logo" />
      </div>
      <div
        className={style.burger}
        onClick={() => {
          onClickLoginButton()
        }}
      >
        <div className={style.burgerLine}></div>
        <div className={style.burgerLine}></div>
        <div className={style.burgerLine}></div>
      </div>
      <div className={style.logoBox}>
        {username && (
          <Button
            className="myWebinar"
            onClick={() => toPageType(pathName.MyWebinars)}
            text="My Webinar"
          />
        )}
        <Button
          className="login"
          onClick={() => onClickLoginButton()}
          text={username ? 'logout' : 'login'}
        />
      </div>
    </div>
  )
}

export default Header
