import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';
import tasks2 from "../assets/tasks2.jpg";

const Home = () => {
  const authState = useSelector(state => state.authReducer);
  const { isLoggedIn, user } = authState;

 

  useEffect(() => {
    document.title = isLoggedIn ? `${user.name}'s tasks` : "Task Manager";
  }, [isLoggedIn, user?.name]);

  return (
    <MainLayout>
      {!isLoggedIn ? (
        <div className='bg-primary text-white h-[90vh] py-8 text-center flex flex-col items-center'>
          <h1 className='text-2xl md:text-3xl'>Welcome to Task Manager App</h1>
          <Link to="/signup" className='mt-10 text-xl block space-x-2 hover:space-x-4'>
            <span className='transition-[margin]'>Join now to manage your tasks</span>
            <span className='relative ml-4 text-base transition-[margin]'>
              <i className="fa-solid fa-arrow-right"></i>
            </span>
          </Link>

          <div className="flex flex-col md:flex-row items-center justify-center mt-10 w-full px-4">
            <img className="w-full max-w-xs md:max-w-sm rounded-md" src={tasks2} alt="No tasks available" />
            <div className='mt-6 md:mt-0 md:ml-6 text-lg md:text-2xl flex flex-col items-start'>
              <div className='transition-[margin] mt-4'>“Organize your tasks, conquer your goals, and boost your productivity with ease.”</div>
              <div className='transition-[margin] mt-4'>“Tackle your to-dos, reach new heights, and unleash your full potential with confidence.”</div>
              <div className='transition-[margin] mt-4'>“Structure your day, accomplish your objectives, and simplify your life with every task.”</div>
              <div className='transition-[margin] mt-4'>“Prioritize your tasks, realize your ambitions, and transform your productivity into success.”</div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1 className='text-lg mt-8 mx-8 border-b border-b-gray-300'>Welcome {user.name}</h1>
          <Tasks />
        </>
      )}
    </MainLayout>
  );
}

export default Home;
