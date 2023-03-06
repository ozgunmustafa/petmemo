import React from 'react';

const NoContent = () => {
  return (
    <div className="flex flex-column align-center py-30">
      <div className="w-50 w-lg-25 mx-auto">
        <img
          src={`${process.env.PUBLIC_URL + '/img/no-data.svg'}`}
          className="w-100"
          alt=""
        />
      </div>
      <p className="text-center w-75">
        There is no pet currently available please add one!
      </p>
    </div>
  );
};

export default NoContent;
