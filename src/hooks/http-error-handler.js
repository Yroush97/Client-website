import { useState, useEffect } from 'react';
import Axios from 'axios';

export default httpClient => {
  const [error, setError] = useState(null);

  const reqInterceptor = Axios.interceptors.request.use(req => {
    setError(null);
    return req;
  });
  const resInterceptor = Axios.interceptors.response.use(
    res => res,
    err => {
      setError(err);
    }
  );

  useEffect(() => {
    return () => {
      Axios.interceptors.request.eject(reqInterceptor);
      Axios.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
}