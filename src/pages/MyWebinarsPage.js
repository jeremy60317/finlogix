import { useSelector } from 'react-redux'
import List from '../container/List'

import './MyWebinarsPage.scss'
const MyWebinarsPage = () => {
  const AppReducer = useSelector((state) => state.AppReducer)
  const { favorList } = AppReducer
  return (
    <div className="webinarsPage">
      <div className="favorTitle">My Favor List</div>
      <List data={favorList} pageType={'favorList'} />
    </div>
  )
}

export default MyWebinarsPage
