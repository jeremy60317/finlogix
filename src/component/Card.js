import React, { useState, useEffect } from 'react'
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
  }, [])

  return (
    <div className="contentBox">
      <div className="content">{contentText}</div>
    </div>
  )
}

const ListCard = ({ data, onClick, index, isListPage }) => {
  const contentObj = JSON.parse(data.content)
  return (
    <div className="listItemBox">
      <div className="itemContent">
        <div className="date">{data.created_at}</div>
        <div className="title">{data.title}</div>
        <Content contentObj={contentObj} />
        <div className="time">7pm-8:30pm EST</div>
        <div className="registerBox">
          <div className="register">
            {isListPage ? 'Register Now' : 'UnFavor'}
          </div>
          <div
            className="icon"
            onClick={() => {
              onClick(index)
            }}
          >
            icon
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListCard
