import React from 'react'

import ButtonGroup from '../../button-group'

import styles from './post-list.module.css'

const PostList = ({ postType, setPostType, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Ερωτήσεις</h2>
        <ButtonGroup
          buttons={['Ερωτήσεις Χρήστη']}
          selected={postType}
          setSelected={setPostType}
        />
      </div>
      {children}
    </div>
  )
}

export default PostList
