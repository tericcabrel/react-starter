import React, { FC, ReactElement } from 'react';

type CountryColumnItemProps = {
  label: string,
  value?: string,
  values?: string[] | number[],
  type: 'text' | 'img' | 'array'
};

const CountryColumnItem: FC<CountryColumnItemProps> = (
  { label, value, values, type }: CountryColumnItemProps
): ReactElement => (
  <td className="country-column-item">
    <div className="content">
      <span>{label}: </span>
      {type === 'text' && <span className="font-weight-bold">{value}</span>}
      {type === 'img' && <img src={value} alt="Flag"/>}
      {type === 'array' && values && <span className="font-weight-bold">{values.join(', ')}</span>}
    </div>
  </td>
);

export default CountryColumnItem;
