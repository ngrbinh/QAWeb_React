import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Breadcrumb, Table, Button, Modal } from 'antd'
import { fetchQuestions, deletePost, resetQuestions } from '../../../redux/ducks/post'
import { truncateWithEllipsis } from '../../../common/functions'

class ManageQuestion extends Component {
  state = {
    curPage: 1,
    alertModal: false,
    curId: null
  }
  componentDidMount() {
    const { fetchQuestions } = this.props
    resetQuestions()
    fetchQuestions(1, 10, '-date')
  }
  onPageNumberChange = (page) => {
    const { fetchQuestions, resetQuestions } = this.props
    resetQuestions()
    fetchQuestions(page, 10, '-date')
    this.setState({ curPage: page })
  }
  deleteQuestion = (id) => {
    //console.log(id)
    this.props.deletePost(id)
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
    const { totalPage, questions, loadingQuestions, deletingIds } = this.props
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
        key: 'content'
      },
      {
        title: 'Ảnh đính kèm',
        dataIndex: "imgUrl",
        key: 'imgUrl',
        render: imgUrl => {
          return (
            <div className="featured_image_question">
              <a href={imgUrl}>
                <img alt="" src={imgUrl} style={{ maxHeight: 150, maxWidth: 200 }} />
              </a>
            </div>
          )
        }
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
        title: 'Lượt xem',
        dataIndex: 'viewCount',
        key: 'viewCount'
      },
      {
        title: 'Số câu trả lời',
        dataIndex: 'answerCount',
        key: 'answerCount'
      },
      {
        title: 'Thao tác',
        dataIndex: 'id',
        key: 'id',
        render: id => (
          <span>
            <Button style={{ marginBottom: 5, marginRight: 5 }} type='primary' href={`/question/${id}`}>Chi tiết</Button>
            <Button
              type='primary'
              danger
              onClick={() => this.showAlert(id)}
              loading={deletingIds.includes(id)}
            >Xóa</Button>
          </span>
        )
      }
    ]
    const dataSource = questions.map((item, i) => {
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
      })
    })
    const pagination = {
      position: ["bottomCenter"],
      onChange: this.onPageNumberChange,
      total: totalPage * 10
    }
    const { Content } = Layout
    return (
      <Layout style={{ padding: '0 24px 24px' }}>
        <Modal
          title="Xóa câu hỏi"
          visible={alertModal}
          footer={[
            <Button key={'cancel'} onClick={this.handleCancel}>Hủy</Button>,
            <Button key={'confirm'} type='primary' danger onClick={this.handleConfirm}>
              Xác nhận
            </Button>
          ]}
        >
          Bạn có chắc chắn muốn xóa câu hỏi này?
        </Modal>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Quản lý câu hỏi</Breadcrumb.Item>
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
            loading={loadingQuestions}
          />
        </Content>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  loadingQuestions: state.post.loadingQuestions,
  questions: state.post.questions,
  totalPage: state.post.totalQuestionPage,
  deletingIds: state.post.deletingIds
})

const mapDispatchToProps = {
  fetchQuestions,
  deletePost,
  resetQuestions
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageQuestion)
