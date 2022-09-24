import React, { FC, ReactElement } from 'react';
import * as Yup from 'yup';
import {
  Button, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap';
import { ErrorMessage, Formik } from 'formik';
import { FaRegEnvelope } from 'react-icons/fa';
import { IntlShape } from 'react-intl';

import { FormCommonProps } from '../../../types/form';
import { ForgotPasswordData } from '../../../types/redux';

import AuthError from '../../AuthError';

import './form-forgot-password.scss';

const FormForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid address email!')
    .required('Required')
});

interface FormForgotPasswordProps extends FormCommonProps {
  data: ForgotPasswordData;
  error: object | null;
  onForgotPassword: (data: ForgotPasswordData) => void;
  intl: IntlShape;
}

const FormForgotPassword: FC<FormForgotPasswordProps> = (
  { data, error, loading, onForgotPassword, intl }: FormForgotPasswordProps
): ReactElement => {
  return (
    <Formik
      initialValues={data}
      validationSchema={FormForgotPasswordSchema}
      onSubmit={ async (values: ForgotPasswordData, actions: any): Promise<any> => {
        await onForgotPassword(values);
        actions.resetForm();
      }}
      render={({
                 values,
                 errors,
                 status,
                 touched,
                 handleBlur,
                 handleChange,
                 handleSubmit,
                 isSubmitting,
               }: any): ReactElement => (
        <Form onSubmit={handleSubmit} className="form-forgot-password form-mik">
          <AuthError error={error}/>
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText><FaRegEnvelope/></InputGroupText>
              </InputGroupAddon>
              <Input
                type="email"
                name="email"
                placeholder={intl.formatMessage({ id: 'app.auth.email', defaultMessage: 'Email address' })}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </InputGroup>
            <ErrorMessage name="email">
              {(errorMessage: string): ReactElement =>
                <div className="form-input-error text-danger">{errorMessage}</div>}
            </ErrorMessage>
          </FormGroup>

          <div className="form-footer">
            <Button
              color="primary"
              className="mt-3 w-100"
              active={true}
              tabIndex={-1}
              disabled={loading}
            >
              {intl.formatMessage({ id: 'app.auth.forgot.send', defaultMessage:'Send the link' })}
            </Button>
          </div>
        </Form>
      )}
    />
  );
};

export default FormForgotPassword;
