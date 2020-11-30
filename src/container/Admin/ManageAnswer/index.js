import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Breadcrumb, Table, Button, Modal } from 'antd'
import { fetchAnswers, deletePost } from '../../../redux/ducks/post'
import { truncateWithEllipsis } from '../../../common/functions'

class ManageAnswer extends Component {
  state = {
    curPage: 1,
    alertModal: false,
    curId: null
  }
  componentDidMount() {
    const { fetchAnswers } = this.props
    fetchAnswers(1, 10, '-date')
  }
  onPageNumberChange = (page) => {
    const { fetchAnswers } = this.props
    fetchAnswers(page, 10, '-date')
    this.setState({ curPage: page })
  }
  deleteAnswer = (id) => {
    //console.log(id)
    //this.props.deletePost(id)
  }
  showAlert = (id) => {
    this.setState(state => ({
      ...state,
      alertModal: true,
      curId: id
    }))
  }
  handleConfirm = () => {
    const { curId } = this.state
    this.setState(state => ({
      ...state,
      alertModal: false
    }))
    //console.log(curId)
    this.props.deletePost(curId)
  }
  handleCancel = () => {
    this.setState(state => ({
      ...state,
      alertModal: false
    }))
  }
  render() {
    const { Content } = Layout
    const { totalPage, answers, loadingAnswers, deletingIds } = this.props
    const { curPage, alertModal } = this.state
    const parse = require('html-react-parser')
    const columns = [
      {
        title: 'STT',
        dataIndex: 'STT',
        key: 'STT'
      },
      {
        title: 'Nội dung',
        dataIndex: 'content',
        key: 'content',
      },
      {
        title: 'Ảnh đính kèm',
        dataIndex: "imgUrl",
        key: 'imgUrl',
        render: imgUrl => (
          <div className="featured_image_question">
            <a href={imgUrl}>
              <img alt="" src={imgUrl} style={{ maxHeight: 200 }} />
            </a>
          </div>
        )
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
        dataIndex: 'ids',
        key: 'ids',
        render: ids => (
          <span>
            <Button style={{ marginBottom: 5, marginRight: 5 }} type='primary' href={`/question/${ids.parentId}`}>Chi tiết</Button>
            <Button
              type='primary'
              danger
              onClick={() => this.showAlert(ids.id)}
              loading={deletingIds.includes(ids.id)}
            >Xóa</Button>
          </span>
        )
      }
    ]
    const dataSource = answers.map((item, i) => {
      let creationDateStr, editDateStr
      if (item.creationDate) {
        const formatDate = new Date(item.creationDate)
        creationDateStr = formatDate.getDate() + '/' + (formatDate.getMonth() + 1) + '/' + formatDate.getFullYear()
      } else {
        creationDateStr = ""
      }
      if (item.lastEditDate) {
        const formatDate = new Date(item.lastEditDate)
        editDateStr = formatDate.getDate() + '/' + (formatDate.getMonth() + 1) + '/' + formatDate.getFullYear()
      } else {
        editDateStr = ""
      }
      return ({
        key: i + 1,
        STT: (curPage - 1) * 10 + i + 1,
        ...item,
        creationDate: creationDateStr,
        lastEditDate: editDateStr,
        content: item.body ? parse(truncateWithEllipsis(item.body, 50)) : "",
        parentId: item.parentPostId,
        ids: {
          id: item.id,
          parentId: item.parentPostId
        }
      })
    })
    //console.log(dataSource)
    const pagination = {
      position: ["bottomCenter"],
      onChange: this.onPageNumberChange,
      total: totalPage * 10
    }
    return (
      <Layout style={{ padding: '0 24px 24px' }}>
        <Modal
          title="Xóa câu trả lời"
          visible={alertModal}
          footer={[
            <Button key={'cancel'} onClick={this.handleCancel}>Hủy</Button>,
            <Button key={'confirm'} type='primary' danger onClick={this.handleConfirm}>
              Xác nhận
            </Button>
          ]}
        >
          Bạn có chắc chắn muốn xóa câu trả lời này?
        </Modal>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Quản lý câu trả lời</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: "calc(100vh - 100px)",
          }}
        >
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={pagination}
            loading={loadingAnswers} />
        </Content>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  answers: state.post.answers,
  loadingAnswers: state.post.loadingAnswers,
  totalPage: state.post.totalAnswerPage,
  deletingIds: state.post.deletingIds
})

const mapDispatchToProps = {
  fetchAnswers,
  deletePost
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAnswer)
