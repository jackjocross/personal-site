import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Button } from './Button';
import { theme } from '../theme';
import { Input } from './Input';

export const ContactForm = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState(false);

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: [
          theme.space.small,
          theme.space.small,
          theme.space.large,
          theme.space.xlarge,
        ],
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
          I'll be in touch soon!
          <span role="img" aria-label="Writing hand">
            ✍️
          </span>
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
              <>
                Uh oh, something went wrong!
                <span role="img" aria-label="Dead man">
                  😵
                </span>
              </>
            ) : (
              <>
                Say Hello{' '}
                <span role="img" aria-label="Waving hand">
                  👋
                </span>
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
                    `https://api.formik.io/v1/form/${
                      process.env.FORMIK_FORM_ID
                    }/submit`,
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(values),
                    }
                  );
                  setSubmitted(true);
                } catch (e) {
                  setError(true);
                }
              }}
              render={() => (
                <Form>
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
                        }}
                        {...field}
                      />
                    )}
                  />
                  <Button type="submit" css={{ float: 'right' }}>
                    Submit
                  </Button>
                </Form>
              )}
            />
          </div>
        </>
      )}
    </div>
  );
};
