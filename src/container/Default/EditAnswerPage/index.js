import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { editPost, editPostImage, editPostImageFail } from '../../../redux/ducks/post'
import { faCamera, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { firebaseStorage } from '../../../common/firebase'
import { Link } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react';

class EditAnswerPage extends Component {
  state = {
    answer: this.initAnswer,
    localError: '',
  }
  myRef = React.createRef()
  get initAnswer() {
    const { answer } = this.props
    return {
      ...answer,
      file: null,
      localPath: ''
    }
  }
  componentDidUpdate(prevProps) {
    if (this.state.localError || this.props.apiError) {
      window.scrollTo(0, this.myRef.current.scrollIntoView())
    }
  }
  modifiable = () => {
    const { profileId, answer } = this.props
    if (!answer.user) return false
    if (!profileId) return false
    if (profileId !== answer.user.id) {
      return false
    }
    return true
  }
  handleDeleteImage = () => {
    this.setState(state => ({
      ...state,
      answer: {
        ...state.answer,
        file: null,
        localPath: '',
        imgUrl: ''
      },
      localError: '',
    }))
  }
  handleFileSelect = e => {
    const file = e.target.files[0]
    const imgUrl = file ? URL.createObjectURL(file) : this.state.answer.imgUrl
    const localPath = file ? e.target.value : this.state.answer.localPath
    this.setState(state => ({
      ...state,
      answer: {
        ...state.answer,
        imgUrl,
        file: file ? file : state.answer.file,
        localPath,
      },
      localError: ''
    }))
  }
  handleEditorChange = (content, editor) => {
    this.setState(state => ({
      ...state,
      answer: {
        ...state.answer,
        body: content,
      },
      localError: '',
    }))
  }
  checkInput = () => {
    const { body } = this.state.answer
    if (!body) {
      return "Bạn chưa điền nội dung câu trả lời"
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
      const { id, body, file, parentPostId } = this.state.answer
      var { imgUrl } = this.state.answer
      const { history, editPost, editPostImage, editPostImageFail } = this.props
      if (file) {
        editPostImage()
        const uploadTask = firebaseStorage.ref(`/images/answer-${id}`).put(file)
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
            firebaseStorage.ref('images').child(`answer-${id}`).getDownloadURL()
              .then(fireBaseUrl => {
                imgUrl = fireBaseUrl
                editPost(id, parentPostId, { body, imgUrl }, history)
              })
          })
      } else {
        editPost(id, parentPostId, { body, imgUrl }, history)
      }
    }
  }
  render() {
    const { apiError, editting } = this.props
    const { localError, answer } = this.state
    const { imgUrl, body, localPath } = answer
    return this.modifiable()
      ? (<React.Fragment>
        <div className='breadcrumbs breadcrumbs_1'>
          <div className="breadcrumbs-wrap">
            <div className="breadcrumb-left">
              <span className="crumbs">
                <span>
                  <span>
                    <Link to='/' title="Home">
                      <span><i className="icon-home"><FontAwesomeIcon icon={faHome} /></i>Trang chủ</span>
                    </Link>
                  </span>
                  <span className="crumbs-span">/</span>
                  <span className="current">
                    <meta content="2" />
                    <a href="#" title="Answer">
                      <span itemProp="name">Sửa câu trả lời</span>
                    </a>
                  </span>
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
            {
              imgUrl ?
                <div className="wpqa-delete-image">
                  <p className='delete-imgae-title'>Ảnh đính kèm</p>
                  <span className="wpqa-delete-image-span">
                    <img width="250" height="250" src={imgUrl} />
                  </span>
                  <div className="clearfix"></div>
                  <div className="button-default wpqa-remove-image" onClick={this.handleDeleteImage}>Xóa</div>
                </div>
                : null
            }
            <div className="wpqa_form">
              <label htmlFor="featured_image">Đổi ảnh đính kèm</label>
              <div className="fileinputs">
                <input type="file" name="featured_image" id="featured_image" onChange={e => this.handleFileSelect(e)} accept='image/*' />
                <div className="fakefile">
                  <button type="button">{localPath}</button>
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
                onClick={this.handleSubmit} style={{ display: editting ? "none" : "inline-block" }} />
              <span className="load_span" style={{ display: editting ? "block" : "none" }}>
                <span className="loader_2"></span>
              </span>
            </p>
          </form>
        </div>
      </React.Fragment>)
      : (<Redirect to="/" />)
  }
}

const mapStateToProps = (state) => ({
  profileId: state.profile.id,
  answer: state.post.edittingAnswer,
  apiError: state.post.editError,
  editting: state.post.loadingEdit,
})

const mapDispatchToProps = {
  editPost,
  editPostImage,
  editPostImageFail
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAnswerPage)
