import React, { Component } from 'react'
import { connect } from 'react-redux';
import Question from '../../../component/Question';
class Home extends Component {
  state = {
    tabIndex: 1,
  }
  switchTab = (index) => () => {
    this.setState(state => ({
      ...state,
      tabIndex: index
    }))
  }
  render() {
    const tabIndex = this.state.tabIndex
    const questions = [
      {
        id : 2,
        user: {
          avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-42x42.jpg',
          name: 'Martin Hope',
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
        id : 3,
        user: {
          avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-42x42.jpg',
          name: 'Martin Hope',
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
        id : 4,
        user: {
          avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-42x42.jpg',
          name: 'Martin Hope',
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
        id : 5,
        user: {
          avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-42x42.jpg',
          name: 'Martin Hope',
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
        id : 6,
        user: {
          avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-42x42.jpg',
          name: 'Martin Hope',
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
                    <a href='#' onClick={this.switchTab(3)}>Chưa được trả lời</a>
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
          <h2 class="screen-reader-text">Questions</h2>
          <div className="post-articles question-articles">
            {questions.map(item => {
              return <Question question = {item}/>
            })}
          </div>
          <div className='clearfix'></div>
          <div class="pagination-wrap pagination-question">
            <div class="pagination-nav posts-load-more">
              <span class="load_span"><span class="loader_2"></span></span>
              <div class="load-more">
                <a href="#">Xem thêm</a>
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
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

