import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import * as AppActions from '../actions/AppActions'
import Home from './Home'
import Header from '../container/Header'
import Layout from '../component/Layout'
import Modal from '../component/Modal'
import LoginPage from './LoginPage'
import MyWebinarsPage from './MyWebinarsPage'
import pathName from '../utils/path'
import logo from '../static/ACY Securities.jpeg'
import './App.scss'

function App() {
  const dispatch = useDispatch()
  const AppReducer = useSelector((state) => state.AppReducer)
  const { loading, openModal } = AppReducer

  useEffect(() => {
    dispatch(AppActions.fetchInitialApiSaga())
  }, [])

  if (loading) {
    return (
      <div className="loading">
        <div>
          <img className="logo" src={logo} alt="logo" />
        </div>
        <div className="pointBox">
          <div className="point"></div>
          <div className="point"></div>
          <div className="point"></div>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <Header />
      <Routes>
        <Route index path={pathName.Home} element={<Home />} />
        <Route path={pathName.Login} element={<LoginPage />} />
        <Route path={pathName.MyWebinars} element={<MyWebinarsPage />} />
      </Routes>
      <Modal open={openModal}></Modal>
    </Layout>
  )
}

export default App
