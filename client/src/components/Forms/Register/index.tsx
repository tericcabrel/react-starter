import React, { FC, ReactElement } from 'react';
import * as Yup from 'yup';
import {
  Button, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap';
import { ErrorMessage, Formik } from 'formik';
import { FaRegEnvelope } from 'react-icons/fa';

import { RegisterData } from '../../../types/redux';
import { FormCommonProps } from '../../../types/form';

import AuthError from '../../AuthError';
import CustomInputPassword from '../../../components/CustomInputPassword';

import './form-register.scss';

const FormRegisterSchema: Yup.ObjectSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid address email!')
    .required('Required'),
  username: Yup.string()
    .min(3, 'Must be at least 3 characters!')
    .required('Required'),
  name: Yup.string()
    .min(3, 'Must be at least 3 characters!')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Must be at least 6 characters!')
    .required('Required'),
  confirmPassword: Yup.string()
    .min(6, 'Must be at least 6 characters!')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required')
});

interface FormRegisterProps extends FormCommonProps {
  data: RegisterData;
  onRegister: (data: RegisterData) => void;
}

const FormRegister: FC<FormRegisterProps> = (
  { data, error, loading, onRegister, intl }: FormRegisterProps
): ReactElement => {
  return (
    <Formik
      initialValues={data}
      validationSchema={FormRegisterSchema}
      onSubmit={ async (values: RegisterData, actions: any): Promise<void> => {
        await onRegister(values);
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
        <Form onSubmit={handleSubmit} className="form-register form-mik">
          <AuthError error={error}/>
          <FormGroup>
              <Input
                type="text"
                name="name"
                placeholder={intl.formatMessage({ id: 'app.auth.name.hint', defaultMessage: 'Full name' })}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
            <ErrorMessage name="name">
              {(errorMessage: string): ReactElement =>
                <div className="form-input-error text-danger">{errorMessage}</div>
              }
            </ErrorMessage>
          </FormGroup>
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
                <div className="form-input-error text-danger">{errorMessage}</div>
              }
            </ErrorMessage>
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="username"
              placeholder="Ex: 73c0"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            <ErrorMessage name="username">
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
          <FormGroup className="password-form-group">
            <CustomInputPassword
              name="confirmPassword"
              placeholder={intl.formatMessage({ id: 'app.auth.register.cnf.password.hint', defaultMessage: 'Confirm password' })}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
            />
          </FormGroup>
          <div className="form-footer">
            <Button
              color="primary"
              className="mt-3 w-100"
              active={true}
              tabIndex={-1}
              disabled={loading}
            >
              {intl.formatMessage({ id: 'app.auth.signup', defaultMessage: 'Sign up' })}
            </Button>
          </div>
        </Form>
      )}
    />
  );
};

export default FormRegister;
