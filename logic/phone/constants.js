export const VOICED = 'VOICED'
export const VOICELESS = 'VOICELESS'
export const BREATHY = 'BREATHY'
export const CREAKY = 'CREAKY'

export const PHONATION_TYPES = [VOICED, BREATHY, CREAKY, VOICELESS]

export const CLICK = 'CLICK'
export const EJECTIVE = 'EJECTIVE'
export const IMPLOSIVE = 'IMPLOSIVE'
export const PULMONIC = 'PULMONIC'

export const AIRSTREAM_TYPES = [PULMONIC, EJECTIVE, IMPLOSIVE, CLICK]

export const STOP = 'STOP'
export const TRILL = 'TRILL'
export const FRICATIVE = 'FRICATIVE'
export const HIGH = 'HIGH'
export const MIDHIGH = 'MIDHIGH'
export const MID = 'MID'
export const MIDLOW = 'MIDLOW'
export const LOW = 'LOW'

export const HEIGHTS = [HIGH, MIDHIGH, MID, MIDLOW, LOW]
export const MANNER_TYPES = [STOP, FRICATIVE, TRILL, ...HEIGHTS]

export const L_LABIAL = 'L_LABIAL'
export const APICAL = 'APICAL'
export const DORSAL = 'DORSAL'
export const RADICAL = 'RADICAL'

export const ACTIVE_ARTICULATORS = [L_LABIAL, APICAL, DORSAL, RADICAL]

export const U_LABIAL = 'U_LABIAL'
export const P_DENTAL = 'DENTAL'
export const P_ALVEOLAR = 'ALVEOLAR'
export const P_POSTALVEOLAR = 'POSTALVEOLAR'
export const P_FRONT = 'FRONT'
export const P_CENTRAL = 'MID'
export const P_BACK = 'BACK'
export const P_UVULAR = 'UVULAR'
export const P_PHARYNGEAL = 'PHARYNGEAL'

export const PASSIVE_ARTICULATORS = [
  U_LABIAL,
  P_DENTAL,
  P_ALVEOLAR,
  P_POSTALVEOLAR,
  P_FRONT,
  P_CENTRAL,
  P_BACK,
  P_UVULAR,
  P_PHARYNGEAL
]

export const BILABIAL = [L_LABIAL, U_LABIAL]
export const LABIODENT = [L_LABIAL, P_DENTAL]
export const DENTAL = [APICAL, P_DENTAL]
export const ALVEOLAR = [APICAL, P_ALVEOLAR]
export const RETROFLEX = [APICAL, P_POSTALVEOLAR]
export const POSTALVEOLAR = [DORSAL, P_POSTALVEOLAR]
export const PALATAL = [DORSAL, P_FRONT]
export const VELAR = [DORSAL, P_BACK]
export const FRONT = PALATAL
export const CENTRAL = [DORSAL, P_CENTRAL]
export const BACK = VELAR
export const UVULAR = [DORSAL, P_UVULAR]
export const PHARYNGEAL = [RADICAL, P_PHARYNGEAL]

// export const CORONAL = [APICAL, LAMINAL]

export const PLACE_TYPES = {
  BILABIAL,
  LABIODENT,
  DENTAL,
  ALVEOLAR,
  RETROFLEX,
  POSTALVEOLAR,
  PALATAL,
  CENTRAL,
  VELAR,
  UVULAR,
  PHARYNGEAL
}
