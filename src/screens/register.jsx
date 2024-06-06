import { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../slices/userSlice/userApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/userSlice/authReducer';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/loader';
import '../styles/register.css';

const RegisterScreen = () => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [RegisterAPI, {isLoading}] = useRegisterMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleToggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleRegistration = async (e) => {
        e.preventDefault();
        if (name.trim() !== '' && username.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '') {
            try {
                const res = await RegisterAPI({ name, username, password }).unwrap();
                if (res.message === 'User account created successfully') {
                    dispatch(setCredentials({ ...res }));
                    navigate('/home');
                }
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        } else {
            toast.error('All fields are mandatory');
        }
    }

    return (
        <div className='register-container'>
            <h2 className='my-4'>Welcome to Task Manager, Join us</h2>
            <div className='registerForm-container'>
                <Form onSubmit={handleRegistration}>
                    <Form.Group className='my-2'>
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control type='text' placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className='my-2'>
                        <Form.Label>
                            Email
                        </Form.Label>
                        <Form.Control type='email' placeholder='Enter your email' value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group className='my-2'>
                        <Form.Label>
                            Password
                        </Form.Label>
                        <InputGroup>
                            <Form.Control type={showPassword ? 'text' : 'password'} placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            <InputGroup.Text onClick={handleTogglePasswordVisibility}>
                                {showPassword ? <BsEye /> : <BsEyeSlash />}
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className='my-2'>
                        <Form.Label>
                            Confirm Password
                        </Form.Label>
                        <InputGroup>
                            <Form.Control type={showConfirmPassword ? 'text' : 'password'} placeholder='Enter your password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            <InputGroup.Text onClick={handleToggleConfirmPasswordVisibility}>
                                {showConfirmPassword ? <BsEye /> : <BsEyeSlash />}
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <p className='my-2'>Already Registered? <Link to='/'>Login</Link></p>
                    <Button type='submit' className='my-2'>Register</Button>
                </Form>
            </div>
            {isLoading && <Loader />}
        </div>
    )
}

export default RegisterScreen;