import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useAddTaskMutation } from "../slices/taskSlice/taskApi";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../slices/taskSlice/taskReducer";
import { useNavigate } from 'react-router-dom';
import Header from "../components/navbar";
import { toast } from "react-toastify";
import Loader from "../components/loader";

const AddTask = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('')
    const [AddTaskAPI, {isLoading}] = useAddTaskMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector(state => state.auth);
    const token = userInfo.token;

    const createTaskHandler = async (e) => {
        e.preventDefault();
        if (title.trim() !== '' && description.trim() !== '' && category.trim !== '') {
            const res = await AddTaskAPI({ data: { title, description, dueDate, category }, token }).unwrap();
            if (res.message === 'Task added successfully') {
                dispatch(addTask(res.data));
                navigate('/home');
            }
        }else{
            toast.error('Title, Description and Category are mandatory')
        }
    }

    const handleCancel = () => {
        navigate('/home');
    }

    return (<>
        <div>
            <Header className="my-2" />
            <h5 className="my-2">Create your task</h5>
            <Form className="my-2" onSubmit={createTaskHandler}>
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
                        Due Date
                    </Form.Label>
                    <Form.Control type="text" placeholder="YYYY/MM/DD" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </Form.Group>
                <div className="d-flex">
                    <Button className="my-2 mx-1" onClick={handleCancel} style={{ backgroundColor: 'rgb(195, 121, 30)', border: 'none' }}>Cancel</Button>
                    <Button className="my-2 mx-1" type="submit" style={{ backgroundColor: 'rgb(195, 121, 30)', border: 'none' }}>Create Task</Button>
                </div>
            </Form>
            {isLoading && <Loader />}
        </div>
    </>)
}

export default AddTask;