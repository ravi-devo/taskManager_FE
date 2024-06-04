import { useEffect, useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useLoginMutation } from '../slices/userSlice/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/userSlice/authReducer';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginScreen = () => {

    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [LoginAPI] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {userInfo} = useSelector(state => state.auth);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleUserLogin = async (e) => {
        e.preventDefault();
        if (username.trim() !== '' && password.trim() !== '') {
            try {
                const response = await LoginAPI({username, password}).unwrap();
                if(response.message === 'User logged in successfully'){
                    dispatch(setCredentials({ ...response }));
                    navigate('/home');
                }
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }else{
            toast.error('Username or Password cannot be empty')
        }
    }

    useEffect(() => {
        if(userInfo){
            navigate('/home')
        }
    }, [navigate, userInfo])

    return (<>
        <div>
            <h2>Welcome to login page</h2>
            <Form onSubmit={handleUserLogin}>
                <Form.Group className='my-2'>
                    <Form.Label>
                        Email
                    </Form.Label>
                    <Form.Control type='email' placeholder='Enter your email' value={username} onChange={(e) => setEmail(e.target.value)} />
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
                <p className='my-2'>Not registered yet? <Link to={'/register'}>Register</Link></p>
                <Button type='submit'>Login</Button>
            </Form>
        </div>
    </>)
}

export default LoginScreen;