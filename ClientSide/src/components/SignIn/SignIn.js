import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
const SignIn = () => {
  return (
    <div className="position-relative SignInInterface">
      <div className="d-flex justify-content-center align-items-center">
        <Card className="TitleCard position-absolute btn-primary ">
          <Card.Title className="SignInTitle"><p className="d-flex justify-content-center align-items-center mt-4"  >Sign In</p></Card.Title>
        </Card>
      </div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Card className="signInCard position-absolute">
          <Card.Body>
            <InputGroup className="p-2 usernameInput">
              <Form.Control placeholder="Enter your Username" />
            </InputGroup>
            <InputGroup className="p-2">
              <Form.Control placeholder="Enter your Password" type="password" />
            </InputGroup>
            <div className="d-flex justify-content-center align-items-center">
              <Button variant="primary" className="bouttonSignIn mt-5">
                Sign In
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
export default SignIn;
