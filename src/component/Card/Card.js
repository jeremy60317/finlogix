import React, { useState, useEffect } from 'react'
import moment from 'moment'
import './Card.scss'

const Content = ({ contentObj }) => {
  const { blocks } = contentObj
  const [contentText, setContentText] = useState('')

  useEffect(() => {
    setContentText(blocks[0].text)
    let index = 0
    const maxLength = blocks.length
    const interval = setInterval(() => {
      let show = blocks[index].text
      if (index === maxLength - 1) {
        index = 0
      } else {
        index++
      }
      setContentText(show)
    }, 3000)
    return () => clearInterval(interval)
  }, [blocks])

  return (
    <div className="contentBox">
      <div className="content">{contentText}</div>
    </div>
  )
}

const ListCard = ({ data, onClick, index, isListPage }) => {
  const contentObj = JSON.parse(data.content)
  const formatDate = moment(data.created_at)
    .add(10, 'days')
    .format('YYYY/MM/DD hh:mm')
  return (
    <div className="listItemBox">
      <div
        className="itemContent"
        onClick={() => {
          onClick(index)
        }}
      >
        <div className="date">{data.created_at}</div>
        <div className="title">{data.title}</div>
        <Content contentObj={contentObj} />
        <div className="time">{formatDate}</div>
        <div className="registerBox">
          <div className="register">
            {isListPage ? 'Register Now' : 'UnFavor'}
          </div>
          <div className="icon">icon</div>
        </div>
      </div>
    </div>
  )
}

export default ListCard
