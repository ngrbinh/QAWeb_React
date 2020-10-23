import React, { Component } from 'react'
import { connect } from 'react-redux'

class QuestionDetailPage extends Component {
  render() {
    const id = this.props.match.params.id 
    return (
      <div>
        <h2>This is question detail {id}</h2>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps,mapDispatchToProps)(QuestionDetailPage)