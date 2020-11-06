import React, { Component } from 'react'
import { connect } from 'react-redux'

const GlobalLoading = (props) => {
  const { loading } = props
  return (
    <div className='global-loading' style={{ display: loading ? "flex" : "none" }}>
      <span className="load_span" style={{ display: "inline-block" }}>
        <span className="loader_2"></span>
      </span>
    </div>
  )
}

const mapStateToProps = (state) => ({
  loading: state.globalLoading.loading
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalLoading)
