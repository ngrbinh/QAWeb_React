import { faCamera, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Answer from '../../../component/Answer'
import Question from '../../../component/Question'
import './index.css'
import { Editor } from '@tinymce/tinymce-react';
import { Link } from 'react-router-dom'
import { fetchQuestionDetails } from '../../../redux/ducks/post'

class QuestionDetailPage extends Component {
  constructor(props) {
    super()
    this.myRef = React.createRef()
  }
  state = {
    questionTab: 1,
    path: ''
  }
  setQuestionTab = (i) => () => {
    this.setState(state => ({
      ...state,
      questionTab: i
    }))
  }
  handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
  }
  scrollToMyRef = () => {
    console.log(this.myRef.current.offsetTop)
    window.scrollTo(0, this.myRef.current.offsetTop + this.myRef.current.offsetHeight - 100)
  }
  handleFileSelect = (e) => {
    const newPath = e.target.value
    this.setState(state => ({
      ...state,
      path: newPath
    }))
  }
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.fetchQuestionDetails(id)
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
    const questionDetail1 = {
      question: {
        id: 2,
        user: {
          avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-42x42.jpg',
          name: 'Martin Hope',
          id: 1
        },
        createdDate: '2020-10-08T14:59:00.000+00:00',
        body: `<p>In my local language (Bahasa Indonesia) there are no verb-2 or past tense form as time tracker. So, I often forget to use the past form of verb when speaking english.</p><p>I saw him last night (correct)</p><p>I see him last night (incorrect)</p><p>But i think both has the same meaning and are understandable,</p><p>Isn’t it?</p>?`,
        voteCount: 33,
        subject: "Vật lý",
        grade: "Lớp 10",
        answerCount: "7",
        viewCount: "152"
      },
      answers: [
        {
          id: 3,
          user: {
            avatarUrl: "https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-42x42.jpg",
            name: "Marko Smith",
            id: 7
          },
          voteCount: 8,
          body: `<div> <p>You are correct that both are understandable.</p><p>The only other possible everyday meaning I could think of would be ‘I see him [in my mind’s eye] last night’; that is, I am, at this very moment, imagining him last night. But it should almost always be clear from context which one is intended.</p><p>‘Correct’ doesn’t mean ‘understandable’, though. If I say ‘Me want have fooding’ it’s pretty clear what to understand from that, but it’s not anywhere near correct Standard English grammar. If you lived somewhere where you spoke a dialect of English in which this was acceptable grammar, however, then it would be correct for that dialect.</p> </div>`,
          createdDate: '2020-10-08T14:59:00.000+00:00'
        },
        {
          id: 3,
          user: {
            avatarUrl: "https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-42x42.jpg",
            name: "Marko Smith",
            id: 8
          },
          voteCount: 8,
          body: `<div> <p>You are correct that both are understandable.</p><p>The only other possible everyday meaning I could think of would be ‘I see him [in my mind’s eye] last night’; that is, I am, at this very moment, imagining him last night. But it should almost always be clear from context which one is intended.</p><p>‘Correct’ doesn’t mean ‘understandable’, though. If I say ‘Me want have fooding’ it’s pretty clear what to understand from that, but it’s not anywhere near correct Standard English grammar. If you lived somewhere where you spoke a dialect of English in which this was acceptable grammar, however, then it would be correct for that dialect.</p> </div>`,
          createdDate: '2020-10-08T14:59:00.000+00:00'
        },
        {
          id: 3,
          user: {
            avatarUrl: "https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-42x42.jpg",
            name: "Marko Smith",
            id: 9
          },
          voteCount: 8,
          body: `<div> <p>You are correct that both are understandable.</p><p>The only other possible everyday meaning I could think of would be ‘I see him [in my mind’s eye] last night’; that is, I am, at this very moment, imagining him last night. But it should almost always be clear from context which one is intended.</p><p>‘Correct’ doesn’t mean ‘understandable’, though. If I say ‘Me want have fooding’ it’s pretty clear what to understand from that, but it’s not anywhere near correct Standard English grammar. If you lived somewhere where you spoke a dialect of English in which this was acceptable grammar, however, then it would be correct for that dialect.</p> </div>`,
          createdDate: '2020-10-08T14:59:00.000+00:00'
        }
      ]
    }
    const { questionDetails, loading } = this.props
    var { answers, ...question } = questionDetails
    if (!answers) answers = []
    const { questionTab, path } = this.state
    return (
      <React.Fragment>
        <div className='breadcrumbs breadcrumbs_1'>
          <div className="breadcrumbs-wrap">
            <div className="breadcrumb-left">
              <span className="crumbs">
                <span>
                  <span>
                    <meta content="1" />
                    <Link to='/' title="Home">
                      <span><i className="icon-home"><FontAwesomeIcon icon={faHome} /></i>Trang chủ</span>
                    </Link>
                  </span>
                  <span className="crumbs-span">/</span>
                  <span className="current">
                    <meta content="2" />
                    <a itemProp="item" href="#" title="Questions">
                      <span itemProp="name">Câu hỏi</span>
                    </a>
                  </span>
                  <span className="crumbs-span">/</span>
                  <span className="current">Q {question ? question.id : null}</span>
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className='clearfix'></div>
        <div className='center-child'>
          <span className="load_span" style={loading ? { display: "inline-block" } : { display: "none" }}>
            <span className="loader_2"></span>
          </span>
        </div>
        <div className='post-articles question-articles question-detail' style={loading ? { display: "none" } : { display: "block" }}>
          {question ? <Question question={question} shorten={false} scrollToRef={this.scrollToMyRef} /> : null}
          <div className='question-adv-comments question-has-comments clearfix'>
            <div id='comments' className='post-section comments-popup-share'>
              <div className='post-inner'>
                <div className='answers-tabs'>
                  <h3 className='section-title'>
                    <span>{answers.length} câu trả lời</span>
                  </h3>
                  <div className="answers-tabs-inner">
                    <ul>
                      <li className={questionTab == 1 ? "active-tab" : ""}><a onClick={this.setQuestionTab(1)}>Bình chọn</a></li>
                      <li className={questionTab == 2 ? "active-tab" : ""}><a onClick={this.setQuestionTab(2)}>Cũ nhất</a></li>
                      <li className={questionTab == 3 ? "active-tab" : ""}><a onClick={this.setQuestionTab(3)}>Mới nhất</a></li>
                    </ul>
                  </div>
                  <div className='clearfix'></div>
                </div>
                <ol className='commentlist clearfix'>
                  {answers.map(item => <Answer answer={item} key={item.id} />)}
                </ol>
                <div className='clearfix'></div>
              </div>
            </div>
            <div className='respond-all' ref={this.myRef}>
              <div id='respond' className='comment-respond'>
                <h3 className="section-title">Viết câu trả lời
                  <div className="cancel-comment-reply">
                    <a rel="nofollow" id="cancel-comment-reply-link" href="#" style={{ display: 'none' }}>Cancel reply</a>
                  </div>
                </h3>
                <form noValidate method='post' >
                  <div className="wpqa_form">
                    <label htmlFor="featured_image">Featured image</label>
                    <div className="fileinputs">
                      <input type="file" name="featured_image" id="featured_image" accept='image/*' onChange={e => this.handleFileSelect(e)} />
                      <div className="fakefile">
                        <button type="button">{path}</button>
                        <span>Browse</span>
                      </div>
                      <i className="icon-camera"><FontAwesomeIcon icon={faCamera} /></i>
                    </div>
                  </div>
                  <div className='clearfix'> </div>
                  <Editor
                    apiKey="h9hlzkzrsfhoiq76kipttagym5wpp1gxqd9cug045u86x11g"
                    initialValue="<p>This is the initial content of the editor</p>"
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                      ],
                      external_plugins: { tiny_mce_wiris: 'https://www.wiris.net/demo/plugins/tiny_mce/plugin.js' },
                      toolbar: [
                        'undo redo | styleselect | fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify',
                        'bullist numlist outdent indent | link | preview fullpage | forecolor backcolor emoticons | tiny_mce_wiris_formulaEditor | help'
                      ]
                    }}
                    onEditorChange={this.handleEditorChange}
                  />
                  <p className="form-submit" >
                    <input name="submit" type="submit" id="submit" className="button-default button-hide-click" value="Submit" />
                    <span className="clearfix"></span>
                    <span className="load_span"><span className="loader_2"></span>
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>

        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  questionDetails: state.post.questionDetails,
  loading: state.post.loadingQuestionDetails
})

const mapDispatchToProps = {
  fetchQuestionDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetailPage)