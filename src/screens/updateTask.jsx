import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateTaskMutation } from "../slices/taskSlice/taskApi";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../slices/taskSlice/taskReducer";
import { toast } from "react-toastify";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Header from "../components/navbar";
import Loader from "../components/loader";

const UpdateTask = () => {

    const location = useLocation();
    const { task } = location.state;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [UpdateTaskAPI, {isLoading}] = useUpdateTaskMutation();
    const { userInfo } = useSelector(state => state.auth);
    const token = userInfo.token;
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [category, setCategory] = useState(task.category);
    const [status, setStatus] = useState(task.status);
    const [dueDate, setDueDate] = useState(task.dueDate);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            console.log("Came in");
            const res = await UpdateTaskAPI({ taskId: task._id, token, data: {title, description, category, status, dueDate} }).unwrap();
            if (res.message == 'Your task updated successfully') {
                console.log("authentiated")
                dispatch(updateTask({taskId: task._id, data: res.data}));
                navigate('/home');
            }
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    const handleCancel = () => {
        navigate('/home');
    }

    return (<>
        <div>
            <Header className='my-2' />
            <h5 className="my-2">Update your task</h5>
            <Form className='my-2' onSubmit={handleUpdate}>
                <Form.Group className="my-2 col-md-6">
                    <Form.Label>
                        Title
                    </Form.Label>
                    <Form.Control type="text" placeholder="Name your task" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group className="my-2 col-md-6">
                    <Form.Label>
                        Description
                    </Form.Label>
                    <Form.Control type="text" as='textarea' rows={2} placeholder="Description goes here" value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>
                <Form.Group className="my-2 col-md-6">
                    <Form.Label>
                        Category
                    </Form.Label>
                    <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="" disabled>Choose an option</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="my-2 col-md-6">
                    <Form.Label>
                        Status
                    </Form.Label>
                    <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="" disabled>Choose an option</option>
                        <option value="To-Do">To Do</option>
                        <option value="Completed">Completed</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="my-2 col-md-6">
                    <Form.Label>
                        Due Date
                    </Form.Label>
                    <Form.Control type="text" placeholder="YYYY/MM/DD" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </Form.Group>
                <div className="d-flex">
                    <Button className="my-2 mx-1" onClick={handleCancel} style={{ backgroundColor: 'rgb(195, 121, 30)', border: 'none' }}>Cancel</Button>
                    <Button className="my-2 mx-1" type="submit" style={{ backgroundColor: 'rgb(195, 121, 30)', border: 'none' }}>Update Task</Button>
                </div>
            </Form>
            {isLoading && <Loader />}
        </div>
    </>)
}

export default UpdateTask;