import React, { FC, ReactElement, useState } from 'react';
import { FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { FaEyeSlash, FaLock, FaRegEye } from 'react-icons/fa';
import { ErrorMessage } from 'formik';

import { CustomInputPasswordProps } from '../../types/form';

type ShowClickEventFn = (event: React.MouseEvent<HTMLElement>, show: boolean) => void;

const CustomInputPassword: FC<CustomInputPasswordProps> = (
  { name, value, onBlur, onChange, placeholder }: CustomInputPasswordProps
): ReactElement => {
  const [showPassword, setShowPassword]: [boolean, Function] = useState(false);

  const onShowClick: ShowClickEventFn = (event: React.MouseEvent<HTMLElement>, show: boolean): void => {
    event.preventDefault();
    setShowPassword(!show);
  };

  return (
    <FormGroup className="password-form-group">
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText><FaLock /></InputGroupText>
        </InputGroupAddon>
        <Input
          type={!showPassword ? 'password' : 'text'}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />
        <InputGroupAddon addonType="append">
          <InputGroupText
            onClick={(e: any): void => { onShowClick(e, showPassword); }}
          >
            {showPassword ? <FaEyeSlash/> : <FaRegEye />}
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <ErrorMessage name={name}>
        {(errorMessage: string): ReactElement =>
          <div className="form-input-error text-danger">{errorMessage}</div>}
      </ErrorMessage>
    </FormGroup>
  );
};

export default CustomInputPassword;
