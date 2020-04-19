import React, { FC, ReactElement } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import LocaleContext, { LocaleContextType } from '../../containers/LocaleProvider/locale-context';
import messages from '../../translations/messages';

const flag_fr: any = require('../../assets/icons/flags/fr.svg');
const flag_en: any = require('../../assets/icons/flags/en.svg');
const flag_de: any = require('../../assets/icons/flags/de.svg');
const flag_es: any = require('../../assets/icons/flags/es.svg');

const flags: { [key: string]: any } = { flag_fr, flag_en, flag_de, flag_es };

const renderLocaleDropdownItem: (context: LocaleContextType) => ReactElement[] = (
  context: LocaleContextType
): ReactElement[] => {
  const localeDropdownContent: ReactElement[] = [];

  for (const localeKey in context.locales) {
    localeDropdownContent.push((
      <DropdownItem
        key={localeKey}
        onClick={(): void => context.changeLocale(localeKey)}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <img alt="" src={flags[`flag_${localeKey}`]} style={{ width: 24, height: 16, marginRight: 10 }}/>
        {<FormattedMessage {...messages[context.locales[localeKey]]} />}
      </DropdownItem>
    ));
  }

  return localeDropdownContent;
};

const LocaleSelector: FC<{}> = (): ReactElement => {
  return (
    <LocaleContext.Consumer>
      { (context: LocaleContextType): ReactElement => (
          <UncontrolledDropdown nav={true} inNavbar={true}>
            <DropdownToggle nav={true} caret={true} style={{ display: 'flex', alignItems: 'center' }}>
              <img alt="" src={flags[`flag_${context.locale}`]} style={{ width: 24, height: 16, marginRight: 10 }}/>
              {<FormattedMessage {...messages[context.locales[context.locale]]} />}
            </DropdownToggle>
            <DropdownMenu right={true}>
              {
                renderLocaleDropdownItem(context)
              }
            </DropdownMenu>
          </UncontrolledDropdown>
        )}
    </LocaleContext.Consumer>
  );
};

export default LocaleSelector;
