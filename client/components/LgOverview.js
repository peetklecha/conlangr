import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Form, Button} from 'semantic-ui-react'
import {getSingleLg, editName} from '../store/redux/actions'

export default connect(
  state => ({single: state.single}),
  dispatch => ({
    getSingleLg: index => dispatch(getSingleLg(index)),
    editName: name => dispatch(editName(name))
  })
)(
  class LgOverview extends React.Component {
    constructor(props) {
      super(props)
      this.state = {name: this.props.single.name}
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
      this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e) {
      e.preventDefault()
      this.props.editName(e.target.name.value)
    }

    render() {
      const {id} = this.props.match.params
      return (
        <div>
          <Form onSubmit={this.handleSubmit} name={name}>
            <Form.Field>
              <label htmlFor="name" />
              <input
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </Form.Field>
            <div>
              <Button type="submit">Save Changes</Button>
            </div>
          </Form>
          <Link to={`/languages/${id}/inventory`}>
            <Button>Edit Phonemic Inventory &raquo; </Button>
          </Link>
        </div>
      )
    }
  }
)
