// import axios from 'axios'
// import Language from '../../../logic/language'
import {
  ADD_LG,
  GOT_LGS,
  ADD_PHONEME,
  EDIT_PHONEME,
  REMOVE_PHONEME,
  ADD_ORTH_RULE,
  EDIT_ORTH_RULE,
  REMOVE_ORTH_RULE,
  ADD_CODAS,
  EDIT_CODA,
  REMOVE_CODA,
  ADD_ONSETS,
  EDIT_ONSET,
  REMOVE_ONSET,
  GET_SINGLE_LG
} from './constants'
import {seed} from '../../../logic'
// export const getLgs = () => async dispatch => {
//   try {
//     await axios.post('/auth/logout')
//     dispatch(gotLgs())
//     history.push('/login')
//   } catch (err) {
//     console.error(err)
//   }
//}

export default function(state = seed, action) {
  switch (action.type) {
    case GOT_LGS:
      return action.lgs
    // case GET_SINGLE_LG:
    case ADD_LG:
      return [...state].concat([action.lg])
    default:
      return state
  }
}
