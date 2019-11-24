import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Table, Input, Button} from 'semantic-ui-react'
import {editPhoneme} from '../store/redux/actions'

//{[graph].underlyingGraph}

export default connect(
  state => ({language: state.single}),
  dispatch => ({
    editPhoneme: (oldGraph, newGraph, can, must) => () =>
      dispatch(editPhoneme(oldGraph, newGraph, can, must))
  })
)(
  class Orthography extends Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
      const inv = this.props.language.phonemicInventory
      const obj = {}
      for (let graph in inv) {
        if (inv[graph].underlyingGraph) {
          obj[graph] = inv[graph].underlyingGraph
        }
      }
      this.setState(obj)
    }

    handleChange(e) {
      this.setState({[e.target.name]: e.target.value})
    }

    render() {
      const {id} = this.props.match.params
      const inv = this.props.language.phonemicInventory
      return (
        <div>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Phonemes</Table.HeaderCell>
                <Table.HeaderCell>Spelling</Table.HeaderCell>
                <Table.HeaderCell>Conditions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {Object.keys(inv).map(graph => (
              <Table.Row key={graph}>
                <Table.Cell>{graph}</Table.Cell>
                <Table.Cell>
                  <Input
                    name={graph}
                    placeholder={inv[graph].underlyingGraph}
                    onChange={this.handleChange}
                  />
                  <Button
                    primary
                    onClick={this.props.editPhoneme(
                      graph,
                      this.state[graph],
                      inv[graph].canBeSyllabic,
                      inv[graph].mustBeSyllabic
                    )}
                  >
                    Update
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table>
          <Link to={`/languages/${id}/phonotactics`}>
            <Button>Create Phonotactic Constraints</Button>
          </Link>
        </div>
      )
    }
  }
)
