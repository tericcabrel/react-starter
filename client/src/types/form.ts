import { IntlShape } from 'react-intl';

export interface CustomInputPasswordProps {
  name: string;
  value: string;
  placeholder: string;
  onBlur: (e: React.FocusEvent<HTMLElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLElement>) => void;
}

export interface FormCommonProps {
  loading: boolean;
  error: object | null;
  intl: IntlShape;
}
