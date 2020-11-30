import { faBook, faCheck, faCommentAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import { formatAMPM } from '../../common/functions'

export default function Notification(props) {
  const { notification, toggle } = props
  const { typeName, message, creationDate, postId } = notification
  let icon;
  switch (typeName) {
    case "VOTE":
      icon = faCheck
      break
    case "ANSWER":
      icon = faCommentAlt
      break
    case "QUESTION":
      icon = faBook
      break
  }
  const formatDate = new Date(creationDate)
  const dateString = formatDate.getDate() + '/' + (formatDate.getMonth() + 1) + '/' + formatDate.getFullYear()
  return (
    <li>
      <Link to={`/question/${postId}`} onClick={toggle}>
        <i className="icon-bucket"><FontAwesomeIcon icon={icon} /></i>
        <div> {message}<span className="notifications-date">{`${dateString} vào lúc ${formatAMPM(formatDate)}`}</span></div>
      </Link>
    </li>
  )
}
