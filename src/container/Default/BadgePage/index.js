import React, { Component } from 'react'
import { connect } from 'react-redux'
import { faHome, faStar, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class BadgePage extends Component {
  processPointDivHeight = () => {
    var divs = document.querySelectorAll('.points-section .col4 .point-section')
    var i, j, max
    for (i = 0; i < divs.length; i += 3) {
      var j_end = i + 2 > (divs.length - 1) ? divs.length - 1 : i + 2
      max = 0
      for (j = i; j <= j_end; j++) {
        if (divs[j].offsetHeight > max) max = divs[j].offsetHeight
        else divs[j].style.height = max+'px'
      }
    }
  }
  componentDidMount() {
    this.processPointDivHeight()
  }
  render() {
    const pointDetails = [
      {
        point: 20,
        description: 'For referring a new user for paid membership.'
      },
      {
        point: 20,
        description: 'For referring a new user for paid membership.'
      },
      {
        point: 20,
        description: 'For referring '
      },
      {
        point: 51,
        description: 'When your answer has been chosen as the best answer.'
      },
      {
        point: 50,
        description: 'When your answer has been chosen as the best answer.'
      },
      {
        point: 50,
        description: 'When your answer has been chosen as the best answer.'
      },
      {
        point: 50,
        description: 'When your answer has been chosen as the best answer.'
      },
      {
        point: 50,
        description: 'When your answer has been chosen as the best answer.'
      }

    ]
    const badges = [
      {
        point: 30,
        name: 'Beginner',
        description: 'You must have a total score of 50 in at least 10 non-community wiki answers to achieve this badge. Highest scoring answer that outscored an accepted answer with score of more than 10.'
      },
      {
        point: 30,
        name: 'Beginner',
        description: 'You must have a total score of 50 in at least 10 non-community wiki answers to achieve this badge. Highest scoring answer that outscored an accepted answer with score of more than 10.'
      },
      {
        point: 30,
        name: 'Beginner',
        description: 'You must have a total score of 50 in at least 10 non-community wiki answers to achieve this badge. Highest scoring answer that outscored an accepted answer with score of more than 10.'
      },
      {
        point: 30,
        name: 'Beginner',
        description: 'You must have a total score of 50 in at least 10 non-community wiki answers to achieve this badge. Highest scoring answer that outscored an accepted answer with score of more than 10.'
      },
      {
        point: 30,
        name: 'Beginner',
        description: 'You must have a total score of 50 in at least 10 non-community wiki answers to achieve this badge. Highest scoring answer that outscored an accepted answer with score of more than 10.'
      },
      {
        point: 30,
        name: 'Beginner',
        description: 'You must have a total score of 50 in at least 10 non-community wiki answers to achieve this badge. Highest scoring answer that outscored an accepted answer with score of more than 10.'
      }
    ]
    return (
      <div className='page-template-template-badges'>
        <div class="breadcrumbs breadcrumbs_1">
          <div class="breadcrumbs-wrap">
            <div class="breadcrumb-left">
              <span class="crumbs">
                <span>
                  <span>
                    <meta itemprop="position" content="1" />
                    <a href="#" title="Home">
                      <span itemprop="name"><i class="icon-home">
                        <FontAwesomeIcon icon={faHome} />
                      </i>Home</span>
                    </a>
                  </span>
                  <span class="crumbs-span">/</span><span class="current">Badge</span>
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className='clearfix'></div>
        <div class="page-sections">
          <div class="page-section">
            <div class="page-wrap-content">
              <h2 class="post-title-3">
                <i class="icon-bucket"><FontAwesomeIcon icon={faStar} /></i>Points System
              </h2>
              <div class="post-content-text clearfix">
                <p>Besides gaining reputation with your questions and answers, you receive badges for being especially helpful.
          Badges appears on your profile page, questions &amp; answers.</p>
              </div>
              <div class="points-section">
                <ul class="row">
                  {pointDetails.map(item => <li class="col col4" >
                    <div class="point-section">
                      <div class="point-div">
                        <i class="icon-bucket"><FontAwesomeIcon icon={faStar} /></i>
                        <span>{item.point}</span>Points
                      </div>
                      <p>{item.description}</p>
                    </div>
                  </li>)}
                </ul>
              </div>
            </div>
          </div>
          <div class="page-section">
            <div class="page-wrap-content">
              <h2 class="post-title-3">
                <i class="icon-trophy"><FontAwesomeIcon icon={faTrophy} /></i>Badges System
              </h2>
              <div class="post-content-text">
                <p>Besides gaining reputation with your questions and answers, you receive badges for being especially helpful.
          Badges appears on your profile page, questions &amp; answers.</p>
              </div>
              <div class="badges-section">
                <ul>
                  {badges.map(item => <li>
                    <div class="badge-section">
                      <div class="badge-div" style={{ height: '95px' }}><span class="badge-span"
                        style={{ backgroundColor: '#0d0e11' }}>Begginer</span>
                        <div class="point-div"><i class="icon-bucket"><FontAwesomeIcon icon={faStar} /></i><span>10</span>Points</div>
                      </div>
                      <p style={{ height: '95px' }}>You must have a total score of 50 in at least 10 non-community wiki answers to
                      achieve this badge. Highest scoring answer that outscored an accepted answer with score of more than 10.
                      </p>
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

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(BadgePage)
