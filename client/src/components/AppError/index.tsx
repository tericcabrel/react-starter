import React, { FC, ReactElement, useMemo } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { IntlShape, useIntl } from 'react-intl';

import { ApplicationError, ObjectOfString } from '../../types/common';
import { isObject } from '../../utils/helpers';

import './app-error.scss';

export interface IAppErrorProps {
  error: ApplicationError | null;
  onClose: () => void;
}

type ParseErrorFn = (error: ApplicationError | null, intl: IntlShape) => ParseErrorResponse;

type ParseErrorResponse = {
  title: string;
  content: string[];
};

const parseError: ParseErrorFn = (error: ApplicationError | null, intl: IntlShape): ParseErrorResponse => {
  let title: string = intl.formatMessage({ id: 'app.error.title.default', defaultMessage: 'Application error!' });
  let content: string[] = [
    intl.formatMessage({ id: 'app.error.content.default', defaultMessage: 'Unexpected error occurred when executing the process!' })
  ];

  if (error) {
    const { errorType, message }: ApplicationError = error;

    title = errorType;
    if (isObject(message)) {
      const data: ObjectOfString = message as ObjectOfString;
      const keys: string[] = Object.keys(data);

      content = [];
      keys.forEach((key: string): void => {
        content.push(...data[key]);
      });
    } else {
      content = [message as string];
    }
  }

  return { title, content };
};

const AppError: FC<IAppErrorProps> = ({ error, onClose }: IAppErrorProps): ReactElement => {
  const intl: IntlShape = useIntl();

  const headerTitle: string = intl.formatMessage({ id: 'app.error.header.title', defaultMessage: 'General error' });
  const { title, content }: ParseErrorResponse = useMemo((): ParseErrorResponse => {
    return parseError(error, intl);
  },                                                     [error, intl]);

  return (
    <div className="global-error">
      <Modal
        title={headerTitle.toUpperCase()}
        isOpen={error !== null}
        toggle={(): void => onClose()}
        className="modal-default modal-general-error"
        width={864}
      >
        <ModalHeader className="text-uppercase m-b-20 text-center text-tinny" toggle={onClose}>
          {title}
        </ModalHeader>
        <ModalBody>
            <div className="content-error">
              <ul>
                {
                  content.map((item: string, i: number): ReactElement => <li key={`msg_${i}`}>{item}</li>)
                }
              </ul>
            </div>
        </ModalBody>
        <ModalFooter>
          <div className="step-footer">
            <Button type="button" color="danger" className="no-radius" onClick={(): void => onClose()}> CLOSE </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AppError;
