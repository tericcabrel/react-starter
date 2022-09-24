import React, { FC, ReactElement } from 'react';
import * as Yup from 'yup';
import { Button, Form, FormGroup } from 'reactstrap';
import { Formik } from 'formik';

import { FormCommonProps } from '../../../types/form';
import { ResetPasswordData } from '../../../types/redux';

import CustomInputPassword from '../../CustomInputPassword';
import AuthError from '../../AuthError';

import './form-reset-password.scss';

const FormResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Must be at least 6 characters!')
    .required('Required'),
  confirmPassword: Yup.string()
    .min(6, 'Must be at least 6 characters!')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required')
});

interface FormResetPasswordProps extends FormCommonProps {
  data: ResetPasswordData;
  onResetPassword: (data: ResetPasswordData) => void;
}

const FormResetPassword: FC<FormResetPasswordProps> = (
  { data, error, loading, onResetPassword, intl }: FormResetPasswordProps
): ReactElement => {
  return (
    <Formik
      initialValues={data}
      validationSchema={FormResetPasswordSchema}
      onSubmit={ async (values: ResetPasswordData, actions: any): Promise<any> => {
        await onResetPassword(values);
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
        <Form onSubmit={handleSubmit} className="form-reset-password form-mik">
          <AuthError error={error}/>
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
              {intl.formatMessage({ id: 'app.auth.reset.reset', defaultMessage: 'Reset' })}
            </Button>
          </div>
        </Form>
      )}
    />
  );
};

export default FormResetPassword;
