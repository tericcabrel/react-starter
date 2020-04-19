import React, { FC, Fragment, ReactElement } from 'react';

type CountryColumnListProps = {
  label: string,
  subLabels: string[],
  values: Object[]
};

const CountryColumnList: FC<CountryColumnListProps> = (
  { label, subLabels, values }: CountryColumnListProps
): ReactElement => (
  <Fragment>
    <div className="country-column-label">{label}</div>
    <div>
      <ul className="country-column-list" style={{ fontSize: 12 }}>
        {
          values.map((value: any, index: number): ReactElement => (
            <li key={`item-${index}`} className="country-column-item">
              <div className="country-column-item-label">{`Item ${index + 1}`}</div>
              <div className="country-column-item-value">
                { Object.keys(value).map((key: string, i: number): ReactElement => (
                    <div key={`sub-item-${i}`}>
                      <span>{subLabels[i]}: </span>
                      <span className="font-weight-bold">
                        {Array.isArray(value[key]) ? value[key].join(', ') : value[key]}
                      </span>
                    </div>
                  ))}
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  </Fragment>
);

export default CountryColumnList;
