import '../styles/taskCard.css';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { MdDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useDeleteTaskMutation } from '../slices/taskSlice/taskApi';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../slices/taskSlice/taskReducer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const TaskCard = ({task}) => {

    const [TaskDeleteAPI] = useDeleteTaskMutation();
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth);
    const token = userInfo.token;
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleTaskDelete = async (taskId) => {
        try {
            const res = await TaskDeleteAPI({token, taskId}).unwrap();
            if(res.message === 'Your task has been deleted'){
                dispatch(deleteTask(taskId));
            }
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    const handleUpdateTask = async (task) => {
        navigate('/updateTask', {state: {task}});
    }

    return (<>
        <Card className='task-card' bg={task.status === 'Completed' ? 'success' : 'warning'}>
            <Card.Body>
                <Card.Title className='d-flex justify-content-between'>
                    {task.title}
                    <MdEdit onClick={() => handleUpdateTask(task)} style={{cursor: 'pointer'}} />
                </Card.Title>
                <Card.Text>
                    {task.description}
                </Card.Text>
            </Card.Body>
            <Card.Footer className='d-flex justify-content-between'>
                <div>Due on: {task.dueDate ? formatDate(task.dueDate) : 'NA'}</div>
                <div><MdDeleteOutline onClick={() => handleTaskDelete(task._id)} style={{cursor: 'pointer'}} size={20} /></div>
            </Card.Footer>
        </Card>
    </>)
}

TaskCard.propTypes = {
    task: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      category: PropTypes.string,
      dueDate: PropTypes.string,
      status: PropTypes.string,
      _id: PropTypes.string
    }),
  };

export default TaskCard;