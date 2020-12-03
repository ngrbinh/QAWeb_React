import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchQuestionDetails, editPost, editPostImage, editPostImageFail } from '../../../redux/ducks/post'
import { Link } from 'react-router-dom'
import { faCamera, faHome, faFolder, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Editor } from '@tinymce/tinymce-react';
import { fetchSubjects } from '../../../redux/ducks/subject'
import { fetchGrades } from '../../../redux/ducks/grade'
import { firebaseStorage } from '../../../common/firebase';

class EditQuestionPage extends Component {
  state = {
    question: this.questionState,
    localError: '',
  }
  myRef = React.createRef()
  checkInput = () => {
    const { body, subjectTypeId, gradeTypeId } = this.state.question
    if (subjectTypeId == 0 || gradeTypeId == 0) {
      return "Bạn chưa chọn lớp và môn học"
    }
    if (!body) {
      return "Bạn chưa điền nội dung câu hỏi"
    }
    return null
  }
  handleFileSelect = (e) => {
    const file = e.target.files[0]
    const newUrl = file ? URL.createObjectURL(file) : ""
    const localImgUrl = file ? e.target.value : ""
    this.setState(state => ({
      ...state,
      question: {
        ...state.question,
        imgUrl: newUrl ? newUrl : state.question.imgUrl,
        file: file ? file : null,
        localImgUrl: localImgUrl ? localImgUrl : state.question.localImgUrl
      },
      localError: ''
    }))
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
      const { id, body, subjectTypeId, gradeTypeId, file } = this.state.question
      var { imgUrl } = this.state.question
      const { history, editPost, editPostImage, editPostImageFail } = this.props
      if (file) {
        editPostImage()
        const uploadTask = firebaseStorage.ref(`/images/${file.name}`).put(file)
        uploadTask.on('state_changed',
          (snapShot) => {
            console.log(snapShot)
          }, (err) => {
            console.log(err)
            editPostImageFail()
            this.setState(state => ({
              ...state,
              localError: "Không thể upload ảnh. Vui lòng thử lại sau"
            }))
          }, () => {
            firebaseStorage.ref('images').child(file.name).getDownloadURL()
              .then(fireBaseUrl => {
                imgUrl = fireBaseUrl
                editPost(id, { body, imgUrl, subjectTypeId: parseInt(subjectTypeId), gradeTypeId }, history)
              })
          })
      } else {
        editPost(id, { body, imgUrl, subjectTypeId: parseInt(subjectTypeId), gradeTypeId }, history)
      }
    }
  }
  handleInputChange = (e) => {
    var { name, value } = e.target
    this.setState(state => ({
      ...state,
      question: {
        ...state.question,
        [name]: value
      },
      localError: '',
    }))
  }
  handleEditorChange = (content, editor) => {
    this.setState(state => ({
      ...state,
      question: {
        ...state.question,
        body: content,
      },
      localError: '',
    }))
  }
  handleDeleteImage = () => {
    this.setState(state => ({
      ...state,
      question: {
        ...state.question,
        imgUrl: '',
        localImgUrl: ''
      },
      localError: ''
    }))
  }
  get questionState() {
    const { questionDetails } = this.props
    const { answers, ...question } = questionDetails
    const { id, imgUrl, subjectTypeId, gradeTypeId, body } = question
    const state = {
      id,
      imgUrl,
      subjectTypeId: subjectTypeId ? subjectTypeId : 0,
      gradeTypeId: gradeTypeId ? gradeTypeId : 0,
      body,
      file: null,
      localImgUrl: '',
    }
    return { ...state }
  }
  componentDidUpdate(prevProps) {
    if (this.props.questionDetails.id !== prevProps.questionDetails.id) {
      this.setState({ question: this.questionState })
    }
    if (this.state.localError || this.props.apiError) {
      window.scrollTo(0, this.myRef.current.scrollIntoView())
    }
  }
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.fetchQuestionDetails(id)
    this.props.fetchGrades()
    this.props.fetchSubjects()
  }
  render() {
    const { loadingEditQues, subjects, grades, apiError } = this.props
    const { localError, question } = this.state
    const { id, imgUrl, subjectTypeId, gradeTypeId, body, localImgUrl } = question
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
                      <span itemProp="name">Sửa câu hỏi</span>
                    </a>
                  </span>
                  <span className="crumbs-span">/</span>
                  <span className="current">{id ? id : null}</span>
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className='clearfix'></div>
        <div className='wpqa-templates wpqa-edit-question-template'>
          <form className='form-post wpqa_form' method='post' ref={this.myRef}>
            {localError ? <div className="wpqa_error" style={{ display: "block" }}>
              <strong>Lỗi :&nbsp;</strong> {localError}
            </div> : null}
            {apiError ? <div className="wpqa_error" style={{ display: "block" }}>
              <strong>Lỗi :&nbsp;</strong> {apiError}
            </div> : null}
            <div className='form-inputs clearfix'>
              <div className="wpqa_category">
                <label htmlFor="subject_aq">Môn học<span className="required">*</span></label>
                <span className="styled-select">
                  <FontAwesomeIcon icon={faAngleDown} className='arrow_down' />
                  <select id="subject_aq" className="postform" name='subjectTypeId'
                    value={subjectTypeId} onChange={this.handleInputChange}>
                    <option value="0">Chọn môn học</option>
                    {
                      subjects.map(item => <option value={item.id} key={'sj' + item.id}>{item.name}</option>)
                    }
                  </select>
                </span>
                <i className="icon-folder"><FontAwesomeIcon icon={faFolder} /></i>
                <span className="form-description">Chọn môn học để dễ dàng tìm kiếm</span>
              </div>
              <div className="wpqa_category">
                <label htmlFor="grade_qa">Cấp bậc<span className="required">*</span></label>
                <span className="styled-select">
                  <FontAwesomeIcon icon={faAngleDown} className='arrow_down' />
                  <select name="gradeTypeId" id="grade_qa" className="postform"
                    value={gradeTypeId} onChange={this.handleInputChange}>
                    <option value={0}>Chọn lớp</option>
                    {
                      grades.map(item => <option value={item.id} key={'gr' + item.id}>{item.name}</option>)
                    }
                  </select>
                </span>
                <i className="icon-folder"><FontAwesomeIcon icon={faFolder} /></i>
                <span className="form-description">Chọn lớp để dễ dàng tìm kiếm</span>
              </div>
            </div>
            {
              imgUrl ?
                <div className="wpqa-delete-image">
                  <p className='delete-imgae-title'>Ảnh đính kèm</p>
                  <span className="wpqa-delete-image-span">
                    <img width="250" height="250" src={imgUrl} />
                  </span>
                  <div className="clearfix"></div>
                  <div className="button-default wpqa-remove-image" onClick={this.handleDeleteImage}>Xóa</div>
                  {/* <div className="loader_2 loader_4"></div> */}
                </div>
                : null
            }
            <div className="wpqa_form">
              <label htmlFor="featured_image">Đổi ảnh đính kèm</label>
              <div className="fileinputs">
                <input type="file" name="featured_image" id="featured_image" onChange={e => this.handleFileSelect(e)} accept='image/*' />
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
              value={body}
              init={{
                height: 400,
                menubar: false,
                external_plugins: { tiny_mce_wiris: 'https://www.wiris.net/demo/plugins/tiny_mce/plugin.js' },
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar: [
                  'undo redo | styleselect | fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify',
                  'bullist numlist outdent indent | link | preview fullpage | forecolor backcolor emoticons | tiny_mce_wiris_formulaEditor'
                ]
              }}
              onEditorChange={this.handleEditorChange}
            />

            <p className="form-submit" style={{ marginTop: '20px' }}>
              <input name="submit" type="submit" value="Xác nhận" id="submit"
                className="button-default button-hide-click"
                onClick={this.handleSubmit} style={{ display: loadingEditQues ? "none" : "inline-block" }} />
              <span className="load_span" style={{ display: loadingEditQues ? "block" : "none" }}>
                <span className="loader_2"></span>
              </span>
            </p>
          </form>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  questionDetails: state.post.questionDetails,
  grades: state.grade.grades,
  subjects: state.subject.subjects,
  loadingEditQues: state.post.loadingEdit,
  apiError: state.post.editError
})

const mapDispatchToProps = {
  fetchQuestionDetails,
  fetchSubjects,
  fetchGrades,
  editPost,
  editPostImage,
  editPostImageFail
}

export default connect(mapStateToProps, mapDispatchToProps)(EditQuestionPage)
