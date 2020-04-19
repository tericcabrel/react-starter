import React, { FC, Fragment, ReactElement } from 'react';
import { IntlShape } from 'react-intl';
import FormattedMessage from 'react-intl/lib/components/message';

import { Country } from '../../types/model';

import CountryColumnItem from './CountryColumnItem';
import CountryColumnList from './CountryColumnList';

import './country-info.scss';

interface ICountryInfoProps {
  country: Country | null;
  intl: IntlShape;
}

interface CountryTableProps {
  country: Country;
  intl: IntlShape;
}

const CountryTable: FC<CountryTableProps> = ({ country, intl }: CountryTableProps): ReactElement => (
  <table className="table table-country-info">
    <tbody>
    <tr>
      <CountryColumnItem
        label={intl.formatMessage({ id: 'app.country.info.label.flag', defaultMessage: 'Flag' })}
        type="img"
        value={country.flag}
      />
      <CountryColumnItem
        label={intl.formatMessage({ id: 'app.country.info.label.name', defaultMessage: 'Name' })}
        type="text"
        value={country.name}
      />
    </tr>
    <tr>
      <CountryColumnItem
        label={intl.formatMessage({ id: 'app.country.info.label.acode2', defaultMessage: 'Alpha2 Code' })}
        type="text"
        value={country.alpha2Code}
      />
      <CountryColumnItem
        label={intl.formatMessage({ id: 'app.country.info.label.acode3', defaultMessage: 'Alpha3 Code' })}
        type="text"
        value={country.alpha3Code}
      />
    </tr>
    <tr>
      <CountryColumnItem
        label={intl.formatMessage({ id: 'app.country.info.label.region', defaultMessage: 'Region' })}
        type="text"
        value={country.region}
      />
      <CountryColumnItem
        label={intl.formatMessage({ id: 'app.country.info.label.sub.region', defaultMessage: 'Sub Region' })}
        type="text"
        value={country.subregion}
      />
    </tr>
    <tr>
      <CountryColumnItem
        label={intl.formatMessage({ id: 'app.country.info.label.capital', defaultMessage: 'Capital' })}
        type="text"
        value={country.capital}
      />
      <CountryColumnItem
        label={intl.formatMessage({ id: 'app.country.info.label.domain.level', defaultMessage: 'Top domain level' })}
        type="array"
        values={country.topLevelDomain}
      />
    </tr>
    <tr>
      <CountryColumnItem
        label={intl.formatMessage({ id: 'app.country.info.label.area', defaultMessage: 'Area' })}
        type="text"
        value={`${country.area} km2`}
      />
      <CountryColumnItem
        label={intl.formatMessage({ id: 'app.country.info.label.population', defaultMessage: 'Population' })}
        type="text"
        value={`${country.population} hab`}
      />
    </tr>
    <tr>
      <CountryColumnItem
        type="array"
        values={country.timezones}
        label={intl.formatMessage({ id: 'app.country.info.label.timezone', defaultMessage: 'Timezones' })}
      />
      <CountryColumnItem
        type="array"
        values={country.latlng}
        label={intl.formatMessage({ id: 'app.country.info.label.latlng', defaultMessage: 'LatLng' })}
      />
    </tr>
    <tr>
      <CountryColumnItem
        type="array"
        values={country.callingCodes}
        label={intl.formatMessage({ id: 'app.country.info.label.ccode', defaultMessage: 'Calling Code' })}
      />
      <CountryColumnItem
        type="array"
        values={country.altSpellings}
        label={
          intl.formatMessage({ id: 'app.country.info.label.alt.spelling', defaultMessage: 'Alt Spelling' })
        }
      />
    </tr>
    <tr>
      <CountryColumnItem
        type="text"
        value={country.demonym}
        label={intl.formatMessage({ id: 'app.country.info.label.demonym', defaultMessage: 'Demonym' })}
      />
      <CountryColumnItem
        type="text"
        value={country.nativeName}
        label={intl.formatMessage({ id: 'app.country.info.label.nname', defaultMessage: 'Native name' })}
      />
    </tr>
    <tr>
      <CountryColumnItem
        type="text"
        value={country.numericCode}
        label={intl.formatMessage({ id: 'app.country.info.label.ncode', defaultMessage: 'Numeric code' })}
      />
      <CountryColumnItem
        type="text"
        value={country.gini ? country.gini.toString() : 'N/A'}
        label={intl.formatMessage({ id: 'app.country.info.label.gini', defaultMessage: 'Gini' })}
      />
    </tr>
    <tr>
      <CountryColumnItem
        type="array"
        values={country.borders}
        label={intl.formatMessage({ id: 'app.country.info.label.borders', defaultMessage: 'Borders' })}
      />
      <CountryColumnItem label="CIOC" type="text" value={country.cioc}/>
    </tr>
    <tr>
      <td>
        <CountryColumnList
          label={intl.formatMessage({ id: 'app.country.info.label.lang.title', defaultMessage: 'Languages' })}
          subLabels={[
            'ISO639_1', 'ISO639_2',
            intl.formatMessage({ id: 'app.country.info.label.lang.name', defaultMessage: 'Name' }),
            intl.formatMessage({ id: 'app.country.info.label.lang.nname', defaultMessage: 'Native name' })
          ]}
          values={country.languages}
        />
      </td>
      <td>
        <CountryColumnList
          label={intl.formatMessage({ id: 'app.country.info.label.currency.title', defaultMessage: 'Currencies' })}
          subLabels={[
            intl.formatMessage({ id: 'app.country.info.label.currency.name', defaultMessage: 'Name' }),
            intl.formatMessage({ id: 'app.country.info.label.currency.code', defaultMessage: 'Code' }),
            intl.formatMessage({ id: 'app.country.info.label.currency.symbol', defaultMessage: 'Symbol' })
          ]}
          values={country.currencies}
        />
      </td>
    </tr>
    <tr>
      <td>
        <CountryColumnList
          label={
            intl.formatMessage({ id: 'app.country.info.label.region.title', defaultMessage: 'Region blocks' })
          }
          subLabels={[
            intl.formatMessage({ id: 'app.country.info.label.region.acronym', defaultMessage: 'Acronym' }),
            intl.formatMessage({ id: 'app.country.info.label.region.name', defaultMessage: 'Name' }),
            intl.formatMessage(
              { id: 'app.country.info.label.region.other.acronym', defaultMessage: 'Others acronyms' }),
            intl.formatMessage(
              { id: 'app.country.info.label.region.other.name', defaultMessage: 'Others names' })
          ]}
          values={country.regionalBlocs}
        />
      </td>
      <td/>
    </tr>
    </tbody>
  </table>
);

const NoCountry: FC<{}> = (): ReactElement => (
  <div className="no-country d-flex justify-content-center p-2 font-weight-bold">
    <FormattedMessage id="app.country.info.no.data" defaultMessage="No information to display"/>
  </div>
);

const CountryInfo: FC<ICountryInfoProps> = ({ country, intl }: ICountryInfoProps): ReactElement => {
  return (
    <Fragment>
      {country && <CountryTable country={country} intl={intl}/>}
      {!country && <NoCountry />}
    </Fragment>
  );
};

export default CountryInfo;
