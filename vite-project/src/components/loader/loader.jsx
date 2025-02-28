import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

function Loader({width,color}) {
    return (
        
          <ThreeDots
  visible={true}
  height={width}
  width={width}
  color={color}
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
        
    );
}

export default Loader;