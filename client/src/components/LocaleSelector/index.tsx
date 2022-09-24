import React, { FC, ReactElement } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import LocaleContext, { LocaleContextType } from '../../containers/LocaleProvider/locale-context';
import messages from '../../translations/messages';

import flag_fr from '../../assets/icons/flags/fr.svg';
import flag_en from '../../assets/icons/flags/en.svg';
import flag_de from '../../assets/icons/flags/de.svg';
import flag_es from '../../assets/icons/flags/es.svg';

const flags: { [key: string]: any } = { flag_fr, flag_en, flag_de, flag_es };

const renderLocaleDropdownItem: (context: LocaleContextType) => ReactElement[] = (
  context: LocaleContextType
): ReactElement[] => {
  const localeDropdownContent: ReactElement[] = [];

  for (const localeKey in context.locales) {
    const lang = context.locales[localeKey];

    localeDropdownContent.push((
      <DropdownItem
        key={localeKey}
        onClick={(): void => context.changeLocale(localeKey)}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <img alt="" src={flags[`flag_${localeKey}`]} style={{ width: 24, height: 16, marginRight: 10 }}/>
        {<FormattedMessage {...messages[lang]} />}
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
