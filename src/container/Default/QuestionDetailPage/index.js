import { faCamera, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Answer from '../../../component/Answer'
import Question from '../../../component/Question'
import './index.css'
import { Editor } from '@tinymce/tinymce-react';
import { Link } from 'react-router-dom'
import { fetchQuestionDetails, addAnswer, addAnswerImage, addAnswerImageFail } from '../../../redux/ducks/post'
import { firebaseStorage } from '../../../common/firebase';

class QuestionDetailPage extends Component {
  constructor(props) {
    super()
    this.myRef = React.createRef()
  }
  errorRef = React.createRef()
  state = {
    questionTab: 1,
    body: '',
    localError: '',
    localImgUrl: '',
    file: null
  }
  setQuestionTab = (i) => () => {
    this.setState(state => ({
      ...state,
      questionTab: i
    }))
  }
  handleEditorChange = (content, editor) => {
    this.setState(state => ({
      ...state,
      body: content,
      localError: ''
    }))
  }
  scrollToMyRef = () => {
    window.scrollTo(0, this.myRef.current.offsetTop + this.myRef.current.offsetHeight - 100)
  }
  handleFileSelect = (e) => {
    const file = e.target.files[0]
    const localImgUrl = file ? e.target.value : ""
    this.setState(state => ({
      ...state,
      localImgUrl,
      file: file ? file : null,
    }))
  }
  checkInput = () => {
    if (!this.state.body) {
      return "Bạn chưa nhập câu hỏi"
    }
    return null
  }
  handleSubmit = e => {
    e.preventDefault()
    const error = this.checkInput()
    if (error) {
      this.setState(state => ({
        ...state,
        localError: error
      }))
    } else {
      const { history, addAnswer, addAnswerImage, addAnswerImageFail } = this.props
      const parentId = this.props.match.params.id
      const { body, file } = this.state
      var imgUrl = ''
      if (file) {
        addAnswerImage()
        const uploadTask = firebaseStorage.ref(`/images/${file.name}`).put(file)
        uploadTask.on('state_changed',
          (snapShot) => {
            //takes a snap shot of the process as it is happening
            console.log(snapShot)
          }, (err) => {
            console.log(err)
            addAnswerImageFail()
            this.setState(state => ({
              ...state,
              localError: "Không thể upload ảnh. Vui lòng thử lại sau"
            }))
          }, () => {
            firebaseStorage.ref('images').child(file.name).getDownloadURL()
              .then(fireBaseUrl => {
                imgUrl = fireBaseUrl
                addAnswer({ body, imgUrl, parentId }, history)
              })
          })
      } else {
        addAnswer({ body, imgUrl, parentId }, history)
      }

    }
  }
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.fetchQuestionDetails(id)
  }
  componentDidUpdate(prevProps) {
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
    if (this.state.localError || this.props.apiError) {
      //window.scrollTo(0, this.errorRef.current.scrollIntoView(true))
      this.errorRef.current.scrollIntoView()
    }
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.fetchQuestionDetails(this.props.match.params.id)
    }
  }
  canModifyQuestion = () => {
    const { profileId, questionDetails } = this.props
    const { user } = questionDetails
    if (!profileId) {
      return false
    }
    if (!user) {
      return false
    }
    if (user.id !== profileId) {
      return false
    }
    return true
  }
  canModifyAnswer = (answerOwner) => {
    const { profileId } = this.props
    if (!profileId) {
      return false
    }
    if (answerOwner.id !== profileId) {
      return false
    }
    return true
  }
  render() {
    const { questionDetails, loading, apiError, loadingAddAns } = this.props
    var { answers, ...question } = questionDetails
    if (!answers) answers = []
    const { questionTab, localImgUrl, localError, body } = this.state
    return (
      <React.Fragment>
        <div className='breadcrumbs breadcrumbs_1'>
          <div className="breadcrumbs-wrap">
            <div className="breadcrumb-left">
              <span className="crumbs">
                <span>
                  <span>
                    <meta content="1" />
                    <Link to='/' title="Home" style={{ color: "#7c7f85" }}>
                      <span><i className="icon-home"><FontAwesomeIcon icon={faHome} /></i>Trang chủ</span>
                    </Link>
                  </span>
                  <span className="crumbs-span">/</span>
                  <span className="current">
                    <meta content="2" />
                    <a title="Questions" style={{ color: "#7c7f85" }}>
                      <span itemProp="name">Câu hỏi</span>
                    </a>
                  </span>
                  <span className="crumbs-span">/</span>
                  <span className="current">{question ? question.id : null}</span>
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
          {question
            ? <Question question={question} shorten={false} scrollToRef={this.scrollToMyRef}
              modifiable={this.canModifyQuestion()} />
            : null}
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
                  {answers.map(item => <Answer answer={item} key={item.id} modifiable={this.canModifyAnswer(item.user)} />)}
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
                <form noValidate ref={this.errorRef}>
                  <div className="wpqa_error" style={{ display: localError ? 'block' : 'none' }}>
                    <strong>Lỗi :&nbsp;</strong>{localError}
                  </div>
                  <div className="wpqa_error" style={{ display: apiError ? 'block' : 'none' }}>
                    <strong>Lỗi :&nbsp;</strong>{apiError}
                  </div>
                  <div className="wpqa_form">
                    <label htmlFor="featured_image">Featured image</label>
                    <div className="fileinputs">
                      <input type="file" name="featured_image" id="featured_image" accept='image/*' onChange={e => this.handleFileSelect(e)} />
                      <div className="fakefile">
                        <button type="button">{localImgUrl}</button>
                        <span>Browse</span>
                      </div>
                      <i className="icon-camera"><FontAwesomeIcon icon={faCamera} /></i>
                    </div>
                  </div>
                  <div className='clearfix'> </div>
                  <Editor
                    apiKey="h9hlzkzrsfhoiq76kipttagym5wpp1gxqd9cug045u86x11g"
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
                    value={body}
                    onEditorChange={this.handleEditorChange}
                  />
                  <p className="form-submit" >
                    <input type="submit" id="submit" className="button-default button-hide-click" value="Trả lời"
                      onClick={this.handleSubmit} style={{ display: loadingAddAns ? "none" : "inline-block" }} />
                    <span className="clearfix"></span>
                    <span className="load_span" style={{ display: loadingAddAns ? "block" : "none" }}>
                      <span className="loader_2"></span>
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
  loading: state.post.loadingQuestionDetails,
  loadingAddAns: state.post.loadingAddAnswer,
  addAnsError: state.post.addAnswerError,
  profileId: state.profile.id
})

const mapDispatchToProps = {
  fetchQuestionDetails,
  addAnswer,
  addAnswerImage,
  addAnswerImageFail
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetailPage)