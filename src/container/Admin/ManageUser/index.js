import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Breadcrumb, Table, Tag, Button } from 'antd'
import { fetchUsers, deleteUser } from '../../../redux/ducks/user'
import defaultAvatar from '../../../assets/image/user_avatar_default.png'
class ManageUser extends Component {
  state = {
    curPage: 1
  }
  componentDidMount() {
    const { fetchUsers } = this.props
    fetchUsers(1, 10, '-date')
  }
  onPageNumberChange = (page) => {
    const { fetchUsers } = this.props
    fetchUsers(page, 10, '-date')
    this.setState({ curPage: page })
  }
  deleteUser = (id) => {
    //console.log(id)
    this.props.deleteUser(id)
  }
  render() {
    const { totalPage, users, loadingUsers, deletingIds } = this.props
    const { curPage } = this.state
    const columns = [
      {
        title: 'STT',
        dataIndex: 'STT',
        key: 'STT'
      },
      {
        title: 'Tên hiển thị',
        dataIndex: 'displayName',
        key: 'displayName'
      },
      {
        title: 'Ảnh đại diện',
        dataIndex: 'avatarUrl',
        key: 'avatarUrl',
        render: avatarUrl => (
          <div className='author-image mgb0'>
            <span className='author-image-span'>
              <img className='avatar' src={avatarUrl ? avatarUrl : defaultAvatar} className='admin-table' />
            </span>
          </div>
        )
      },
      {
        title: 'Ngày sinh',
        dataIndex: 'birthDate',
        key: 'birthDate',
      },
      {
        title: 'Huy hiệu',
        dataIndex: 'badge',
        key: 'badge',
        render: badge => badge ? (
          <Tag color={`#${badge.typeColor}`}>
            {badge.typeName}
          </Tag>
        ) : null
      },
      {
        title: 'Số người theo dõi',
        dataIndex: 'followCount',
        key: 'followCount'
      },
      {
        title: 'Lượt bình chọn',
        dataIndex: 'voteCount',
        key: 'voteCount'
      },
      {
        title: 'Số câu trả lời',
        dataIndex: 'answerCount',
        key: 'answerCount'
      },
      {
        title: 'Số câu hỏi',
        dataIndex: 'questionCount',
        key: 'questionCount'
      },
      {
        title: 'Thao tác',
        dataIndex: 'id',
        key: 'id',
        render: id => (
          <span>
            <Button style={{ marginBottom: 5, marginRight: 5 }} type='primary' href={`/user/${id}`}>Chi tiết</Button>
            <Button
              type='primary'
              danger
              onClick={() => this.deleteUser(id)}
              loading={deletingIds.includes(id)}
            >Xóa</Button>
          </span>
        )
      }
    ]
    const dataSource = users.map((item, i) => {
      let dateString
      if (item.birthDate) {
        const formatDate = new Date(item.birthDate)
        dateString = formatDate.getDate() + '/' + (formatDate.getMonth() + 1) + '/' + formatDate.getFullYear()
      } else {
        dateString = ""
      }
      return ({
        key: i + 1,
        STT: (curPage - 1) * 10 + i + 1,
        ...item,
        badge: item.badges[0],
        birthDate: dateString
      })
    })
    //console.log(dataSource)
    const pagination = {
      position: ["bottomCenter"],
      onChange: this.onPageNumberChange,
      total: totalPage * 10,
      showSizeChanger: false
    }
    const { Content } = Layout
    return (
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Quản lý người dùng</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: '80vh',
          }}
        >
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={pagination}
            loading={loadingUsers}
          />
        </Content>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.user.users,
  totalPage: state.user.totalPage,
  loadingUsers: state.user.loadingUsers,
  deletingIds: state.user.deletingIds
})

const mapDispatchToProps = {
  fetchUsers,
  deleteUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser)
