import { Field, Form, Formik } from 'formik'
import React from 'react'
import { theme } from '../theme'
import { Button } from './Button'
import { Input } from './Input'

export const ContactForm = () => {
  const [submitted, setSubmitted] = React.useState(false)
  const [error, setError] = React.useState(false)

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.space.xxlarge} ${theme.space.medium}`,
        background: theme.color.black,
      }}
    >
      {submitted ? (
        <div
          css={{
            textAlign: 'center',
            fontSize: theme.fontSize.xlarge,
            color: theme.color.white,
            marginBottom: theme.space.xlarge,
          }}
        >
          Thanks for reaching out! I'll be in touch soon.
        </div>
      ) : (
        <>
          <div
            css={{
              textAlign: 'center',
              fontSize: theme.fontSize.xlarge,
              color: theme.color.white,
              marginBottom: theme.space.xlarge,
            }}
          >
            {error ? (
              <div>Uh oh, something went wrong!</div>
            ) : (
              <>
                Say <strong>Hello</strong>
              </>
            )}
          </div>
          <div css={{ width: '100%', maxWidth: 600 }}>
            <Formik
              initialValues={{
                name: '',
                email: '',
                message: '',
              }}
              onSubmit={async values => {
                try {
                  await fetch(
                    'https://api.formik.com/submit/personal/personal-site',
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(values),
                    }
                  )
                  setSubmitted(true)
                } catch (e) {
                  setError(true)
                }
              }}
              render={() => (
                <Form autoComplete="off">
                  <Field
                    name="name"
                    render={({ field }) => (
                      <Input
                        required
                        placeholder="Name"
                        css={{
                          marginBottom: theme.space.small,
                        }}
                        {...field}
                      />
                    )}
                  />
                  <Field
                    name="email"
                    render={({ field }) => (
                      <Input
                        required
                        type="email"
                        placeholder="Email"
                        css={{
                          marginBottom: theme.space.small,
                        }}
                        {...field}
                      />
                    )}
                  />
                  <Field
                    name="message"
                    render={({ field }) => (
                      <Input
                        required
                        placeholder="Message"
                        component="textarea"
                        rows={8}
                        css={{
                          marginBottom: theme.space.small,
                          resize: 'vertical',
                          minHeight: 150,
                        }}
                        {...field}
                      />
                    )}
                  />
                  <Button type="submit" css={{ float: 'right' }}>
                    Send
                  </Button>
                </Form>
              )}
            />
          </div>
        </>
      )}
    </div>
  )
}
