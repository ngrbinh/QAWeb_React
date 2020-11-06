import React, { Component } from 'react'
import { connect } from 'react-redux';
import Question from '../../../component/Question';
import { fetchQuestions, resetQuestions } from '../../../redux/ducks/post'
class Home extends Component {
  state = {
    tabIndex: 1,
    limit: 5,
    page: 1,
    sortBy: "-date"
  }
  switchTab = (index) => () => {
    var newSortBy = null
    switch (index) {
      case 1:
        newSortBy = "-date"
        break
      case 2:
        newSortBy = "-answer"
        break
      case 3:
        newSortBy = "-view"
        break
      case 4:
        newSortBy = "-vote"
        break
    }
    this.setState(state => ({
      ...state,
      tabIndex: index,
      sortBy: newSortBy,
      page: 1
    }))
    const { fetchQuestions,resetQuestions } = this.props
    resetQuestions()
    const { limit} = this.state
    fetchQuestions(1, limit, newSortBy);
  }
  loadMore = () => {
    this.setState(state => ({
      ...state,
      page: state.page + 1
    }))
    const { fetchQuestions } = this.props
    const { page, limit, sortBy } = this.state
    fetchQuestions(page + 1, limit, sortBy);
  }
  componentDidMount() {
    const { fetchQuestions } = this.props
    const { page, limit, sortBy } = this.state
    fetchQuestions(page, limit, sortBy);
  }
  render() {
    const { tabIndex, page } = this.state
    const questions1 = [
      {
        id: 2,
        user: {
          avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-42x42.jpg',
          name: 'Martin Hope',
          id: 1
        },
        createdDate: '2020-10-08T14:59:00.000+00:00',
        body: `In my local language (Bahasa Indonesia) there are no verb-2 or past tense form as time tracker. So, I often forget to use the past form of verb when speaking english.

        I saw him last night (correct)
        
        I see him last night (incorrect)
        
        But i think both has the same meaning and are understandable,
        
        Isn’t it?`,
        voteCount: 33,
        subject: "Vật lý",
        grade: "Lớp 10",
        answerCount: "7",
        viewCount: "152"
      },
      {
        id: 3,
        user: {
          avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-42x42.jpg',
          name: 'Martin Hope',
          id: 2
        },
        createdDate: '2020-10-08T14:59:00.000+00:00',
        body: `In my local language (Bahasa Indonesia) there are no verb-2 or past tense form as time tracker. So, I often forget to use the past form of verb when speaking english.

        I saw him last night (correct)
        
        I see him last night (incorrect)
        
        But i think both has the same meaning and are understandable,
        
        Isn’t it?`,
        voteCount: 33,
        subject: "Vật lý",
        grade: "Lớp 10",
        answerCount: "7",
        viewCount: "152"
      },
      {
        id: 4,
        user: {
          avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-42x42.jpg',
          name: 'Martin Hope',
          id: 3
        },
        createdDate: '2020-10-08T14:59:00.000+00:00',
        body: `In my local language (Bahasa Indonesia) there are no verb-2 or past tense form as time tracker. So, I often forget to use the past form of verb when speaking english.

        I saw him last night (correct)
        
        I see him last night (incorrect)
        
        But i think both has the same meaning and are understandable,
        
        Isn’t it?`,
        voteCount: 33,
        subject: "Vật lý",
        grade: "Lớp 10",
        answerCount: "7",
        viewCount: "152"
      },
      {
        id: 5,
        user: {
          avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-42x42.jpg',
          name: 'Martin Hope',
          id: 4
        },
        createdDate: '2020-10-08T14:59:00.000+00:00',
        body: `In my local language (Bahasa Indonesia) there are no verb-2 or past tense form as time tracker. So, I often forget to use the past form of verb when speaking english.

        I saw him last night (correct)
        
        I see him last night (incorrect)
        
        But i think both has the same meaning and are understandable,
        
        Isn’t it?`,
        voteCount: 33,
        subject: "Vật lý",
        grade: "Lớp 10",
        answerCount: "7",
        viewCount: "152"
      },
      {
        id: 6,
        user: {
          avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-42x42.jpg',
          name: 'Martin Hope',
          id: 5
        },
        createdDate: '2020-10-08T14:59:00.000+00:00',
        body: `In my local language (Bahasa Indonesia) there are no verb-2 or past tense form as time tracker. So, I often forget to use the past form of verb when speaking english.

        I saw him last night (correct)
        
        I see him last night (incorrect)
        
        But i think both has the same meaning and are understandable,
        
        Isn’t it?`,
        voteCount: 33,
        subject: "Vật lý",
        grade: "Lớp 10",
        answerCount: "7",
        viewCount: "152"
      }
    ]
    const { questions, loadingQuestions } = this.props
    return (
      <React.Fragment>
        <div className='clefix'></div>
        <div className='row row-tabs'>
          <div className='col col12'>
            <div className='wrap-tabs'>
              <div className='menu-tabs active-menu'>
                <ul className='menu flex menu-tabs-desktop'>
                  <li className={tabIndex == 1 ? 'active-tab' : ''}>
                    <a href='#' onClick={this.switchTab(1)}>Câu hỏi mới</a>
                  </li>
                  <li className={tabIndex == 2 ? 'active-tab' : ''}>
                    <a href='#' onClick={this.switchTab(2)}>Trả lời nhiều</a>
                  </li>
                  <li className={tabIndex == 3 ? 'active-tab' : ''}>
                    <a href='#' onClick={this.switchTab(3)}>Được xem nhiều</a>
                  </li>
                  <li className={tabIndex == 4 ? 'active-tab' : ''}>
                    <a href='#' onClick={this.switchTab(4)}>Được bình chọn nhiều</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <section>
          <h2 className="screen-reader-text">Questions</h2>
          <div className="post-articles question-articles">
            {questions.map(item => {
              return <Question question={item} shorten={true} key={item.id} />
            })}
          </div>
          <div className='clearfix'></div>
          <div className="pagination-wrap pagination-question">
            <div className="pagination-nav posts-load-more">
              <span className="load_span" style={loadingQuestions ? { display: "inline-block" } : { display: "none" }}>
                <span className="loader_2"></span>
              </span>
              <div className="load-more" style={loadingQuestions ? { display: "none" } : { display: "block" }}>
                <a onClick={this.loadMore}>Xem thêm</a>
              </div>
            </div>
          </div>
        </section>

      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.profile,
    questions: state.post.questions,
    loadingQuestions: state.post.loadingQuestions,
    modal: state.modal,
    token: state.account.token
  };
}

const mapDispatchToProps = {
  fetchQuestions,
  resetQuestions
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

