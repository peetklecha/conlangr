/* eslint-disable complexity */
import {
  ADD_LG,
  GET_SINGLE_LG,
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
  EDIT_LG_NAME
} from './constants'

const initialState = {}
export default function(state = initialState, action) {
  switch (action.type) {
    case EDIT_LG_NAME:
      return state.editName(action.name)
    case ADD_LG:
      return action.lg
    case GET_SINGLE_LG:
      return action.lg
    // return JSON.parse(localStorage.getItem('languages'))[action.index]
    case ADD_PHONEME:
      return state.addPhoneme(action.phoneme)
    case REMOVE_PHONEME:
      return state.removePhoneme(action.phonemeGraph)
    case EDIT_PHONEME:
      return state.editPhoneme(
        action.oldgraph,
        action.newgraph,
        action.can,
        action.must
      )
    case ADD_ORTH_RULE:
      return state.addOrthRule(
        action.target,
        action.output,
        action.after,
        action.before
      )
    case EDIT_ORTH_RULE:
      return state.editOrthRule(
        action.id,
        action.target,
        action.output,
        action.after,
        action.before
      )
    case REMOVE_ORTH_RULE:
      return state.removeOrthRule(action.index)
    case ADD_ONSETS:
      return state.addPermissibleOnsets(action.onsets)
    case ADD_CODAS:
      return state.addPermissibleCodas(action.codas)
    case EDIT_ONSET:
      return state.editPremissibleOnsetFreq(action.strArr, action.freq)
    case EDIT_CODA:
      return state.editPremissibleCodaFreq(action.strArr, action.freq)
    case REMOVE_ONSET:
      return state.deletePermissibleOnset(action.strArr)
    case REMOVE_CODA:
      return state.deletePermissibleCoda(action.strArr)
    default:
      return state
  }
}
