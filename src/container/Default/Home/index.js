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
    const { fetchQuestions,resetQuestions } = this.props
    const { page, limit, sortBy } = this.state
    resetQuestions()
    fetchQuestions(page, limit, sortBy);
  }
  componentDidUpdate() {
    (function () {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML";
      var element = document.getElementsByClassName("content-text");
      var config =
        'MathJax.Hub.Config({' +
        'messageStyle: "none",' +
        'SVG: {' +
        'scale: 120,' +
        'linebreaks: {' +
        'automatic: true' +
        '}' +
        '},' +
        '"HTML-CSS": { linebreaks: { automatic: true } },' +
        'CommonHTML: { linebreaks: { automatic: true } },' +
        'tex2jax: {' +
        `inlineMath: [['$', '$'], ["\\(", "\\)"]]` +
        '},' +
        '});' +
        'MathJax.Hub.Startup.onload();';

      if (window.opera) { script.innerHTML = config }
      else { script.text = config }
      script.onload = new Function("MathJax.Hub.Queue(['Typeset',MathJax.Hub]);")
      document.getElementsByTagName("head")[0].appendChild(script);
    })();
  }
  render() {
    //console.log(this.props)
    const { tabIndex, page } = this.state
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

