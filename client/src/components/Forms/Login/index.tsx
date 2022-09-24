import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { ErrorMessage, Formik } from 'formik';
import {
  Button, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap';
import { FaRegEnvelope } from 'react-icons/fa';

import { LoginData } from '../../../types/redux';
import { FormCommonProps } from '../../../types/form';

import CustomInputPassword from '../../CustomInputPassword';
import AuthError from '../../AuthError';

import './form-login.scss';

const FormLoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid address email!')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Must be at least 6 characters!')
    .required('Required')
});

interface FormLoginProps extends FormCommonProps {
  data: LoginData;
  onLogin: (data: LoginData) => void;
}

const FormLogin: FC<FormLoginProps> = (
  { data, error, loading, onLogin, intl }: FormLoginProps
): ReactElement => {
  return (
    <Formik
      initialValues={data}
      validationSchema={FormLoginSchema}
      onSubmit={ async (values: LoginData, actions: any): Promise<void> => {
        await onLogin(values);
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
               }: any): any => (
        <Form onSubmit={handleSubmit} className="form-login form-mik">
          <AuthError error={error}/>
          <FormGroup className="email-form-group">
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
                <div className="form-input-error text-danger">{errorMessage}</div>
              }
            </ErrorMessage>
          </FormGroup>

          <FormGroup className="password-form-group">
            <CustomInputPassword
              name="password"
              placeholder={intl.formatMessage({ id: 'app.auth.login.password.hint', defaultMessage: 'Password' })}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
          </FormGroup>
          <div className="form-footer d-flex align-items-end flex-column">
            <Link to="/password/forgot" className="mt-0 forgot-password-text">
              {intl.formatMessage({ id: 'app.auth.login.password.forgot', defaultMessage: 'Forgot password?' })}
            </Link>
            <Button
              color="primary"
              className="w-100 btn-login"
              active={true}
              tabIndex={-1}
              disabled={loading}
            >
              {intl.formatMessage({ id: 'app.auth.signin', defaultMessage: 'Sign in' })}
            </Button>
          </div>
        </Form>
      )}
    />
  );
};

export default FormLogin;
