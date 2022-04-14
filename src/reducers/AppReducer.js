import * as actionTypes from '../constants'

const INITIAL_STATE = {
  openModal: false,
  modalType: '',
  auth: {},
  loginStatus: false,
  list: { data: [], link: {}, meta: {} },
  favorList: { data: [], link: {}, meta: {} },
  selectedList: 0,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //login
    case actionTypes.FETCH_LOGIN_SAGA_SUCCESS:
      return {
        ...state,
        auth: { ...action.auth },
        account: '',
        password: '',
        loginStatus: true,
      }
    case actionTypes.FETCH_LOGOUT_SAGA_SUCCESS:
      return {
        ...state,
        auth: {},
        account: '',
        password: '',
        loginStatus: false,
      }
    //
    case actionTypes.FETCH_LIST_API_SUCCESS:
      return {
        ...state,
        list: { ...action.json },
      }
    case actionTypes.FETCH_FAVOR_LIST_SUCCESS:
      return {
        ...state,
        favorList: { ...action.json },
      }
    case actionTypes.UPDATE_LIST_DATA:
      return {
        ...state,
        list: {
          ...state.list,
          data: action.array,
        },
      }
    case actionTypes.SELECTED_LIST:
      return {
        ...state,
        selectedList: action.idx,
      }
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.boolean,
      }
    case actionTypes.OPEN_MODAL:
      return {
        ...state,
        openModal: true,
        modalType: action.modalType,
      }
    case actionTypes.CLOSE_MODAL:
      return {
        ...state,
        openModal: false,
        modalType: '',
      }
    default:
      return {
        ...state,
      }
  }
}
