import React, {Component} from 'react'
import {Table, Checkbox, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {editPhoneme} from '../store/redux/actions'

export default connect(
  state => ({language: state.single}),
  dispatch => ({
    editPhoneme: (oldGr, newGr, can, must) =>
      dispatch(editPhoneme(oldGr, newGr, can, must))
  })
)(
  class Phonotactics extends Component {
    constructor(props) {
      super(props)
      this.state = {can: {}, must: {}, words: []}
      this.handleCanChange = this.handleCanChange.bind(this)
      this.handleMustChange = this.handleMustChange.bind(this)
      this.generateMorphs = this.generateMorphs.bind(this)
      this.canToggle = this.canToggle.bind(this)
      this.mustToggle = this.mustToggle.bind(this)
    }

    componentDidMount() {
      const inv = this.props.language.phonemicInventory
      const can = {}
      for (let graph in inv) {
        if (inv[graph].underlyingGraph) {
          can[graph] = inv[graph].canBeSyllabic
        }
      }
      const must = {}
      for (let graph in inv) {
        if (inv[graph].underlyingGraph) {
          must[graph] = inv[graph].mustBeSyllabic
        }
      }
      this.setState({can, must})
    }

    canToggle(name) {
      const inv = this.props.language.phonemicInventory
      this.props.editPhoneme(
        name,
        name,
        !inv[name].canBeSyllabic,
        inv[name].mustBeSyllabic
      )
      //   this.setState({
      //     ...this.state,
      //     can: {...this.state.can, [name]: !this.state.can[name]}
      //   })
      // }
    }

    mustToggle(name) {
      const inv = this.props.language.phonemicInventory
      this.props.editPhoneme(
        name,
        name,
        inv[name].canBeSyllabic,
        !inv[name].mustBeSyllabic
      )
      // this.setState({
      //   ...this.state,
      //   must: {...this.state.must, [name]: !this.state.must[name]}
      // })
    }

    handleCanChange = graph => _ => {
      this.canToggle(graph)
    }

    handleMustChange = graph => _ => {
      this.mustToggle(graph)
    }

    generateMorphs() {
      this.setState({words: this.props.language.generateMorphs(20)})
    }

    render() {
      const {id} = this.props.match.params
      const inv = this.props.language.phonemicInventory
      const graphs = Object.keys(inv)
      graphs.sort(
        (a, b) =>
          inv[a].underlyingPhone.sonority - inv[b].underlyingPhone.sonority
      )
      return (
        <div>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Phonemes</Table.HeaderCell>
                <Table.HeaderCell>Can Be Syllabic?</Table.HeaderCell>
                <Table.HeaderCell>Must Be Syllabic?</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {graphs.map(graph => (
              <Table.Row key={graph}>
                <Table.Cell>{graph}</Table.Cell>
                <Table.Cell>
                  <Checkbox
                    name={graph}
                    checked={inv[graph].canBeSyllabic}
                    onChange={this.handleCanChange(graph)}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Checkbox
                    name={graph}
                    checked={inv[graph].mustBeSyllabic}
                    onChange={this.handleMustChange(graph)}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table>
          {/* <Button color="blue" onClick={}>Save Changes</Button> */}
          {/* <Button onClick={this.generateMorphs}>Generate Lexical Items</Button>
          {this.state.words.map(word => <h3>{word}</h3>)} */}
        </div>
      )
    }
  }
)
