import { all, takeLatest } from 'redux-saga/effects'
import * as actionTypes from '../constants'
import * as AppSaga from './AppSaga.js'

function* rootSaga() {
  yield all([
    takeLatest(actionTypes.FETCH_INITIAL_API_SAGA, AppSaga.fetchInitialApiSaga),
    takeLatest(actionTypes.FETCH_IS_LOGIN_SAGA, AppSaga.fetchIsLoginSaga),
    takeLatest(actionTypes.FETCH_LIST_API_SAGA, AppSaga.fetchListApiSaga),
    takeLatest(actionTypes.FETCH_LOGIN_SAGA, AppSaga.fetchLoginSaga),
    takeLatest(actionTypes.FETCH_LOGOUT_SAGA, AppSaga.fetchLogoutSaga),
    takeLatest(actionTypes.FETCH_FAVOR_POST_SAGA, AppSaga.fetchFavorPostSaga),
    takeLatest(
      actionTypes.FETCH_UN_FAVOR_POST_SAGA,
      AppSaga.fetchUnFavorPostSaga
    ),
  ])
}

export default rootSaga
