import React, { useState } from 'react'
import FullPageLoader from './Loader'


const useFullPageLoader = () => {
  const [loading, setLoading] = useState(false)
  return [
    loading ? <FullPageLoader /> : null,
    () => setLoading(true), //show loader
    () => setLoading(false)
  ];
}

export default useFullPageLoader;