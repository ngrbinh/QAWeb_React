import { faAngleDown, faFolder, faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Editor } from '@tinymce/tinymce-react';
import { addQuestion } from '../../redux/ducks/post'
import { fetchSubjects } from '../../redux/ducks/subject'
import { fetchGrades } from '../../redux/ducks/grade'
class AskPanel extends Component {
  state = {
    imgUrl: '',
    body: '',
    subjectTypeId: 0,
    gradeTypeId: 0,
    localError: '',
    apiError: ''
  }
  myRef = React.createRef()
  handleFileSelect = (e) => {
    const newUrl = e.target.value
    this.setState(state => ({
      ...state,
      imgUrl: newUrl,
      localError: '',
      apiError: ''
    }))
  }
  handleInputChange = (e) => {
    var { name, value } = e.target
    this.setState(state => ({
      ...state,
      [name]: value,
      localError: '',
    }))
  }
  handleEditorChange = (content, editor) => {
    this.setState(state => ({
      ...state,
      body: content,
      localError: '',
    }))
  }
  checkInput = () => {
    const { body, subjectTypeId, gradeTypeId } = this.state
    if (subjectTypeId == 0 || gradeTypeId == 0) {
      return "Bạn chưa chọn lớp và môn học"
    }
    if (!body) {
      return "Bạn chưa điền nội dung câu hỏi"
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
      const { body, imgUrl, subjectTypeId, gradeTypeId } = this.state
      const { history } = this.props
      //console.log(history)
      this.props.addQuestion({ body, imgUrl, subjectTypeId, gradeTypeId }, history)
    }
  }
  componentDidUpdate() {
    if (this.state.localError || this.props.apiError) {
      window.scrollTo(0, this.myRef.current.scrollIntoView())
    }
  }
  componentDidMount() {
    this.props.fetchGrades()
    this.props.fetchSubjects()
  }
  render() {
    const { imgUrl, subjectTypeId, gradeTypeId, localError } = this.state
    const { apiError, loadingAddQues, subjects, grades } = this.props
    return (
      <div className='panel-pop-content' id='wpqa-question'>
        <form className='form-post wpqa_form' method='post' ref={this.myRef}>
          {localError ? <div className="wpqa_error" style={{ display: "block" }}>
            <strong>Lỗi :&nbsp;</strong> {localError}
          </div> : null}
          {apiError ? <div className="wpqa_error" style={{ display: "block" }}>
            <strong>Lỗi :&nbsp;</strong> {apiError}
          </div> : null}
          <div className='form-inputs clearfix'>
            <div className="wpqa_category">
              <label htmlFor="subject_aq">Lớp<span className="required">*</span></label>
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
          <div className="wpqa_form">
            <label htmlFor="featured_image">Featured image</label>
            <div className="fileinputs">
              <input type="file" name="featured_image" id="featured_image" onChange={e => this.handleFileSelect(e)} accept='image/*' />
              <div className="fakefile">
                <button type="button">{imgUrl}</button>
                <span>Browse</span>
              </div>
              <i className="icon-camera"><FontAwesomeIcon icon={faCamera} /></i>
            </div>
          </div>
          <div className='clearfix'> </div>
          <Editor
            apiKey="h9hlzkzrsfhoiq76kipttagym5wpp1gxqd9cug045u86x11g"
            initialValue=""
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
              onClick={this.handleSubmit} style={{ display: loadingAddQues ? "none" : "inline-block" }} />
            <span className="load_span" style={{ display: loadingAddQues ? "block" : "none" }}>
              <span className="loader_2"></span>
            </span>
          </p>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loadingAddQues: state.post.loadingAddQuestion,
  apiError: state.post.addQuestionError,
  grades: state.grade.grades,
  subjects: state.subject.subjects
})

const mapDispatchToProps = {
  addQuestion,
  fetchSubjects,
  fetchGrades
}

export default connect(mapStateToProps, mapDispatchToProps)(AskPanel)
