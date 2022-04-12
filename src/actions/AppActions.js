import * as actionTypes from '../constants'

export const fetchInitialApiSaga = () => ({
  type: actionTypes.FETCH_INITIAL_API_SAGA,
})

export const fetchListApiSaga = (page) => ({
  type: actionTypes.FETCH_LIST_API_SAGA,
  page,
})

export const fetchListApiSuccess = (json) => ({
  type: actionTypes.FETCH_LIST_API_SUCCESS,
  json,
})

export const fetchFavorListSuccess = (json) => ({
  type: actionTypes.FETCH_FAVOR_LIST_SUCCESS,
  json,
})

export const setLoading = (boolean) => ({
  type: actionTypes.SET_LOADING,
  boolean,
})

export const openModal = (modalType) => ({
  type: actionTypes.OPEN_MODAL,
  modalType,
})

export const closeModal = () => ({
  type: actionTypes.CLOSE_MODAL,
})

//login
export const fetchIsLoginSaga = () => ({
  type: actionTypes.FETCH_IS_LOGIN_SAGA,
})

export const fetchLoginSaga = (account, password, navigate) => ({
  type: actionTypes.FETCH_LOGIN_SAGA,
  account,
  password,
  navigate,
})

export const fetchLoginSagaSuccess = (auth) => ({
  type: actionTypes.FETCH_LOGIN_SAGA_SUCCESS,
  auth,
})

export const fetchLogoutSaga = () => ({
  type: actionTypes.FETCH_LOGOUT_SAGA,
})

export const fetchLogoutSagaSuccess = () => ({
  type: actionTypes.FETCH_LOGOUT_SAGA_SUCCESS,
})

export const handleChangeAccount = (value) => ({
  type: actionTypes.HANDLE_CHANGE_ACCOUNT,
  value,
})

export const handleChangePassword = (value) => ({
  type: actionTypes.HANDLE_CHANGE_PASSWORD,
  value,
})

export const updateListData = (array) => ({
  type: actionTypes.UPDATE_LIST_DATA,
  array,
})

export const selectedList = (idx) => ({
  type: actionTypes.SELECTED_LIST,
  idx,
})

export const onChangeRegisterInput = (title, value) => ({
  type: actionTypes.ON_CHANGE_REGISTER_INPUT,
  title,
  value,
})

export const fetchFavorPostSaga = () => ({
  type: actionTypes.FETCH_FAVOR_POST_SAGA,
})

export const fetchUnFavorPostSaga = (index) => ({
  type: actionTypes.FETCH_UN_FAVOR_POST_SAGA,
  index,
})
