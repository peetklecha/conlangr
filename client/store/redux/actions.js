import {
  ADD_LG,
  GOT_LGS,
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
import {Language} from '../../../logic/'

export const editName = name => ({type: EDIT_LG_NAME, name})
export const addLg = lg => ({type: ADD_LG, lg})
export const gotLgs = lgs => ({type: GOT_LGS, lgs})
export const getSingleLg = lg => ({type: GET_SINGLE_LG, lg})
export const addPhoneme = phoneme => ({type: ADD_PHONEME, phoneme})
export const editPhoneme = (oldgraph, newgraph, can, must) => ({
  type: EDIT_PHONEME,
  oldgraph,
  newgraph,
  can,
  must
})
export const removePhoneme = phonemeGraph => ({
  type: REMOVE_PHONEME,
  phonemeGraph
})
export const addOrthRule = (target, output, after, before) => ({
  type: ADD_ORTH_RULE,
  target,
  after,
  output,
  before
})
export const removeOrthRule = index => ({type: REMOVE_ORTH_RULE, index})
export const editOrthRule = (id, target, output, after, before) => ({
  type: EDIT_ORTH_RULE,
  id,
  target,
  after,
  output,
  before
})
export const addOnsets = onsets => ({type: ADD_ONSETS, onsets})
export const addCodas = codas => ({type: ADD_CODAS, codas})
export const editOnset = (strArr, freq) => ({type: EDIT_ONSET, strArr, freq})
export const editCodas = (strArr, freq) => ({type: EDIT_CODA, strArr, freq})
export const removeOnset = strArr => ({type: REMOVE_ONSET, strArr})
export const removeCoda = strArr => ({type: REMOVE_CODA, strArr})

export const makeNewLg = id => dispatch => {
  const newLg = new Language('NewLanguage' + id)
  dispatch(addLg(newLg))
}
