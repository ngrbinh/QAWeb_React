import React, { Component } from 'react'
import { connect } from 'react-redux'

class BadgePage extends Component {
  render() {
    return (
      <h4>This is badge</h4>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(BadgePage)
