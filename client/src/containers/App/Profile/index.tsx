import React, { FC, ReactElement, Suspense } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { IoLogoGithub, IoLogoFacebook, IoLogoLinkedin, IoLogoTwitter, IoMdCreate } from 'react-icons/io';
import FormattedMessage from 'react-intl/lib/components/message';

import withApp from '../../../hofs/withApp';

import Loader from '../../../components/Loader';

import './profile.scss';

const avatar: any = require('../../../assets/images/avatar.png');

const Profile : FC<{}> = (): ReactElement => {
  return (
    <div className="profile-content animated fadeIn">
      <Row>
        <Suspense fallback={<Loader />}>
          <Col xs="12" md="12" className="w-100">
            <div className="profile-header"/>
            <div className="profile-body d-flex">
              <div className="profile-section profile-section-1">
                <img src={avatar} alt="User profile" className="img-profile rounded-circle"/>
                <h3 className="mt-5">Jamie Lannister</h3>
                <p>Kingslayer - Commander of the Lannister's Army</p>
                <div className="social-network">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <IoLogoFacebook className="social-icon"/>
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <IoLogoGithub className="social-icon"/>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <IoLogoLinkedin className="social-icon"/>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <IoLogoTwitter className="social-icon"/>
                  </a>
                </div>
              </div>
              <div className="profile-section profile-section-2">
                <div className="mb-4">
                  <fieldset className="fieldset">
                    <legend>
                      <FormattedMessage id="app.profile.legend.text1" defaultMessage="About me" />
                    </legend>
                  </fieldset>
                  <p className="about-me">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a cursus augue, quis condimentum
                    turpis. Nulla vel nisi a lacus malesuada feugiat id in felis. Ut congue pellentesque mi, a varius
                    nunc aliquet eu. Curabitur eleifend massa dignissim aliquet viverra. Vivamus dictum venenatis
                    est vitae tempus. Donec in massa diam. Cras vitae convallis lacus. Sed eget pharetra quam. Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit. In lobortis leo vitae tellus laoreet molestie.
                    Pellentesque id velit vehicula, ultricies turpis ac, tincidunt sapien.
                    In efficitur vestibulum ante, sit amet iaculis urna.
                  </p>
                </div>
                <div className="mb-4">
                  <fieldset className="fieldset">
                    <legend>
                      <FormattedMessage id="app.profile.legend.text2" defaultMessage="Basic information" />
                    </legend>
                  </fieldset>
                  <table className="table table-user-info">
                    <tbody>
                      <tr>
                        <td>
                          <FormattedMessage id="app.profile.label.gender" defaultMessage="Gender" />:
                        </td>
                        <td>Male</td></tr>
                      <tr>
                        <td><FormattedMessage id="app.profile.label.birthday" defaultMessage="Birthday" />: </td>
                        <td>12 June 1977 (42y/o)</td>
                      </tr>
                      <tr>
                        <td><FormattedMessage id="app.profile.label.country" defaultMessage="Country" />: </td>
                        <td>Westeros</td>
                      </tr>
                      <tr>
                        <td><FormattedMessage id="app.profile.label.city" defaultMessage="City" />: </td>
                        <td>King's Landing</td>
                      </tr>
                      <tr>
                        <td><FormattedMessage id="app.profile.label.phone" defaultMessage="Phone number" />: </td>
                        <td>+1 566-344-673</td>
                      </tr>
                      <tr>
                        <td><FormattedMessage id="app.profile.label.email" defaultMessage="Email address" />: </td>
                        <td>kingslayer@lannister.com</td>
                      </tr>
                      <tr>
                        <td><FormattedMessage id="app.profile.label.website" defaultMessage="Website" />: </td>
                        <td>
                          <a href="https://jamie-lannister.com" target="_blank" rel="noopener noreferrer">
                            https://jamie-lannister.com
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="w-100 d-flex justify-content-center pt-2">
                    <Button color="primary" type="button">
                      <IoMdCreate/> <FormattedMessage id="app.profile.btn.edit" defaultMessage="Edit" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Suspense>
      </Row>
    </div>
  );
};

export default withApp(Profile);
