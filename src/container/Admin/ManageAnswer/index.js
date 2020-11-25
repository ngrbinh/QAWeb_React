import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Breadcrumb, Table } from 'antd'

class ManageAnswer extends Component {
  onPageNumberChange = (page) => {
    console.log(page)
  }
  render() {
    const { Content } = Layout
    const columns = [
      {
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt'
      },
      {
        title: 'Nội dung',
        dataIndex: 'content',
        key: 'content'
      },
      {
        title: 'Ngày đăng',
        dataIndex: 'creationDate',
        key: 'creationDate'
      },
      {
        title: 'Ngày chỉnh sửa',
        dataIndex: 'lastEditDate',
        key: 'lastEditDate'
      },
      {
        title: 'Lượt bình chọn',
        dataIndex: 'voteCount',
        key: 'voteCount'
      },
      {
        title: 'Id câu hỏi',
        dataIndex: 'parentId',
        key: 'parentId'
      },
      {
        title: 'Thao tác',
        dataIndex: 'action',
        key: 'action '
      }
    ]
    const dataSource = [
      {
        key: "1",
        content: "fefew"
      }
    ]
    const pagination = {
      position: ["bottomCenter"],
      onChange: this.onPageNumberChange,
      total: 500
    }
    return (
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Quản lý câu trả lời</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Table columns={columns} dataSource={dataSource} pagination={pagination} />
        </Content>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAnswer)
