import { useEffect, useState } from "react";
import { useGetTaskMutation } from "../slices/taskSlice/taskApi";
import { useDispatch, useSelector } from "react-redux";
import { getTask } from "../slices/taskSlice/taskReducer";
import { toast } from "react-toastify";
import Header from "../components/navbar";
import TaskCard from "../components/taskCard";

const PersonalTask = () => {

    const [GetTasksAPI] = useGetTaskMutation();
    const dispatch = useDispatch();
    let { taskItems } = useSelector(state => state.task);
    const { userInfo } = useSelector(state => state.auth);
    const token = userInfo.token;

    const [arrayItem, setArrayItem] = useState([]);

    const handleFilter = (currentStatus) => {
        let tempArray = taskItems.filter((task) => task.category === 'Personal');
        if (currentStatus !== 'All') {
            tempArray = tempArray.filter(task => task.status === currentStatus);
            setArrayItem(tempArray);
        } else {
            setArrayItem(tempArray);
        }
    }

    useEffect(() => {
        const getTasks = async () => {
            try {
                const res = await GetTasksAPI(token).unwrap();
                if (res.message === 'Task retrieved successfully') {
                    dispatch(getTask(res.data));
                }
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }

        getTasks();
    }, [GetTasksAPI, dispatch, token]);

    useEffect(() => {
        const workTasks = taskItems.filter((task) => task.category === 'Personal');
        setArrayItem(workTasks);
    }, [taskItems])

    return (<>
        <div>
            <Header />
            <h5 className="my-2">Your personal task will appear here</h5>
            <div className='d-flex justify-content-center my-4'>
                <button onClick={() => handleFilter('All')} className='status-button'>All</button>
                <button onClick={() => handleFilter('Completed')} className='status-button'>Completed</button>
                <button onClick={() => handleFilter('To-Do')} className='status-button'>To-Do</button>
            </div>
            <div className="my-2">
                {arrayItem.map((task) => <TaskCard key={task._id} task={task} />)}
            </div>
        </div>
    </>)
}

export default PersonalTask;