import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Table, Button} from 'semantic-ui-react'
import {IPA} from '../../logic/phone/segments'
import {addPhoneme, removePhoneme} from '../store/redux/actions'

const selectionMap = () =>
  IPA.slice(1).map(row => row.slice(1).map(pair => pair.map(_ => false)))

// const selectioMap2 = IPA.map(row => {
//   return row.map(pair => pair.map(_ => false))
// })

export default connect(
  state => ({language: state.single}),
  dispatch => ({
    addPhoneme: phone => () => dispatch(addPhoneme(phone)),
    removePhoneme: phone => () =>
      dispatch(removePhoneme(phone.me.underlyingGraph))
  })
)(
  class Inventory extends Component {
    // componentDidMount() {
    //   const inv = this.props.language.phonemicInventory
    //   const chart = selectionMap()
    //   for (let graph in inv) {
    //     if (inv[graph].underlyingPhone) {
    //       let row =
    //         IPA.indexOf(
    //           IPA.find(row_ => row_[0] === inv[graph].underlyingPhone.tableRow)
    //         ) - 1
    //       let col = IPA[0].indexOf(inv[graph].underlyingPhone.tableCol) - 1
    //       let pair = inv[graph].underlyingPhone.pairIndex
    //       if (chart[row] && chart[row][col]) {
    //         chart[row][col][pair] = true
    //         IPA[row][col][pair].me = inv[graph]
    //       }
    //     }
    //   }
    //   this.setState({selectionMap: chart})
    // }

    // componentDidMount(){

    // }

    // togglePhoneme(phone) {
    //   if (this.props.language.getPhones.includes(phone)) {
    //     this.props.removePhoneme(phone)
    //   } else this.props.addPhoneme(phone)
    // }

    render() {
      const {id} = this.props.match.params
      return (
        <div>
          <h1>Phonemic Inventory</h1>
          <Table definition>
            <Table.Header>
              <Table.Row>
                {/* <Table.HeaderCell /> */}
                {IPA[0].map(cell => (
                  <Table.HeaderCell key={cell}>{cell}</Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            {IPA.slice(1).map((row, i) => {
              return (
                <Table.Row key={row[0]}>
                  <Table.Cell>{row[0]}</Table.Cell>
                  {row.slice(1).map((pair, j) => {
                    return (
                      <Table.Cell key={pair[0].ipa}>
                        <button
                          type="button"
                          className={
                            'ipa-sub-cell' +
                            (this.props.language.getPhones().includes(pair[0])
                              ? ' ipa-selected'
                              : '')
                          }
                          onClick={
                            this.props.language.getPhones().includes(pair[0])
                              ? this.props.removePhoneme(pair[0])
                              : this.props.addPhoneme(pair[0])
                          }
                        >
                          {pair[0].ipa}
                        </button>
                        <button
                          type="button"
                          className={
                            'ipa-sub-cell' +
                            (this.props.language.getPhones().includes(pair[1])
                              ? ' ipa-selected'
                              : '')
                          }
                          onClick={
                            this.props.language.getPhones().includes(pair[1])
                              ? this.props.removePhoneme(pair[1])
                              : this.props.addPhoneme(pair[1])
                          }
                        >
                          {pair[1].ipa}
                        </button>
                      </Table.Cell>
                    )
                  })}
                </Table.Row>
              )
            })}
          </Table>
          <Link to={`/languages/${id}/orthography`}>
            <Button>Set Orthographic Rules</Button>
          </Link>
        </div>
      )
    }
  }
)
