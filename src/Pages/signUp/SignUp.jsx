import './SignUp.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
  import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { IconButton } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import API from '../../api/axiosInstance';

export default function SignUp() {
    const[formData,setFormData]=useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: ''
  })
  const [errors, setErrors] =useState({});
  const[showPassowrd,setPAssword]=useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleSubmit = async () => {
  let newErrors = {};

  // 1. First Name Validation
  if (!formData.firstName) {
    newErrors.firstName = "Enter first name";
  } else if (!formData.firstName.match(/^[A-Za-z]{2,}$/)) {
    newErrors.firstName = "Enter a valid name (letters only)";
  }

  // 2. Last Name Validation
  if (!formData.lastName) {
    newErrors.lastName = "Enter last name";
  } else if (!formData.lastName.match(/^[A-Za-z]{2,}$/)) {
    newErrors.lastName = "Enter a valid name";
  }

  // 3. Email Validation
  if (!formData.email) {
    newErrors.email = "Enter an email";
  } else if (!formData.email.endsWith("@gmail.com")) {
    newErrors.email = "Format should be example@gmail.com";
  }

  // 4. Password Validation
  if (!formData.password) {
    newErrors.password = "Enter a password";
  } else if (formData.password.length < 8) {
    newErrors.password = "Use 8 characters or more for your password";
  }

  // 5. Confirm Password Validation
  if (!formData.confirmPassword) {
    newErrors.confirmPassword = "Confirm your password";
  } else if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = "Passwords didn't match. Try again.";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
  } else {
    // setErrors({});
    // alert("Form submitted successfully!");
    try{
      const checkUser=await API.get(`/users?email=${formData.email}`);
      if(checkUser.data.length>0){
        setErrors({email:"This email is already registered"});
        return;
      }
      await API.post('/users',{
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      alert("Account created successfully!");
      navigate('/');
      } catch (err) {
      console.error("Signup error:", err);
      alert("Server error, please try again later.");
    }
    }
   
};

   const navigate = useNavigate();
  return (
    <div className='signUpPage'>
    <Card className="SignUpCard">
      <CardContent className='split-card'>
        <div className='left-side'>
            <Typography variant="h5" sx={{ color: '#d32a54ff', fontWeight: 'bold', mb: 1, textAlign: 'left' }}>
              FunDoo
            </Typography>
        <Typography gutterBottom variant="h5" component="div" className='title' >
          Create your Fundo Account
        </Typography>
    <Box 
      component="form"
      noValidate
      autoComplete="off"
    >
        <div className='name'>
      <TextField name="firstName" value={formData.firstName} 
  onChange={handleChange} id="outlined-basic" label="First Name" size="small" variant="outlined" error={!!errors.firstName} helperText={errors.firstName}/>
      <TextField id="outlined-basic" name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} label="Last Name" size="small"  variant="outlined" error={!!errors.lastName} helperText={errors.lastName}/> 
      </div>
      <TextField id="outlined-basic" name="email" 
                value={formData.email} 
                onChange={handleChange} size="small" label="Your email address" variant="outlined"  fullWidth className='EmailBox' error={!!errors.email} helperText={errors.email}/><br/>
      <Typography variant="caption" sx={{ display: 'block', mb: 0.5,mt:0.5,color:'#000',textAlign:'left'}}>
                You'll need to confirm that this email belongs to you.
              </Typography>
                <Typography variant="caption" className="newGmail" sx={{ display: 'block',color:'blue', mb:2.8,fontWeight:600,cursor:'pointer',textAlign:'left' }}>
                Create a new Gmail address instead
              </Typography>
      <div className='passwrd'>
      <TextField name="password" 
                  type="password"
                  value={formData.password} 
                  onChange={handleChange} id="outlined-basic" size="small"  label="Password" variant="outlined" error={!!errors.password} helperText={errors.password}/>
      <TextField name="confirmPassword" 
                  type="password"
                  value={formData.confirmPassword} 
                  onChange={handleChange} id="outlined-basic" size="small" label="Confirm " variant="outlined" className='confirmedBox'error={!!errors.confirmPassword} helperText={errors.confirmPassword}/>
      <IconButton sx={{'&:focus':{outline:'none'}}} onClick={()=>setPAssword(!showPassowrd)}>{showPassowrd?<VisibilityOutlinedIcon fontSize='small'/>:<VisibilityOffOutlinedIcon fontSize='small'/>}</IconButton>

      </div>
      <Typography variant="caption" color="textSecondary" sx={{ display: 'block',color:'#000',fontWeight:400,textAlign:'left' }}>
                Use 8 or more characters with a mix of letters, numbers & symbols
              </Typography>

    </Box>
      <div className='footer-actions'>
               <Button size="medium" sx={{ textTransform: 'none', fontWeight: 'bold' }} onClick={() => navigate('/signin')}>  Sign in instead</Button>
               <Button variant="contained" disableElevation className="next-btn" onClick={handleSubmit}>Submit</Button>
            </div>

      </div>
      <div className='right-image'>
             <img src="https://ssl.gstatic.com/accounts/signup/glif/account.svg" alt="logo" />
             <Typography variant="body2" color="textSecondary">
               One account. All of Google working for you.
             </Typography>
          </div>
          </CardContent>
    </Card></div>
  );
}
