import React from 'react';

const useLocalStorageTokenExpires = (initialValue) => {
  const [state, setState] = React.useState(() => {
    try {
      const checkState = new Date(localStorage.getItem('tokenExpires'));
      if (checkState) {
        return checkState;
      } else {
        return initialValue;
      }
    } catch (e) {
      return initialValue;
    }
  })
  const setStateWrapper = (newState) => {
    localStorage.setItem('tokenExpires', newState);
    setState(newState);
  }
  return [state, setStateWrapper];
}

export default useLocalStorageTokenExpires;