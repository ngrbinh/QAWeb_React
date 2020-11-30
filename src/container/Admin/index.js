import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Breadcrumb } from 'antd'

class Admin extends Component {
  render() {
    const { Content } = Layout
    return (
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Quản lý chung</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: "calc(100vh - 100px)",
          }}
        >
          Quản lý chung
        </Content>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
