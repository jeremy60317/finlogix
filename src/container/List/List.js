import { useNavigate } from 'react-router-dom'
import pathName from '../../utils/path'
import cookie from '../../utils/cookie'
import { useDispatch } from 'react-redux'
import * as AppActions from '../../actions/AppActions.js'
import Card from '../../component/Card/Card'
import './List.scss'

const List = ({ data, pageType }) => {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const { data: listData } = data
  const isListPage = pageType === 'list'

  function onClickRegister(idx) {
    const getCookie = cookie.getCookie('access_token')
    if (getCookie) {
      const ele = document.getElementById('registerForm')
      const headerOffset =
        document.getElementById('headerDiv').offsetHeight + 10
      const elePosition = ele.getBoundingClientRect().top
      const offSetPosition = elePosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offSetPosition,
        behavior: 'smooth',
      })
      dispatch(AppActions.selectedList(idx))
    } else {
      navigate(pathName.Login)
    }
  }

  function onClickUnFavor(postId) {
    dispatch(AppActions.fetchUnFavorPostSaga(postId))
  }

  return (
    <div className="listBox">
      {listData.map((itm, idx) => {
        return (
          <Card
            data={itm}
            index={idx}
            onClick={
              isListPage
                ? (idx) => onClickRegister(idx)
                : () => onClickUnFavor(itm.post_id)
            }
            key={itm.id}
            isListPage={isListPage}
          />
        )
      })}
    </div>
  )
}

export default List
