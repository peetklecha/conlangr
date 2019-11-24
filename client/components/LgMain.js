import React from 'react'
import {connect} from 'react-redux'
import {Redirect, Switch, Route, withRouter} from 'react-router-dom'
import {LgOverview, Navbar} from './'

export default withRouter(
  connect(state => ({single: state.single}))(
    class LgMain extends React.Component {
      componentDidMount() {
        this.props.getSingleLg(this.props.match.params.id)
      }

      render() {
        const {id} = this.props.match.params
        return (
          <div>
            <Navbar />
            <Switch>
              <Route exact path={`/languages/${id}/`} component={LgOverview} />
              {/* <Route
                path={`/languages/${id}/inventory`}
                component={Inventory}
							/> */}
            </Switch>
          </div>
        )
      }
    }
  )
)
