import React, { useState } from 'react';
import styles from './Header.module.css';
import { Button } from '@mui/material';
import SearchInput from './components/SearchInput/SearchInput';
import AppText from '../AppText/AppText';

const Header: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <div className={styles.headerContainer}>
      <div>
        <AppText>Rent Apartment</AppText>
      </div>
      <SearchInput
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button
        href="/login"
        sx={{
          borderRadius: '20px',
          padding: '6px 24px',
          alignSelf: 'center',
        }}
        variant="contained"
        type={'button'}
        style={{
          fontSize: '14px',
          textTransform: 'none',
          justifySelf: 'flex-end',
        }}
      >
        Log in
      </Button>
    </div>
  );
};

export default Header;
