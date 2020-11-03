import { faCamera, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Answer from '../../../component/Answer'
import Question from '../../../component/Question'
import './index.css'
import { Editor } from '@tinymce/tinymce-react';
import {Link} from 'react-router-dom'
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
  render() {
    const id = this.props.match.params.id
    const questionDetail = {
      question: {
        id: 2,
        user: {
          avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-42x42.jpg',
          name: 'Martin Hope',
          id : 1
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
    const { question, answers } = questionDetail
    const { questionTab,path } = this.state
    return (
      <React.Fragment>
        <div className='breadcrumbs breadcrumbs_1'>
          <div className="breadcrumbs-wrap">
            <div className="breadcrumb-left">
              <span className="crumbs">
                <span>
                  <span>
                    <meta itemprop="position" content="1" />
                    <Link to='/' title="Home">
                      <span><i className="icon-home"><FontAwesomeIcon icon={faHome} /></i>Trang chủ</span>
                    </Link>
                  </span>
                  <span className="crumbs-span">/</span>
                  <span className="current">
                    <meta itemprop="position" content="2" />
                    <a itemprop="item" href="#" title="Questions">
                      <span itemprop="name">Câu hỏi</span>
                    </a>
                  </span>
                  <span className="crumbs-span">/</span>
                  <span className="current">Q {question.id}</span>
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className='clearfix'></div>
        <div className='post-articles question-articles'>
          <Question question={question} shorten={false} scrollToRef={this.scrollToMyRef} />
          <div className='question-adv-comments question-has-comments clearfix'>
            <div id='comments' className='post-section comments-popup-share'>
              <div className='post-inner'>
                <div className='answers-tabs'>
                  <h3 className='section-title'>
                    <span>5 câu trả lời</span>
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
                  {answers.map(item => <Answer answer={item} />)}
                </ol>
                <div className='clearfix'></div>
              </div>
            </div>
            <div className='respond-all' ref={this.myRef}>
              <div id='respond' className='comment-respond'>
                <h3 class="section-title">Viết câu trả lời
                  <div class="cancel-comment-reply">
                    <a rel="nofollow" id="cancel-comment-reply-link" href="#" style={{ display: 'none' }}>Cancel reply</a>
                  </div>
                </h3>
                <form noValidate method='post' >
                  <div class="wpqa_form">
                    <label for="featured_image">Featured image</label>
                    <div class="fileinputs">
                      <input type="file" name="featured_image" id="featured_image" accept='image/*' onChange={e => this.handleFileSelect(e)} />
                      <div class="fakefile">
                        <button type="button">{path}</button>
                        <span>Browse</span>
                      </div>
                      <i class="icon-camera"><FontAwesomeIcon icon={faCamera} /></i>
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
                      toolbar: [
                        'undo redo | styleselect | fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify',
                        'bullist numlist outdent indent | link | preview fullpage | forecolor backcolor emoticons | help'
                      ]
                    }}
                    onEditorChange={this.handleEditorChange}
                  />
                  <p class="form-submit" >
                    <input name="submit" type="submit" id="submit" class="button-default button-hide-click" value="Submit" />
                    <span class="clearfix"></span>
                    <span class="load_span"><span class="loader_2"></span>
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

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetailPage)