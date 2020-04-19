import React, { FC, ReactElement, Suspense, useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Row } from 'reactstrap';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { IntlShape, useIntl } from 'react-intl';
import FormattedMessage from 'react-intl/lib/components/message';

import { FilteredCountry } from '../../../types/model';
import { AppState, RootState } from '../../../types/redux';

import { getAllCountriesAction } from '../../../store/app/actions';
import { getCountryInfoRequestAction } from '../../../store/socket/actions';

import withApp from '../../../hofs/withApp';

import CountryInfo from '../../../components/CountryInfo';
import AppSpinner from '../../../components/AppSpinner';
import Loader from '../../../components/Loader';

import './dashboard.scss';

const Dashboard: FC<{}> = (): ReactElement => {
  const dispatch: Dispatch = useDispatch();
  const intl: IntlShape = useIntl();

  const { countries, country, loading }: AppState = useSelector((state: RootState): AppState => state.app);
  const [selectedCountryCode, setSelectedCountryCode]: [string, any] = useState('');

  useEffect((): void => {
    dispatch(getAllCountriesAction());
  },        [dispatch]);

  const handleCountrySelectChange: any = (event: React.FormEvent<HTMLElement>): void => {
    const element: HTMLSelectElement = event.target as HTMLSelectElement;

    setSelectedCountryCode(element.value);
  };

  const handleButtonClick: any = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    dispatch(getCountryInfoRequestAction(selectedCountryCode.length > 0 ? selectedCountryCode : null));
  };

  return (
    <div className="dashboard-content">
      <Row>
        <Suspense fallback={<Loader />}>
          <Col xs="12" sm="12" md="12">
            <div className="dashboard-header d-flex justify-content-between">
              <Form className="d-flex">
                <FormGroup className="mb-0 mr-5">
                  <Input
                    type="select"
                    name="select"
                    id="countrySelect"
                    onChange={(e: any): void => handleCountrySelectChange(e)}
                    value={selectedCountryCode}
                  >
                    <option>
                      {intl.formatMessage({ id: 'app.dashboard.text1', defaultMessage: 'Select a country' })}
                    </option>
                    { countries.map((country: FilteredCountry, index: number): ReactElement => (
                      <option key={`country_${index}`} value={country.alpha2Code}>{country.name}</option>
                    ))}
                  </Input>
                </FormGroup>
                <div>
                  <Button color="primary" type="button" onClick={(e: any): void => handleButtonClick(e)}>
                    <FormattedMessage id="app.dashboard.btn.get.country" defaultMessage="Get country info through socket" />
                  </Button>
                </div>
              </Form>
            </div>

            {loading && <AppSpinner/>}

            <div className="dashboard-body">
              <h2>
                {intl.formatMessage({ id: 'app.country.info.title', defaultMessage: 'Country information' })}
              </h2>
              <hr/>
              <CountryInfo country={country} intl={intl} />
            </div>
          </Col>
        </Suspense>
      </Row>
    </div>
  );
};

export default withApp(Dashboard);
