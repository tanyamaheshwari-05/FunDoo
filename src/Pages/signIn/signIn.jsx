import React,{useState} from 'react';
import './signIn.css'; // External CSS link
import {Card}  from '@mui/material';
    import  {CardContent}  from '@mui/material' ;
    import  {Button}  from '@mui/material'; 
import {Typography}  from '@mui/material' ;
import { Box } from '@mui/material';
import {TextField}  from '@mui/material';
// import {Link} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axiosInstance';

export default function SignIn() {
  const[formData,setFormData]=useState({
       email: '', password: '',
    })
    const [errors, setErrors] =useState({});
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit =async  () => {
      let newErrors = {};
      
       if (!formData.email) {
    newErrors.email = "Enter an email";
  } else if (!formData.email.endsWith("@gmail.com")) {
    newErrors.email = "Format should be example@gmail.com";
  }
   if (!formData.password) {
    newErrors.password = "Enter a password";
  } else if (formData.password.length < 8) {
    newErrors.password = "Use 8 characters or more for your password";
  }
  
      if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
  } else {
    try{
      const res=await API.get(`/users?email=${formData.email}&passwrod=${formData.password}`);
      if(res.data.length>0){
        const user=res.data[0];
        localStorage.setItem('userId',user.id);
        localStorage.setItem('userName',`${user.firstName}${user.lastName}`);
        alert("Login successfull!");
        navigate('/');
            }
            else{
              alert("Invalid email or password!");
            }
    }
  catch(err){
    console.log("Login error:",err);
  }
  }
    };
     const navigate = useNavigate();
  return (
    <div className='signInPage'>
      <Card className="SignInCard" variant="outlined">
        <CardContent className="signInContent">
          
          <Typography variant="h5" className="fundoLogo">FunDoo</Typography>

          <Typography variant="h5" sx={{ mt: 1 }}>Sign in</Typography>
          <Typography variant="body1" sx={{ mb: 4, mt: 0.5 }}>with your Fundo Account</Typography>

          <Box component="form" noValidate className="formBox">
            
            <TextField  name="email" 
                value={formData.email} 
                onChange={handleChange}  label="Email or phone" variant="standard" fullWidth className="inputField" error={Boolean(errors.email)} helperText={errors.email} />

            {/* <Typography className="forgot" sx={{ mt: 1, mb: 3 }}>Forgot email?</Typography> */}

           
            <TextField name="password" 
                  type="password"
                  value={formData.password} 
                  onChange={handleChange} label="Password"  variant="standard" fullWidth className="inputField2" error={Boolean(errors.password)} helperText={errors.password}/>

            {/* <Typography variant="body2" className="guestMode">
              Not your computer? Use Guest mode to sign in privately. <br />
              <span className="forgot">Learn more</span>
            </Typography> */}

            <div className="signInFooter">
              <Button className="textBtn" onClick={() => navigate('/signup')}>Create account</Button>
              <Button variant="contained" disableElevation className="nextBtn" onClick={handleSubmit}>Next</Button>
            </div>
          </Box>

        </CardContent>
      </Card>
    </div>
  );
}