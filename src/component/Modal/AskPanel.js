import { faAngleDown, faFolder, faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Editor } from '@tinymce/tinymce-react';
class AskPanel extends Component {
  state = {
    path: ''
  }
  handleFileSelect = (e) => {
    const newPath = e.target.value
    this.setState(state => ({
      ...state,
      path: newPath
    }))
  }
  render() {
    const {path} = this.state
    return (
      <div className='panel-pop-content' id='wpqa-question'>
        <form className='form-post wpqa_form' method='post'>
          <div className='form-inputs clearfix'>
            <div class="wpqa_category">
              <label for="question-category-93">Lớp<span class="required">*</span></label>
              <span class="styled-select">
                <FontAwesomeIcon icon={faAngleDown} className='arrow_down' />
                <select name="category" id="question-category-93" class="postform">
                  <option value="-1">Chọn môn học</option>
                  <option class="level-0" value="8">Toán học</option>
                  <option class="level-0" value="9">Ngữ văn</option>
                  <option class="level-0" value="7">Vật lý</option>
                </select>
              </span>
              <i class="icon-folder"><FontAwesomeIcon icon={faFolder} /></i>
              <span class="form-description">Chọn môn học để dễ dàng tìm kiếm</span>
            </div>
            <div class="wpqa_category">
              <label for="question-category-93">Cấp bậc<span class="required">*</span></label>
              <span class="styled-select">
                <FontAwesomeIcon icon={faAngleDown} className='arrow_down' />
                <select name="category" id="question-category-93" class="postform">
                  <option value="-1">Chọn lớp</option>
                  <option class="level-0" value="8">Lớp 7</option>
                  <option class="level-0" value="9">Lớp 8</option>
                  <option class="level-0" value="7">Lớp 12</option>
                </select>
              </span>
              <i class="icon-folder"><FontAwesomeIcon icon={faFolder} /></i>
              <span class="form-description">Chọn lớp để dễ dàng tìm kiếm</span>
            </div>
          </div>
          <div class="wpqa_form">
            <label for="featured_image">Featured image</label>
            <div class="fileinputs">
              <input type="file" name="featured_image" id="featured_image" onChange={e => this.handleFileSelect(e)} accept='image/*'/>
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

          <p class="form-submit" style={{marginTop:'20px'}}>
            <input type="submit" value="Xác nhận" class="button-default button-hide-click" />
            <span class="load_span"><span class="loader_2"></span></span>
          </p>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AskPanel)
