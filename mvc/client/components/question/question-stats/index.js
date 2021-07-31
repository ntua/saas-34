import React from 'react'

import styles from './question-stats.module.css'

const QuestionStats = ({ voteCount, answerCount, view }) => {
  return (
    <div className={styles.container}>
      <div className={styles.vote}>
        <span>{voteCount}</span>
        <p>Ψήφοι</p>
      </div>
      <div className={styles.answer}>
        <span>{answerCount}</span>
        <p>Απαντήσεις</p>
      </div>
      <p className={styles.view}>{view} Προβολές</p>
    </div>
  )
}

export default QuestionStats
