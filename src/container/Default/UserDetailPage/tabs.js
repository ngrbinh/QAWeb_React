import { faBook, faCommentAlt, faStar, faUserFriends} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Answer from '../../../component/Answer'
import Question from '../../../component/Question'
import UserTagDetail from '../../../component/UserTagDetail'

export function About(props) {
  console.log(props)
  const {name,gender,birthDate,phoneNumber,questionCount,answerCount,point} = props.user
  const date = new Date(birthDate)
  const now = new Date()
  const url = 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-7-29x29.jpg'
  return (
    <div className="user-area-content wpqa-profile">
      <div className="post-section user-area user-area-advanced user-advanced user-area-head mgb0">
        <div className="post-inner">
          <div className="user-content">
            <div className="user-inner">
              <div className="bio_editor">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text when an unknown printer took a galley of type and scrambled it
              to make a type specimen book.
          </div>
              <div className="user-data">
                <ul>
                  <li className="city-country"><i className="icon-location"></i>{name}</li>
                  <li className="user-phone"><i className="icon-phone"></i>{phoneNumber}</li>
                  <li className="user-gender"><i className="icon-heart"></i>{gender?'Nam':'Nữ'}</li>
                  <li className="user-age"><i className="icon-globe"></i>{now.getFullYear() - date.getFullYear()} tuổi</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
      <div className="user-stats">
        <ul className="row">
          <li className="col col3 user-questions">
            <div><a href="#"></a><i className="icon-book-open"><FontAwesomeIcon icon={faBook}/></i>
              <div><span>{questionCount}</span>
                <h4>Questions</h4>
              </div>
            </div>
          </li>
          <li className="col col3 user-answers">
            <div><a href="#"></a><i className="icon-comment"><FontAwesomeIcon icon={faCommentAlt}/></i>
              <div><span>{answerCount}</span>
                <h4>Answers</h4>
              </div>
            </div>
          </li>
          <li className="col col3 user-best-answers">
            <div><a href="#"></a><i className="icon-graduation-cap"></i>
              <div><span>0</span>
                <h4>Best Answers</h4>
              </div>
            </div>
          </li>
          <li className="col col3 user-points">
            <div><a href="#"></a><i className="icon-bucket"><FontAwesomeIcon icon={faStar}/></i>
              <div><span>{point}</span>
                <h4>Points</h4>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="user-follower">
        <ul className="row">
          <li className="col col6 user-followers">
            <div><a href="#"></a>
              <h4><i className="icon-users"><FontAwesomeIcon icon={faUserFriends}/></i>Followers</h4>
              <div>
                <img className="avatar avatar-29 photo" alt="" title="" width="29" height="29" src={url} />
                <img className="avatar avatar-29 photo" alt="" title="" width="29" height="29" src={url} />
                <img className="avatar avatar-29 photo" alt="" title="" width="29" height="29" src={url} />
                <img className="avatar avatar-29 photo" alt="" title="" width="29" height="29" src={url} />
                <span><span>+3</span> Followers</span>
              </div>
            </div>
          </li>
          <li className="col col6 user-following">
            <div>
              <a href="#"></a>
              <h4><i className="icon-users"><FontAwesomeIcon icon={faUserFriends}/></i>Following</h4>
              <div>
                <img className="avatar avatar-29 photo" alt="" title="" width="29" height="29" src={url} />
                <img className="avatar avatar-29 photo" alt="" title="" width="29" height="29" src={url} />
                <img className="avatar avatar-29 photo" alt="" title="" width="29" height="29" src={url} />
                <img className="avatar avatar-29 photo" alt="" title="" width="29" height="29" src={url} />
                <span><span>+2</span> Members</span></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export function Questions(props) {
  const id = props.id
  console.log(id)
  const questions = [
    {
      id: 2,
      user: {
        avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-42x42.jpg',
        name: 'Martin Hope',
        id: 1
      },
      createdDate: '2020-10-08T14:59:00.000+00:00',
      body: `In my local language (Bahasa Indonesia) there are no verb-2 or past tense form as time tracker. So, I often forget to use the past form of verb when speaking english.

        I saw him last night (correct)
        
        I see him last night (incorrect)
        
        But i think both has the same meaning and are understandable,
        
        Isn’t it?`,
      voteCount: 33,
      subject: "Vật lý",
      grade: "Lớp 10",
      answerCount: "7",
      viewCount: "152"
    },
    {
      id: 3,
      user: {
        avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-42x42.jpg',
        name: 'Martin Hope',
        id: 2
      },
      createdDate: '2020-10-08T14:59:00.000+00:00',
      body: `In my local language (Bahasa Indonesia) there are no verb-2 or past tense form as time tracker. So, I often forget to use the past form of verb when speaking english.

        I saw him last night (correct)
        
        I see him last night (incorrect)
        
        But i think both has the same meaning and are understandable,
        
        Isn’t it?`,
      voteCount: 33,
      subject: "Vật lý",
      grade: "Lớp 10",
      answerCount: "7",
      viewCount: "152"
    },
    {
      id: 4,
      user: {
        avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-42x42.jpg',
        name: 'Martin Hope',
        id: 3
      },
      createdDate: '2020-10-08T14:59:00.000+00:00',
      body: `In my local language (Bahasa Indonesia) there are no verb-2 or past tense form as time tracker. So, I often forget to use the past form of verb when speaking english.

        I saw him last night (correct)
        
        I see him last night (incorrect)
        
        But i think both has the same meaning and are understandable,
        
        Isn’t it?`,
      voteCount: 33,
      subject: "Vật lý",
      grade: "Lớp 10",
      answerCount: "7",
      viewCount: "152"
    },
    {
      id: 5,
      user: {
        avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-42x42.jpg',
        name: 'Martin Hope',
        id: 4
      },
      createdDate: '2020-10-08T14:59:00.000+00:00',
      body: `In my local language (Bahasa Indonesia) there are no verb-2 or past tense form as time tracker. So, I often forget to use the past form of verb when speaking english.

        I saw him last night (correct)
        
        I see him last night (incorrect)
        
        But i think both has the same meaning and are understandable,
        
        Isn’t it?`,
      voteCount: 33,
      subject: "Vật lý",
      grade: "Lớp 10",
      answerCount: "7",
      viewCount: "152"
    },
    {
      id: 6,
      user: {
        avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-42x42.jpg',
        name: 'Martin Hope',
        id: 5
      },
      createdDate: '2020-10-08T14:59:00.000+00:00',
      body: `In my local language (Bahasa Indonesia) there are no verb-2 or past tense form as time tracker. So, I often forget to use the past form of verb when speaking english.

        I saw him last night (correct)
        
        I see him last night (incorrect)
        
        But i think both has the same meaning and are understandable,
        
        Isn’t it?`,
      voteCount: 33,
      subject: "Vật lý",
      grade: "Lớp 10",
      answerCount: "7",
      viewCount: "152"
    }
  ]
  return (
    <section>
      <h2 className="screen-reader-text">Questions</h2>
      <div className="post-articles question-articles">
        {questions.map(item => {
          return <Question question={item} shorten={true} />
        })}
      </div>
      <div className='clearfix'></div>
      <div className="pagination-wrap pagination-question">
        <div className="pagination-nav posts-load-more">
          <span className="load_span"><span className="loader_2"></span></span>
          <div className="load-more">
            <a href="#">Xem thêm</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Answers(props) {
  const id = props.id
  console.log(id)
  const answers= [
    {
      id: 3,
      user: {
        avatarUrl: "https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-42x42.jpg",
        name: "Marko Smith",
        id: 7
      },
      voteCount: 8,
      body: `<div> <p>You are correct that both are understandable.</p><p>The only other possible everyday meaning I could think of would be ‘I see him [in my mind’s eye] last night’; that is, I am, at this very moment, imagining him last night. But it should almost always be clear from context which one is intended.</p><p>‘Correct’ doesn’t mean ‘understandable’, though. If I say ‘Me want have fooding’ it’s pretty clear what to understand from that, but it’s not anywhere near correct Standard English grammar. If you lived somewhere where you spoke a dialect of English in which this was acceptable grammar, however, then it would be correct for that dialect.</p> </div>`,
      createdDate: '2020-10-08T14:59:00.000+00:00'
    },
    {
      id: 3,
      user: {
        avatarUrl: "https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-42x42.jpg",
        name: "Marko Smith",
        id: 8
      },
      voteCount: 8,
      body: `<div> <p>You are correct that both are understandable.</p><p>The only other possible everyday meaning I could think of would be ‘I see him [in my mind’s eye] last night’; that is, I am, at this very moment, imagining him last night. But it should almost always be clear from context which one is intended.</p><p>‘Correct’ doesn’t mean ‘understandable’, though. If I say ‘Me want have fooding’ it’s pretty clear what to understand from that, but it’s not anywhere near correct Standard English grammar. If you lived somewhere where you spoke a dialect of English in which this was acceptable grammar, however, then it would be correct for that dialect.</p> </div>`,
      createdDate: '2020-10-08T14:59:00.000+00:00'
    },
    {
      id: 3,
      user: {
        avatarUrl: "https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-42x42.jpg",
        name: "Marko Smith",
        id: 9
      },
      voteCount: 8,
      body: `<div> <p>You are correct that both are understandable.</p><p>The only other possible everyday meaning I could think of would be ‘I see him [in my mind’s eye] last night’; that is, I am, at this very moment, imagining him last night. But it should almost always be clear from context which one is intended.</p><p>‘Correct’ doesn’t mean ‘understandable’, though. If I say ‘Me want have fooding’ it’s pretty clear what to understand from that, but it’s not anywhere near correct Standard English grammar. If you lived somewhere where you spoke a dialect of English in which this was acceptable grammar, however, then it would be correct for that dialect.</p> </div>`,
      createdDate: '2020-10-08T14:59:00.000+00:00'
    }
  ]
  return (
    <div className='question-adv-comments question-has-comments clearfix'>
      <div id='comments' className='post-section comments-popup-share'>
        <div className='post-inner'>
          <ol className='commentlist clearfix'>
            {answers.map(item => <Answer answer={item} showQuestionLink={true}/>)}
          </ol>
          <div className='clearfix'></div>
        </div>
      </div>
    </div>
  )
}

export function Followers(props) {
  const id = props.id
  console.log(id)
  const users = [
    {
      id: 12,
      name: 'Aaron Aiken',
      avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-1-84x84.jpg',
      answerCount: 19,
      questionCount: 4,
      point: 112
    },
    {
      id: 11,
      name: 'Aaron Aiken',
      avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-1-84x84.jpg',
      answerCount: 18,
      questionCount: 3,
      point: 110
    },
    {
      id: 11,
      name: 'Aaron Aiken',
      avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-1-84x84.jpg',
      answerCount: 18,
      questionCount: 3,
      point: 110
    },
    {
      id: 11,
      name: 'Aaron Aiken',
      avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-1-84x84.jpg',
      answerCount: 18,
      questionCount: 3,
      point: 110
    },
    {
      id: 11,
      name: 'Aaron Aiken',
      avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-1-84x84.jpg',
      answerCount: 8,
      questionCount: 0,
      point: 50
    },
    {
      id: 11,
      name: 'Aaron Aiken',
      avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-1-84x84.jpg',
      answerCount: 18,
      questionCount: 3,
      point: 110
    },
  ]
  return (
    <div className='section-page-div user-section user-section-columns row user-not-normal'>
      {
        users.map(item => <UserTagDetail user={item} key={item.id}/>)
      }
    </div>
  )
}

export function Following(props) {
  const id = props.id
  console.log(id)
  const users = [
    {
      id: 12,
      name: 'Aaron Aiken',
      avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-1-84x84.jpg',
      answerCount: 19,
      questionCount: 4,
      point: 112
    },
    {
      id: 11,
      name: 'Aaron Aiken',
      avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-1-84x84.jpg',
      answerCount: 18,
      questionCount: 3,
      point: 110
    },
    {
      id: 11,
      name: 'Aaron Aiken',
      avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-1-84x84.jpg',
      answerCount: 18,
      questionCount: 3,
      point: 110
    },
    {
      id: 11,
      name: 'Aaron Aiken',
      avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-1-84x84.jpg',
      answerCount: 18,
      questionCount: 3,
      point: 110
    },
    {
      id: 11,
      name: 'Aaron Aiken',
      avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-1-84x84.jpg',
      answerCount: 8,
      questionCount: 0,
      point: 50
    },
    {
      id: 11,
      name: 'Aaron Aiken',
      avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-1-84x84.jpg',
      answerCount: 18,
      questionCount: 3,
      point: 110
    },
  ]
  return (
    <div className='section-page-div user-section user-section-columns row user-not-normal'>
      {
        users.map(item => <UserTagDetail user={item} key={item.id} />)
      }
    </div>
  )
}