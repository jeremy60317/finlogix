import { call, put, select } from 'redux-saga/effects'
import cookie from '../utils/cookie'
import {
  fetchLoginSagaSuccess,
  fetchLogoutSagaSuccess,
  setLoading,
  fetchListApiSuccess,
  fetchFavorListSuccess,
  updateListData,
} from '../actions/AppActions'

const uri = process.env.REACT_APP_REQUEST_URL

//初始化fetch資料
export function* fetchInitialApiSaga(action) {
  const getCookie = cookie.getCookie('access_token')
  yield put(setLoading(true))
  yield call(fetchIsLoginSaga)
  yield call(fetchListApiSaga)
  if (getCookie) {
    yield call(fetchFavorListSaga)
  }
  yield put(setLoading(false))
}

//確認登入狀態
export function* fetchIsLoginSaga(action) {
  const getCookie = cookie.getCookie('access_token')
  if (!getCookie) return

  const res = yield call(fetch, `${uri}/me/user/info`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getCookie}`,
    },
  })
  const resBody = yield res.json()

  if (resBody.username) {
    yield put(fetchLoginSagaSuccess(resBody))
  } else {
    console.log('isLogin err')
  }
}

//登入
export function* fetchLoginSaga(action) {
  yield put(setLoading(true))
  //yuntest@mailinator.com
  //A123456
  const { account, password, navigate } = action
  const res = yield call(fetch, `${uri}/auth/login/email`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ email: account, password }),
  })
  const resBody = yield res.json()

  if (res.ok) {
    try {
      //setCookie
      cookie.setCookie(
        'access_token',
        resBody.auth.access_token,
        resBody.auth.expires_in
      )
    } catch (e) {
      console.log(e)
    }
    yield put(fetchLoginSagaSuccess(resBody))
    navigate('/')
  } else {
    //err
    console.log('login err')
  }

  yield call(fetchFavorListSaga)
  yield put(setLoading(false))
}

//登出
export function* fetchLogoutSaga() {
  yield put(setLoading(true))
  const res = yield call(fetch, `${uri}/me/user/logout`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${cookie.getCookie('access_token')}`,
    },
  })
  if (res.ok) {
    try {
      cookie.setCookie('access_token', '', 0)
      yield put(fetchLogoutSagaSuccess())
    } catch (e) {
      console.log(e)
    }
  } else {
    console.log('logout error')
  }
  yield put(setLoading(false))
}

//List資料
export function* fetchListApiSaga(action) {
  const url = `${uri}/post/analysis?per_page=12&page=1`
  const res = yield call(fetch, url)
  const json = yield res.json()
  if (res && res.status === 200) {
    yield put(fetchListApiSuccess(json))
  }
}

//favorList資料
export function* fetchFavorListSaga() {
  const getCookie = cookie.getCookie('access_token')
  const res = yield call(fetch, `${uri}/me/user/favourite/post-analysis`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getCookie}`,
    },
  })

  const resBody = yield res.json()

  if (res.status === 200) {
    yield put(fetchFavorListSuccess(resBody))
    yield call(comparList)
  } else {
    console.log('fetchFavorList error')
  }
}

//比對favorList list資料
function* comparList() {
  const state = yield select()
  const { AppReducer } = state
  const { list, favorList } = AppReducer
  if (favorList.data && list.data) {
    const array = list.data.filter((current) =>
      favorList.data.every((check) => check.id !== current.id)
    )
    yield put(updateListData(array))
  }
}

//favor post

export function* fetchFavorPostSaga(action) {
  const { postId } = action
  const res = yield call(
    fetch,
    `${uri}/me/user/favourite/post-analysis/${postId}`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${cookie.getCookie('access_token')}`,
      },
    }
  )
  if (res.ok) {
    yield call(fetchInitialApiSaga)
  } else {
    console.log('fetchFavorPostSagaError')
  }
}

//unFavor
export function* fetchUnFavorPostSaga(action) {
  const { postId } = action
  const res = yield call(
    fetch,
    `${uri}/me/user/favourite/post-analysis/${postId}`,
    {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${cookie.getCookie('access_token')}`,
      },
    }
  )
  if (res.ok) {
    yield call(fetchInitialApiSaga)
  } else {
    console.log('fetchUnFavorPostSagaError')
  }
}
