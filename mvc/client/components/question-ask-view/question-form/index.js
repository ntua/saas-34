import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { FetchContext } from '../../../store/fetch'

import Button from '../../button'
import Textarea from '../../textarea'
import FormInput from '../../form-input'
import TagInput from '../../tag-input'

import styles from './question-form.module.css'

const QuestionForm = () => {
  const router = useRouter()
  const { authAxios } = useContext(FetchContext)

  const [loading, setLoading] = useState(false)

  return (
    <Formik
      initialValues={{ title: '', text: '', tags: [] }}
      onSubmit={async (values, { setStatus, resetForm }) => {
        setLoading(true)
        try {
          await authAxios.post('questions', values)
          resetForm({})
          router.push('/')
        } catch (error) {
          setStatus(error.response.data.message)
        }
        setLoading(false)
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .required('Λείπει ο τίτλος.')
          .max(150, 'Ο τίτλος είναι τεράστιος. Παρακαλούμε βάλτε λιγότερους από 150 χαρακτήρες.')
          .min(15, 'Ο τίτλος είναι πολύ μικρός..'),
        text: Yup.string()
          .required('Δεν έχετε συμπληρώσει την ερώτηση.')
          .min(30, 'Μην ντρέπεστε, γράψτε κάτι παραπάνω.')
          .max(30000, 'Πολύ μεγάλη ερώτηση.'),
        tags: Yup.array()
          .required('Γράψτε το tag και μετά πατήστε enter.')
          .max(100, 'Παρακαλούμε όχι παραπάνω από 100 tags,')
          .of(Yup.string().max(15, 'Τεράστιο το tag... '))
      })}
    >
      {({
        values,
        errors,
        touched,
        status,
        handleChange,
        setFieldValue,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <form onSubmit={handleSubmit}>
          <div className={styles.container}>
            <FormInput
              label="Τίτλος"
              inputInfo="Να είστε συγκεκριμένοι"
              type="text"
              name="title"
              autoComplete="off"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={touched.title && errors.title}
              errorMessage={errors.title && errors.title}
              placeholder="πχ Πότε θα βγουν οι βαθμολογίες;"
            />
            <Textarea
              label="Κύρια Ερώτηση"
              inputInfo="Κάντε την ερώτηση σας με όσες περισσότερες λεπτομέρειες μπορείτε."
              name="text"
              autoComplete="off"
              value={values.text}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={touched.text && errors.text}
              errorMessage={errors.text && errors.text}
            />
            <TagInput
              label="Tags"
              inputInfo="Μπορείτε να προσθέτε μέχρι 100 tags"
              type="text"
              name="tags"
              value={values.tags}
              onChange={(e) => setFieldValue('tags', e, true)}
              onBlur={handleBlur}
              hasError={touched.tags && errors.tags}
              errorMessage={errors.tags && errors.tags}
            />
          </div>
          <div className={styles.buttonContainer}>
            <p className={styles.status}>{status}</p>
            <div>
              <Button
                type="submit"
                primary
                isLoading={loading}
                disabled={isSubmitting}
              >
                Υποβολή
              </Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  )
}

export default QuestionForm
