import { useSelector } from 'react-redux'
import TitleBar from '../../container/TitleBar/TitleBar.js'
import List from '../../container/List/List.js'
import RegisterForm from '../../container/RegisterForm/RegisterForm.js'

function Home() {
  const AppReducer = useSelector((state) => state.AppReducer)
  const { list } = AppReducer
  return (
    <div>
      <TitleBar />
      <List data={list} pageType={'list'} />
      <RegisterForm />
    </div>
  )
}

export default Home
