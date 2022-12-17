import Logo from '@/components/Logo';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Styles from './home.scss';

const Home: React.FC = () => {
  return (
    <div className={Styles.homeView}>
      <p className={Styles.today}>
        <FormattedMessage
          id="page.home.today"
          defaultMessage={'Today is {ts, date, ::yyyyMMdd}'}
          values={{ ts: Date.now() }}
        ></FormattedMessage>
      </p>
      <Logo />
    </div>
  );
};

export default Home;
