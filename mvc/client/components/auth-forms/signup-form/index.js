import React, { useState, useContext } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { publicFetch } from '../../../util/fetcher'
import { AuthContext } from '../../../store/auth'
import ModalContext from '../../../store/modal'

import FormInput from '../../form-input'
import Button from '../../button'

import styles from './signup-form.module.css'

const SignupForm = () => {
  const { setAuthState } = useContext(AuthContext)
  const { setIsComponentVisible } = useContext(ModalContext)

  const [loading, setLoading] = useState(false)

  return (
    <Formik
      initialValues={{ username: '', password: '', passwordConfirmation: '' }}
      onSubmit={async (values, { setStatus, resetForm }) => {
        setLoading(true)
        try {
          const { data } = await publicFetch.post('signup', values)
          const { token, expiresAt, userInfo } = data
          setAuthState({ token, expiresAt, userInfo })
          resetForm({})
          setIsComponentVisible(false)
        } catch (error) {
          setStatus(error.response.data.message)
        }
        setLoading(false)
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .required('Απαιτείται')
          .max(16, 'Βάλατε πολλούς χαρακτήρες')
          .matches(/^[a-zA-Z0-9_-]+$/, 'Παρακαλούμε εισάγετε μόνο έγκυρους χαρακτήρες'),
        password: Yup.string()
          .required('Απαιτείται')
          .min(6, 'Ο κωδικός πρέπει να είναι τουλάχιστον 6 γράμματα')
          .max(50, 'Ο κωδικός πρέπει να έχει το πολύ 50 γράμματα'),
        passwordConfirmation: Yup.string().oneOf(
          [Yup.ref('password'), null],
          'Οι κωδικοί δεν ταιριάζουν'
        )
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
        <form onSubmit={handleSubmit} className={styles.form}>
          <FormInput
            label="Username"
            type="text"
            name="username"
            autoComplete="off"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={touched.username && errors.username}
            errorMessage={errors.username && errors.username}
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            autoComplete="off"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={touched.password && errors.password}
            errorMessage={errors.password && errors.password}
          />
          <FormInput
            label="Επιβεβαίωση password"
            type="password"
            name="passwordConfirmation"
            autoComplete="off"
            value={values.passwordConfirmation}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={
              touched.passwordConfirmation && errors.passwordConfirmation
            }
            errorMessage={
              errors.passwordConfirmation && errors.passwordConfirmation
            }
          />
          <p className={styles.status}>{status}</p>
          <Button
            primary
            full
            className={styles.submitButton}
            disabled={isSubmitting}
            isLoading={loading}
            type="submit"
          >
            Εγγραφή
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default SignupForm
