import Header from '../components/navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useGetTaskMutation } from '../slices/taskSlice/taskApi';
import { useEffect, useState } from 'react';
import { getTask } from '../slices/taskSlice/taskReducer';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TaskCard from '../components/taskCard';
import '../styles/home.css';

const Home = () => {

    let { taskItems } = useSelector((state) => state.task);
    const { userInfo } = useSelector((state) => state.auth);
    const token = userInfo.token;
    const [GetTaskAPI] = useGetTaskMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [arrayItem, setArrayItem] = useState(taskItems);

    const handleFilter = (currentStatus) => {
        if (currentStatus !== 'All') {
            let tempArray = taskItems.filter(task => task.status === currentStatus);
            setArrayItem(tempArray);
        } else {
            setArrayItem(taskItems);
        }
    }

    const handleAddTask = () => {
        navigate('/addTask');
    }

    useEffect(() => {
        const getAllTask = async () => {
            try {
                const res = await GetTaskAPI(token).unwrap();
                if (res.message === 'Task retrieved successfully') {
                    dispatch(getTask(res.data));
                }
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
        getAllTask();
    }, [GetTaskAPI, token, dispatch]);

    useEffect(() => {
        setArrayItem(taskItems);
    }, [taskItems]);

    return (<div>
        <Header />
        <div className='d-flex justify-content-between my-2'>
            <h5>Welcome to home screen</h5>
            <Button style={{ backgroundColor: 'rgb(195, 121, 30)', border: 'none' }} onClick={handleAddTask}>Add Task</Button>
        </div>
        <div className='d-flex justify-content-center my-4'>
            <button onClick={() => handleFilter('All')} className='status-button'>All</button>
            <button onClick={() => handleFilter('Completed')} className='status-button'>Completed</button>
            <button onClick={() => handleFilter('To-Do')} className='status-button'>To-Do</button>
        </div>
        <div className='my-2 d-flex'>
            {arrayItem.map((task) => <TaskCard key={task._id} task={task} />)}
        </div>
    </div>)
}

export default Home;