import React, { useState } from 'react'
import Head from 'next/head'

import { Logo } from '../icons'
import LoginForm from './login-form'
import SignUpForm from './signup-form'

import styles from './auth-forms.module.css'

const AuthForms = ({ screen = 'signup' }) => {
  const [form, setForm] = useState(screen)

  return (
    <div className={styles.authModal}>
      <Head>
        <title>{form == 'login' ? 'Log In' : 'Sign Up'} - Alex and Asimakis Overflow</title>
      </Head>

      <Logo className={styles.logo} />

      {form === 'login' ? <LoginForm /> : <SignUpForm />}

      {form === 'login' ? (
        <p className={styles.authSwichMessage}>
          Δεν έχετε λογαριασμό;{' '}
          <a onClick={() => setForm('signup')}>Εγγραφή</a>
        </p>
      ) : (
        <p className={styles.authSwichMessage}>
          Έχετε ήδη λογαριασμό;{' '}
          <a onClick={() => setForm('login')}>Σύνδεση</a>
        </p>
      )}
    </div>
  )
}

export default AuthForms
