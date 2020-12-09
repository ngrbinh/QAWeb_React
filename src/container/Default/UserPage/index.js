import { faAngleDoubleLeft, faAngleDoubleRight, faAngleDown, faAngleLeft, faAngleRight, faHome, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserTag from '../../../component/UserTag'
import './index.css'
import { fetchUsers, resetUsers } from '../../../redux/ducks/user'

class UserPage extends Component {
  state = {
    sortBy: "-follow",
    curPage: 1,
    limit: 9,
    keyword: ""
  }
  componentDidMount() {
    const { fetchUsers, resetUsers } = this.props
    const { curPage, limit, sortBy, keyword } = this.state
    resetUsers()
    fetchUsers(curPage, limit, sortBy, keyword)
  }
  handleSelectChange = (e) => {
    const newSortBy = e.target.value
    this.setState(state => ({
      ...state,
      sortBy: newSortBy
    }))
    const { fetchUsers, resetUsers } = this.props
    const { page, limit, keyword } = this.state
    resetUsers()
    fetchUsers(page, limit, newSortBy, keyword)
  }
  handleLoadPage = (i) => () => {
    this.setState(state => ({
      ...state,
      curPage: i
    }))
  }
  handleKeywordChange = e => {
    const keyword = e.target.value
    this.setState(state => ({
      ...state,
      keyword
    }))
  }
  handleSearchButton = e => {
    e.preventDefault()
    const { fetchUsers, resetUsers } = this.props
    const { curPage, limit, sortBy, keyword } = this.state
    resetUsers()
    fetchUsers(curPage, limit, sortBy, keyword)
  }
  handleSearchKeyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault()
      const { fetchUsers, resetUsers } = this.props
      const { curPage, limit, sortBy, keyword } = this.state
      resetUsers()
      fetchUsers(curPage, limit, sortBy, keyword)
    }
  }
  componentDidUpdate(prevProps, prevState) {
    for (let x in this.state) {
      if (x === 'keyword') break
      if (this.state[x] !== prevState[x]) {
        const { fetchUsers, resetUsers } = this.props
        const { curPage, limit, sortBy, keyword } = this.state
        resetUsers()
        fetchUsers(curPage, limit, sortBy, keyword)
        break
      }
    }
    this.processPointDivHeight()
  }
  processPointDivHeight = () => {
    console.log("processDiv")
    var divs = document.querySelectorAll('.col4 .post-section')
    var i, j, max
    for (i = 0; i < divs.length; i += 3) {
      var j_end = i + 2 > (divs.length - 1) ? divs.length - 1 : i + 2
      max = 0
      for (j = i; j <= j_end; j++) {
        if (divs[j].offsetHeight > max) max = divs[j].offsetHeight
      }
      for (j = i; j <= j_end; j++) {
        divs[j].style.height = max + 'px'
      }
    }
  }
  render() {
    const { users, loadingUsers, totalPage, profile } = this.props
    const { sortBy, curPage } = this.state
    return (
      <React.Fragment>
        <div className="breadcrumbs breadcrumbs_1">
          <div className="breadcrumbs-wrap">
            <div className="breadcrumb-left">
              <span className="crumbs">
                <span>
                  <span>
                    <meta itemProp="position" content="1" />
                    <a href="#" title="Home" style={{ color: "#7c7f85" }}>
                      <span itemProp="name"><i className="icon-home">
                        <FontAwesomeIcon icon={faHome} />
                      </i>Trang chủ</span>
                    </a>
                  </span>
                  <span className="crumbs-span">/</span><span className="current">Người dùng</span>
                </span>
              </span>
            </div>
            <div className="breadcrumb-right">
              <div className="search-form">
                <form method="get" className="search-filter-form">
                  <span className="styled-select user-filter">
                    <FontAwesomeIcon icon={faAngleDown} className='arrow_down' />
                    <select onChange={this.handleSelectChange} value={sortBy}>
                      <option value="-name">Tên</option>
                      {/* <option value="-id">ID</option> */}
                      <option value="-question">Số câu hỏi</option>
                      <option value="-answer">Số câu trả lời</option>
                      <option value="-point">Điểm</option>
                      <option value="-follow">Người theo dõi</option>
                      <option value="-date">Ngày sinh</option>
                    </select>
                  </span>
                </form>
                <form method="get" action="#" className="search-input-form main-search-form">
                  <input className="search-input live-search live-search-icon"
                    type="search" name="search" placeholder="Tìm kiếm"
                    onChange={this.handleKeywordChange}
                    onKeyPress={this.handleSearchKeyPress} />
                  <div className="loader_2 search_loader"></div>
                  <div className="search-results results-empty"></div>
                  <button className="button-search" onClick={this.handleSearchButton}>
                    <i className="icon-search"><FontAwesomeIcon icon={faSearch} /></i>
                  </button>
                </form>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
        <div className="clearfix"></div>
        <section className='page-template-template-users'>
          <article id="post-62" className="article-post article-post-only clearfix post-62 page type-page status-publish hentry">
            <div className="single-inner-content">
              <header className="article-header header-no-author header-no-meta">
                <figure className="featured-image post-img post-img-0"></figure>
              </header>
              <div className="post-wrap-content">
                <div className="post-content-text"></div>
                <div className="user-section user-section-small_grid row user-not-normal">
                  {
                    users.map(item => <UserTag user={item} key={item.id} profile={profile} />)
                  }
                </div>
                <div className="main-pagination center-child">
                  <span className="load_span" style={loadingUsers ? { display: "inline-block" } : { display: "none" }}>
                    <span className="loader_2"></span>
                  </span>
                  <div className="pagination" style={loadingUsers ? { display: "none" } : { display: "block" }}>
                    {
                      curPage > 1
                        ? <React.Fragment>
                          <a className="page-numbers" onClick={this.handleLoadPage(1)}>
                            <i className="icon-left-open"><FontAwesomeIcon icon={faAngleDoubleLeft} /></i>
                          </a>
                          <a className="page-numbers" onClick={this.handleLoadPage(curPage - 1)}>{curPage - 1}</a>
                        </React.Fragment>
                        : null
                    }
                    <span aria-current="page" className="page-numbers current">{curPage}</span>
                    {
                      curPage < totalPage
                        ? <React.Fragment>
                          <a className="page-numbers" onClick={this.handleLoadPage(curPage + 1)}>{curPage + 1}</a>
                          <a className="next page-numbers" onClick={this.handleLoadPage(totalPage)}>
                            <i className="icon-right-open"><FontAwesomeIcon icon={faAngleDoubleRight} /></i>
                          </a>
                        </React.Fragment>
                        : null
                    }
                  </div>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </article>
        </section>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.user.users,
  loadingUsers: state.user.loadingUsers,
  totalPage: state.user.totalPage,
  profile: state.profile
})

const mapDispatchToProps = {
  fetchUsers,
  resetUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
