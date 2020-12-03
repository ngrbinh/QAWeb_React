import React, { Component } from 'react'
import { connect } from 'react-redux'
import { faHome, faStar, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fetchBadgeTypes } from '../../../redux/ducks/badge'
import { Link } from 'react-router-dom'

class BadgePage extends Component {
  processPointDivHeight = () => {
    var divs = document.querySelectorAll('.points-section .col4 .point-section')
    var i, j, max
    for (i = 0; i < divs.length; i += 3) {
      var j_end = i + 2 > (divs.length - 1) ? divs.length - 1 : i + 2
      max = 0
      for (j = i; j <= j_end; j++) {
        if (divs[j].offsetHeight > max) max = divs[j].offsetHeight
        else divs[j].style.height = max + 'px'
      }
    }
  }
  componentDidMount() {
    this.processPointDivHeight()
    this.props.fetchBadgeTypes()
  }
  render() {
    const pointDetails = [
      {
        id: 1,
        point: 50,
        description: 'Nhận được khi tạo tài khoản.'
      },
      {
        id: 2,
        point: 20,
        description: 'Nhận được khi đăng 1 câu hỏi.'
      },
      {
        id: 3,
        point: 20,
        description: 'Nhận được khi đăng 1 câu trả lời.'
      },
      {
        id: 4,
        point: 30,
        description: 'Nhận được khi câu hỏi nhận được 1 bình chọn.'
      },
      {
        id: 5,
        point: 60,
        description: 'Nhận được khi câu trả lời nhận được 1 bình chọn.'
      },
      {
        id: 6,
        point: 10,
        description: 'Nhận được khi câu hỏi nhận 1 lượt xem.'
      },
      {
        id: 7,
        point: 50,
        description: 'Nhận được khi bạn được 1 người khác theo dõi.'
      },
      {
        id: 8,
        point: -30,
        description: 'Khi câu hỏi nhận 1 lượt dislike.'
      },
      {
        id: 9,
        point: -60,
        description: 'Khi câu trả lời nhận 1 lượt dislike.'
      }
    ]
    const { badges, loadingBadges } = this.props
    return (
      <div className='page-template-template-badges'>
        <div className="breadcrumbs breadcrumbs_1">
          <div className="breadcrumbs-wrap">
            <div className="breadcrumb-left">
              <span className="crumbs">
                <span>
                  <span>
                    <meta content="1" />
                    <Link to="/" title="Home">
                      <span ><i className="icon-home">
                        <FontAwesomeIcon icon={faHome} />
                      </i>Trang chủ</span>
                    </Link>
                  </span>
                  <span className="crumbs-span">/</span><span className="current">Huy hiệu</span>
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className='clearfix'></div>
        <div className="page-sections">
          <div className="page-section">
            <div className="page-wrap-content">
              <h2 className="post-title-3">
                <i className="icon-bucket"><FontAwesomeIcon icon={faStar} /></i>Hệ thống tích điểm
              </h2>
              <div className="post-content-text clearfix">
                <p>Tích lũy điểm số để đạt được huy hiệu. Huy hiệu sẽ xuất hiện  ở trang hồ sơ, trên các câu hỏi &amp; câu trả lời của bạn. Đạt được những huy hiệu cao để khẳng định bản thân.</p>
              </div>
              <div className="points-section">
                <ul className="row">
                  {pointDetails.map(item => <li className="col col4" key={item.id}>
                    <div className="point-section">
                      <div className="point-div">
                        <i className="icon-bucket"><FontAwesomeIcon icon={faStar} /></i>
                        <span>{item.point}</span>Điểm
                      </div>
                      <p>{item.description}</p>
                    </div>
                  </li>)}
                </ul>
              </div>
            </div>
          </div>
          <div className="page-section">
            <div className="page-wrap-content">
              <h2 className="post-title-3">
                <i className="icon-trophy"><FontAwesomeIcon icon={faTrophy} /></i>Hệ thống huy hiệu
              </h2>
              <div className="post-content-text">
                <p>Tích lũy điểm số để đạt được huy hiệu. Huy hiệu sẽ xuất hiện  ở trang hồ sơ, trên các câu hỏi &amp; câu trả lời của bạn. Đạt được những huy hiệu cao để khẳng định bản thân.</p>
              </div>
              <div className="badges-section">
                <span className="load_span" style={loadingBadges ? { display: "block" } : { display: "none" }}>
                  <span className="loader_2"></span>
                </span>
                <ul>
                  {badges.map(item =>
                    <li key={item.id}>
                      <div className="badge-section">
                        <div className="badge-div" style={{ height: '115px' }}><span className="badge-span"
                          style={{ backgroundColor: `#${item.color}` }}>{item.name}</span>
                          <div className="point-div"><i className="icon-bucket">
                            <FontAwesomeIcon icon={faStar} /></i><span>{item.pointToAchieve}</span>Điểm</div>
                        </div>
                        <p style={{ height: '115px' }}>{item.description}</p>
                      </div>
                    </li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  badges: state.badge.types,
  loadingBadges: state.badge.loadingTypes
})

const mapDispatchToProps = {
  fetchBadgeTypes
}

export default connect(mapStateToProps, mapDispatchToProps)(BadgePage)
