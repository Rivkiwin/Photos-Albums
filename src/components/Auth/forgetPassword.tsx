import { FormEvent, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useService } from "../ServiceProvider";

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [emailMessage, setEmailMessage] = useState(false);
  const { authService } = useService();
  const history = useHistory();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      authService.passwordReset(email).then(
        (res) => {
          if (!res) {
            history.replace('/Login')
          }
        }
      )
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        // alert('User not found, try again!')
        setEmail('')
      }
    }
  };

  return (<div>
    {
      emailMessage ?
        <h3>The Email has been sent; Check your Inbox!</h3> :
        <div className="row justify-content-center mt-5">
          <Card border="dark d-flex justify-content-center col-4">
            <form onSubmit={handleSubmit}>
              <h3>Reset Password</h3>
              <div className="mb-3">
                <label>email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="name@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="d-grid mb-3">
                <Button size="sm" variant="secondary" type='submit'>Reset Your Password</Button>
              </div>
            </form></Card></div>
    }
  </div>
  )
}

export default ForgotPassword