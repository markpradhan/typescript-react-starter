import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Sample from 'components/sample'
// Actions
import { test } from 'reducer/test'

class Main extends Component<{ success: boolean; test: Function }> {
  componentDidMount() {
    this.props.test()
  }

  render() {
    return <Sample>toist {JSON.stringify(this.props.success)}</Sample>
  }
}

const mstp = ({ test }) => ({ success: test })
const mdtp = dispatch => bindActionCreators({ test }, dispatch)

export default connect<any, any, { article: Object }>(
  mstp,
  mdtp,
)(Main)
