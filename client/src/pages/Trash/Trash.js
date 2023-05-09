import React, { useState, useEffect, useContext } from 'react';
import Posts from '../../components/Post/Posts';
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar';
const Home = () => {



  return (
    <div className='container-layout'>
      <div className='container-sidebar'>
        <LeftSideBar />
      </div>
      <Posts cover={false} type={'trash'} />
    </div>
  );
};

export default Home;
