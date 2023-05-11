import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SignIn = () => {

  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const navigate = useNavigate();
  const [clientId,setClientId]=useState(null);

  const handleSignIn = (e) =>{
    e.preventDefault();
    const formData={email:email,password:password};
    axios.post('http://localhost:3000/login',formData)
    .then((response)=>{
        
        const userType=response.data.userType;
        console.log(userType);
        if(userType == 'supplier'){
          
           navigate('Stock');
        }else if(userType== 'client'){
          const clientId=response.data.clientId;
          setClientId(clientId); 
        navigate(`/Client/Facture/${clientId}`);

        }else {
          console.log("Invalid email or password");
        }
    })
    .catch((error)=>{
      console.error(error);
    });
  };


  return (
    <div className="position-relative SignInInterface">
      <div className="d-flex justify-content-center align-items-center">
        <Card className="TitleCard position-absolute btn-primary ">
          <Card.Title className="SignInTitle"><p className="d-flex justify-content-center align-items-center mt-4 ">Sign In</p></Card.Title>
        </Card>
      </div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Card className="signInCard position-absolute">
          <Card.Body>
            <form onSubmit={handleSignIn}>
            <InputGroup className="p-2 usernameInput">
              <Form.Control placeholder="Enter your Username" value={email} onChange={(e)=> setEmail(e.target.value)} />
            </InputGroup>
            <InputGroup className="p-2">
              <Form.Control placeholder="Enter your Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            </InputGroup>
            <div className="d-flex justify-content-center align-items-center">
              <Button variant="btn bg-dark text-white" className="bouttonSignIn mt-5" type="submit">
                Sign In
              </Button>
            </div>
            </form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
export default SignIn;
