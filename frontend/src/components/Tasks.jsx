import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';
import taskmanager2 from '../assets/taskmanager2.jpg';

const Tasks = () => {
  const authState = useSelector(state => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = { url: "/tasks", method: "get", headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then(data => setTasks(data.tasks));
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);

  const handleDelete = (id) => {
    const config = { url: `/tasks/${id}`, method: "delete", headers: { Authorization: authState.token } };
    fetchData(config).then(() => fetchTasks());
  };

  return (
    <div className="container mx-auto p-4 md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
      {tasks.length !== 0 && <h2 className="my-4 text-xl md:text-2xl font-semibold">Your tasks ({tasks.length})</h2>}
      
      {loading ? (
        <Loader />
      ) : (
        <div>
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center mt-10 gap-6">
              <Link to="/tasks/add" className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md px-4 py-2 text-center w-full max-w-xs">
                + Add new task
              </Link>
              <div className="w-full flex justify-center">
                <img className="w-full max-w-xs md:max-w-sm" src={taskmanager2} alt="No tasks available" />
              </div>
            </div>
          ) : (
            tasks.map((task, index) => (
              <div key={task._id} className="bg-white my-4 p-4 text-gray-600 rounded-md shadow-md">
                <div className="flex items-center">
                  <span className="font-medium">Task #{index + 1}</span>
                  <Tooltip text="Edit this task" position="top">
                    <Link to={`/tasks/${task._id}`} className="ml-auto mr-2 text-green-600 cursor-pointer">
                      <i className="fa-solid fa-pen"></i>
                    </Link>
                  </Tooltip>
                  <Tooltip text="Delete this task" position="top">
                    <span className="text-red-500 cursor-pointer" onClick={() => handleDelete(task._id)}>
                      <i className="fa-solid fa-trash"></i>
                    </span>
                  </Tooltip>
                </div>
                <div className="mt-2 whitespace-pre-wrap text-gray-700">{task.description}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Tasks;
