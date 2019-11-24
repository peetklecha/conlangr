import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {getSingleLg, makeNewLg} from '../store/redux/actions'

export default connect(
  state => ({languages: state.languages}),
  dispatch => ({
    getSingleLg: index => () => dispatch(getSingleLg(index)),
    makeNewLg: id => () => dispatch(makeNewLg(id))
  })
)(props => {
  return (
    <div className="front-page">
      <h1>CONLANGR</h1>
      <div className="all-languages">
        <Link to={`/languages/${props.languages.length}`}>
          {' '}
          <Button
            size="massive"
            onClick={props.makeNewLg(props.languages.length)}
          >
            Create New Language
          </Button>
        </Link>
      </div>

      <h3>Your Languages:</h3>
      <div className="all-languages">
        {props.languages.map((lg, i) => (
          <Link key={i} to={`/languages/${i}`}>
            <Button key={i} size="massive" onClick={props.getSingleLg(lg)}>
              {lg.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
})
