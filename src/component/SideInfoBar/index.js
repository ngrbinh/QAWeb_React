import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'

export default class SideInfoBar extends Component {
  state = {
    tabIndex: 1
  }
  handleSwitchTab = (index) => () => {
    this.setState((state) => {
      return {
        ...state,
        tabIndex: index
      }
    })
  }
  render() {
    //window.onscroll = function () { stickyEffect() }
    const tabIndex = this.state.tabIndex
    return (
      <aside id='sideInfoBar' className='sidebar sidebar-width float_l fixed-sidebar .side-info-bar'>
        <div id='empty'></div>
        <div className='theiaStickySidebar side-bar'>
          <h3 className="screen-reader-text">Sidebar</h3>
          <div className='inner-sidebar'  id='infoBarContent'>
            <div className="widget widget_ask">
              <a target="_self" className="button-default wpqa-question">Đặt câu hỏi</a>
            </div>
            <section id="stats-widget-2" className="widget-no-divider widget stats-widget">
              <h3 className="screen-reader-text">Số liệu</h3>
              <div className="widget-wrap">
                <ul className="stats-inner">
                  <li className="stats-questions">
                    <div>
                      <span className="stats-text">Câu hỏi</span>
                      <span className="stats-value">23</span>
                    </div>
                  </li>
                  <li className="stats-answers">
                    <div>
                      <span className="stats-text">Câu trả lời</span>
                      <span className="stats-value">73</span>
                    </div>
                  </li>
                  <li className="stats-best_answers">
                    <div>
                      <span className="stats-text">Số lượt xem</span>
                      <span className="stats-value">12</span>
                    </div>
                  </li>
                  <li className="stats-users">
                    <div>
                      <span className="stats-text">Người dùng</span>
                      <span className="stats-value">30</span>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
            <div className='widget tabs-wrap widget-tabs'>
              <div className="widget-title widget-title-tabs">
                <ul className="tabs tabstabs-widget-2">
                  <li className={tabIndex == 1 ? "tab current" : "tab"}><a href="#" onClick={this.handleSwitchTab(1)}>Phổ biến</a></li>
                  <li className={tabIndex == 2 ? "tab current" : "tab"}><a href="#" onClick={this.handleSwitchTab(2)}>Gợi ý</a></li>
                </ul>
                <div className="clearfix"></div>
              </div>
              <div className='widget-wrap'>
                <div className='widget-posts tab-inner-wrap tab-inner-wraptabs-widget-2 active-tab'>
                  <div className='user-notifications user-profile-area'>
                    <div>
                      <ul>
                        <li className="widget-posts-text widget-no-img">
                          <span className="span-icon">
                            <a href="https://2code.info/demo/themes/Discy/Main/profile/marko/">
                              <img className="avatar avatar-20 photo" alt="Marko Smith" title="Marko Smith" width="20" height="20" srcset="https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-20x20.jpg 1x, https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-40x40.jpg 2x" src="https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-20x20.jpg" />
                            </a>
                          </span>
                          <div>
                            <h3>
                              <a href="https://2code.info/demo/themes/Discy/Main/question/how-to-approach-applying-for-a-job-at-a-company-owned-by-a-friend/" title="How to approach applying for a job at a company owned by a friend?" rel="bookmark">How to approach applying for a job at a company </a>
                            </h3>
                            <ul className="widget-post-meta">
                              <li>
                                <a className="post-meta-comment" href="https://2code.info/demo/themes/Discy/Main/question/how-to-approach-applying-for-a-job-at-a-company-owned-by-a-friend/#comments">
                                  <i className="icon-comment"></i>7 Answers
                                </a>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="widget-posts-text widget-no-img">
                          <span className="span-icon">
                            <a href="https://2code.info/demo/themes/Discy/Main/profile/marko/">
                              <img className="avatar avatar-20 photo" alt="Marko Smith" title="Marko Smith" width="20" height="20" srcset="https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-20x20.jpg 1x, https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-40x40.jpg 2x" src="https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-20x20.jpg" />
                            </a>
                          </span>
                          <div>
                            <h3>
                              <a href="https://2code.info/demo/themes/Discy/Main/question/how-to-approach-applying-for-a-job-at-a-company-owned-by-a-friend/" title="How to approach applying for a job at a company owned by a friend?" rel="bookmark">How to approach applying for a job at a company </a>
                            </h3>
                            <ul className="widget-post-meta">
                              <li>
                                <a className="post-meta-comment" href="https://2code.info/demo/themes/Discy/Main/question/how-to-approach-applying-for-a-job-at-a-company-owned-by-a-friend/#comments">
                                  <i className="icon-comment"></i>7 Answers
                                </a>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="widget-posts-text widget-no-img">
                          <span className="span-icon">
                            <a href="https://2code.info/demo/themes/Discy/Main/profile/marko/">
                              <img className="avatar avatar-20 photo" alt="Marko Smith" title="Marko Smith" width="20" height="20" srcset="https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-20x20.jpg 1x, https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-40x40.jpg 2x" src="https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-20x20.jpg" />
                            </a>
                          </span>
                          <div>
                            <h3>
                              <a href="https://2code.info/demo/themes/Discy/Main/question/how-to-approach-applying-for-a-job-at-a-company-owned-by-a-friend/" title="How to approach applying for a job at a company owned by a friend?" rel="bookmark">How to approach applying for a job at a company </a>
                            </h3>
                            <ul className="widget-post-meta">
                              <li>
                                <a className="post-meta-comment" href="https://2code.info/demo/themes/Discy/Main/question/how-to-approach-applying-for-a-job-at-a-company-owned-by-a-friend/#comments">
                                  <i className="icon-comment"></i>7 Answers
                                </a>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section className='widget users-widget' style={{marginBottom:'0px'}}>
              <h2 className="widget-title">
                <i className="icon-folder">
                  <FontAwesomeIcon icon={faUserFriends} />
                </i>Thành viên hàng đầu
              </h2>
              <div className='widget-wrap'>
                <div className='user-section user-section-small row user-not-normal'>
                  <div className='col col12'>
                    <div className="post-section user-area user-area-small">
                      <div className="post-inner">
                        <div className="author-image">
                          <a href="">
                            <span className="author-image-span">
                              <img className="avatar avatar-42 photo" alt="Aaron Aiken" title="Aaron Aiken" width="42" height="42" srcset="https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2020/10/team-1-42x42.jpg 1x, https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2020/10/team-1-84x84.jpg 2x" src="https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2020/10/team-1-42x42.jpg" />
                            </span>
                          </a>
                        </div>
                        <div className="user-content">
                          <div className="user-inner">
                            <h4><a href="https://2code.info/demo/themes/Discy/Main/profile/aaron/">Aaron Aiken</a></h4>
                            <div className="user-data">
                              <ul>
                                <li className="user-questions"><a href="https://2code.info/demo/themes/Discy/Main/profile/aaron/questions/">4 Questions</a></li>
                                <li className="user-points"><a href="https://2code.info/demo/themes/Discy/Main/profile/aaron/points/">211 Points</a></li>
                              </ul>
                            </div>
                            <span className="badge-span" style={{ backgroundColor: "#6b3de4" }}>Professional</span>
                          </div>
                        </div>
                        <div className="clearfix"></div>
                      </div>
                    </div>
                  </div>
                  <div className='col col12'>
                    <div className="post-section user-area user-area-small">
                      <div className="post-inner">
                        <div className="author-image">
                          <a href="">
                            <span className="author-image-span">
                              <img className="avatar avatar-42 photo" alt="Aaron Aiken" title="Aaron Aiken" width="42" height="42" srcset="https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2020/10/team-1-42x42.jpg 1x, https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2020/10/team-1-84x84.jpg 2x" src="https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2020/10/team-1-42x42.jpg" />
                            </span>
                          </a>
                        </div>
                        <div className="user-content">
                          <div className="user-inner">
                            <h4><a href="https://2code.info/demo/themes/Discy/Main/profile/aaron/">Aaron Aiken</a></h4>
                            <div className="user-data">
                              <ul>
                                <li className="user-questions"><a href="https://2code.info/demo/themes/Discy/Main/profile/aaron/questions/">4 Questions</a></li>
                                <li className="user-points"><a href="https://2code.info/demo/themes/Discy/Main/profile/aaron/points/">211 Points</a></li>
                              </ul>
                            </div>
                            <span className="badge-span" style={{ backgroundColor: "#6b3de4" }}>Professional</span>
                          </div>
                        </div>
                        <div className="clearfix"></div>
                      </div>
                    </div>
                  </div>
                  <div className='col col12'>
                    <div className="post-section user-area user-area-small">
                      <div className="post-inner">
                        <div className="author-image">
                          <a href="">
                            <span className="author-image-span">
                              <img className="avatar avatar-42 photo" alt="Aaron Aiken" title="Aaron Aiken" width="42" height="42" srcset="https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2020/10/team-1-42x42.jpg 1x, https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2020/10/team-1-84x84.jpg 2x" src="https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2020/10/team-1-42x42.jpg" />
                            </span>
                          </a>
                        </div>
                        <div className="user-content">
                          <div className="user-inner">
                            <h4><a href="https://2code.info/demo/themes/Discy/Main/profile/aaron/">Aaron Aiken</a></h4>
                            <div className="user-data">
                              <ul>
                                <li className="user-questions"><a href="https://2code.info/demo/themes/Discy/Main/profile/aaron/questions/">4 Questions</a></li>
                                <li className="user-points"><a href="https://2code.info/demo/themes/Discy/Main/profile/aaron/points/">211 Points</a></li>
                              </ul>
                            </div>
                            <span className="badge-span" style={{ backgroundColor: "#6b3de4" }}>Professional</span>
                          </div>
                        </div>
                        <div className="clearfix"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </aside>
    )
  }
}


// function stickyEffect() {
//   var navbar = document.getElementById('sideInfoBar')
//   var content = document.getElementById('infoBarContent')
//   var empty = document.getElementById("empty")
//   var sticky = navbar.offsetTop + content.offsetHeight + 85
//   console.log(content.offsetHeight)
//   var windowHeight = window.pageYOffset + window.innerHeight 
//   console.log(sticky)
//   console.log(windowHeight)
//   if ( windowHeight> sticky) {
//     var emptyHeight = windowHeight - sticky;
//     content.classList.add('test1')
//     navbar.setAttribute("style","min-height: "+windowHeight-navbar.offsetTop+"px;")
//     // if (windowHeight <= 2000) {
//     //   empty.setAttribute("style","height:"+emptyHeight+"px;")
//     // }
//   } else {
//     navbar.setAttribute("style","min-height: 1px;")
//     content.classList.remove('test1')
//     //empty.setAttribute("style","height:0px;")
//   }
// }
