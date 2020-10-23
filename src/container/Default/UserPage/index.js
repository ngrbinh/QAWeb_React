import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserPage extends Component {
  render() {
    return (
      <h4>This is User</h4>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
