import React, { useState, useContext } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { FetchContext } from '../../../store/fetch'

import TextArea from '../../textarea'
import Button from '../../button'

import styles from './add-comment.module.css'

const AddComment = ({
  questionId,
  answerId,
  setShowAddComment,
  setQuestion
}) => {
  const { authAxios } = useContext(FetchContext)

  const [loading, setLoading] = useState(false)

  return (
    <Formik
      initialValues={{ comment: '' }}
      onSubmit={async (values, { setStatus, resetForm }) => {
        setLoading(true)
        try {
          const { data } = await authAxios.post(
            `/comment/${questionId}/${answerId ? answerId : ''}`,
            values
          )

          setQuestion(data)

          resetForm({})
          setShowAddComment(false)
        } catch (error) {
          setStatus(error.response.data.message)
        }
        setLoading(false)
      }}
      validationSchema={Yup.object({
        comment: Yup.string()
          .required('Λείπει το σχόλιο.')
          .min(5, 'Συμπληρώστε τουλάχιστον πέντε χαρακτήρες.')
          .max(1000, 'Παρακαλούμε εισάγετε λιγότερους από 1000 χαρακτήρες.')
      })}
    >
      {({
        values,
        errors,
        touched,
        status,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <form className={styles.container} onSubmit={handleSubmit}>
          <TextArea
            name="comment"
            autoComplete="off"
            value={values.comment}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={touched.comment && errors.comment}
            errorMessage={errors.comment && errors.comment}
          />
          <p className={styles.status}>{status}</p>
          <div>
            <Button
              className={styles.button}
              type="submit"
              primary
              isLoading={loading}
              disabled={isSubmitting}
            >
              Προσθήκη Σχολίου
            </Button>
          </div>
        </form>
      )}
    </Formik>
  )
}

export default AddComment
