import * as actionTypes from '../constants'

const INITIAL_STATE = {
  openModal: false,
  modalType: '',
  account: '',
  password: '',
  auth: {},
  loginStatus: false,
  list: { data: [], link: {}, meta: {} },
  favorList: { data: [], link: {}, meta: {} },
  selectedList: 0,
  FirstName: '',
  LastName: '',
  Email: '',
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
    case actionTypes.HANDLE_CHANGE_ACCOUNT:
      return {
        ...state,
        account: action.value,
      }
    case actionTypes.HANDLE_CHANGE_PASSWORD:
      return {
        ...state,
        password: action.value,
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
    case actionTypes.ON_CHANGE_REGISTER_INPUT:
      return {
        ...state,
        [action.title]: action.value,
      }
    default:
      return {
        ...state,
      }
  }
}
