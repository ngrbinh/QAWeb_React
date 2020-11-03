import { faAngleDown, faAngleLeft, faAngleRight, faHome, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserTag from '../../../component/UserTag'
import './index.css'
class UserPage extends Component {
  render() {
    const users = [
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
    return (
      <React.Fragment>
        <div className="breadcrumbs breadcrumbs_1">
          <div className="breadcrumbs-wrap">
            <div className="breadcrumb-left">
              <span className="crumbs">
                <span>
                  <span>
                    <meta itemprop="position" content="1" />
                    <a href="#" title="Home">
                      <span itemprop="name"><i className="icon-home">
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
                    <select name="user_filter">
                      <option value="user_registered" selected="selected">Date Register</option>
                      <option value="display_name">Name</option>
                      <option value="ID">ID</option>
                      <option value="question_count">Questions</option>
                      <option value="answers">Answers</option>
                      <option value="the_best_answer">Best Answers</option>
                      <option value="points">Points</option>
                      <option value="followers">Followers</option>
                      <option value="post_count">Posts</option>
                      <option value="comments">Comments</option>
                    </select>
                  </span>
                </form>
                <form method="get" action="#" className="search-input-form main-search-form">
                  <input className="search-input live-search live-search-icon"
                    autocomplete="off" type="search" name="search" placeholder="Type to find..." />
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
                    users.map(item => <UserTag user={item}/> )
                  }
                </div>
                <div className="main-pagination">
                  <div className="pagination">
                    <a className="prev page-numbers" href="https://2code.info/demo/themes/Discy/Main/users/">
                      <i className="icon-left-open"><FontAwesomeIcon icon={faAngleLeft}/></i>
                    </a>
                    <span aria-current="page" className="page-numbers current">1</span>
                    <a className="page-numbers" href="#">2</a>
                    <a className="next page-numbers" href="#">
                      <i className="icon-right-open"><FontAwesomeIcon icon={faAngleRight}/></i>
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

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
