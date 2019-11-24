import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  AllLanguages,
  LgOverview,
  Inventory,
  Orthography,
  Phonotactics
} from './components'
import {gotLgs} from './store/redux/actions'

/**
 * COMPONENT
 */
class Routes extends Component {
  // componentDidMount() {
  //   // this.props.loadInitialData()
  //   if (!localStorage.languages) {
  //     localStorage.setItem('languages', JSON.stringify(this.props.languages))
  //   } else {
  //     let languages = JSON.parse(localStorage.getItem('languages'))
  //     this.props.gotLgs(languages)
  //   }
  // }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={AllLanguages} />
        <Route exact path="/languages/:id" component={LgOverview} />
        <Route path="/languages/:id/inventory" component={Inventory} />
        <Route path="/languages/:id/orthography" component={Orthography} />
        <Route path="/languages/:id/phonotactics" component={Phonotactics} />
        {/* <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {isLoggedIn && (
          <Switch>
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        <Route component={Login} /> */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    languages: state.languages
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    // isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    gotLgs(lgs) {
      dispatch(gotLgs(lgs))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
// Routes.propTypes = {
//   loadInitialData: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
