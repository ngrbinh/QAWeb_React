import { faAngleDown, faAngleLeft, faAngleRight, faHome, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserTag from '../../../component/UserTag'
import './index.css'
import { fetchUsers, resetUsers } from '../../../redux/ducks/user'

class UserPage extends Component {
  state = {
    sortBy: "-follow",
    page: 1,
    limit: 9
  }
  componentDidMount() {
    const { fetchUsers,resetUsers } = this.props
    const { page, limit, sortBy } = this.state
    resetUsers()
    fetchUsers(page, limit, sortBy)
  }
  handleSelectChange = (e) => {
    const newSortBy = e.target.value
    this.setState(state => ({
      ...state,
      sortBy: newSortBy
    }))
    const { fetchUsers,resetUsers } = this.props
    const { page, limit} = this.state
    resetUsers()
    fetchUsers(page, limit, newSortBy)
  }
  render() {
    const users1 = [
      {
        name: 'Aaron Aiken',
        avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-1-84x84.jpg',
        answerCount: 18,
      },
      {
        name: 'Aaron Aiken',
        avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-1-84x84.jpg',
        answerCount: 18,
      },
      {
        name: 'Aaron Aiken',
        avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-1-84x84.jpg',
        answerCount: 18,
      },
      {
        name: 'Aaron Aiken',
        avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-1-84x84.jpg',
        answerCount: 18,
      },
      {
        name: 'Aaron Aiken',
        avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-1-84x84.jpg',
        answerCount: 18,
      },
      {
        name: 'Aaron Aiken',
        avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-1-84x84.jpg',
        answerCount: 18,
      },
    ]
    const { users, loadingUsers } = this.props
    const { sortBy } = this.state
    return (
      <React.Fragment>
        <div className="breadcrumbs breadcrumbs_1">
          <div className="breadcrumbs-wrap">
            <div className="breadcrumb-left">
              <span className="crumbs">
                <span>
                  <span>
                    <meta itemProp="position" content="1" />
                    <a href="#" title="Home">
                      <span itemProp="name"><i className="icon-home">
                        <FontAwesomeIcon icon={faHome} />
                      </i>Home</span>
                    </a>
                  </span>
                  <span className="crumbs-span">/</span><span className="current">Users</span>
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
                      <option value="-id">ID</option>
                      <option value="-question">Số câu hỏi</option>
                      <option value="-answer">Số câu trả lời</option>
                      <option value="-point">Điểm</option>
                      <option value="-follow">Người theo dõi</option>
                    </select>
                  </span>
                </form>
                <form method="get" action="#" className="search-input-form main-search-form">
                  <input className="search-input live-search live-search-icon"
                    autoComplete="off" type="search" name="search" placeholder="Tìm kiếm" />
                  <div className="loader_2 search_loader"></div>
                  <div className="search-results results-empty"></div>
                  <button className="button-search">
                    <i className="icon-search"><FontAwesomeIcon icon={faSearch} /></i>
                  </button>
                  <input type="hidden" name="search_type" className="search_type" value="users" />
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
                    users.map(item => <UserTag user={item} key={item.id}/>)
                  }
                </div>
                <div className="main-pagination center-child">
                  <span className="load_span" style={loadingUsers ? { display: "inline-block" } : { display: "none" }}>
                    <span className="loader_2"></span>
                  </span>
                  <div className="pagination" style={loadingUsers ? { display: "none" } : { display: "block" }}>
                    <a className="prev page-numbers" href="https://2code.info/demo/themes/Discy/Main/users/">
                      <i className="icon-left-open"><FontAwesomeIcon icon={faAngleLeft} /></i>
                    </a>
                    <span aria-current="page" className="page-numbers current">1</span>
                    <a className="page-numbers" href="#">2</a>
                    <a className="next page-numbers" href="#">
                      <i className="icon-right-open"><FontAwesomeIcon icon={faAngleRight} /></i>
                    </a>
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
  loadingUsers: state.user.loadingUsers
})

const mapDispatchToProps = {
  fetchUsers,
  resetUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
