import { ChangeEvent, FormEvent, useState } from "react"
import { Button, Card } from "react-bootstrap"
import { useHistory, useParams } from "react-router-dom"
import { useService } from "../ServiceProvider"

const defaultFormFields = {
    password: '',
    confirmPassword: '',
}

function PasswordReset() {
    /**
     * Extract oobCode from the URL.
     * Delete console.log in production.
     */
    const history = useHistory()
    const oobCode = new URLSearchParams(window.location.href).get('oobCode');
    const [successMessage, setSuccessMessage] = useState(false)
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { password, confirmPassword } = formFields;
    const { authService } = useService();

    // let oobCode: string | null = searchParams?.get('oobCode')

    const resetFormFields = () => {
        return (
            setFormFields(defaultFormFields)
        )
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            alert("Passwords did not match.")
            return;
        }

        try {
            if (oobCode) {
                authService.confirmThePasswordReset(oobCode, confirmPassword)
                resetFormFields()
                setSuccessMessage(true)
            } else {
                alert('Something is wrong; try again later!')
                console.log('missing oobCode')
            }
        } catch (error: any) {
            if (error.code === 'auth/invalid-action-code') {
                alert('Something is wrong; try again later.')
            }
            console.log(error.message)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <div className="row justify-content-center mt-5">
            <Card border="dark d-flex justify-content-center col-4">
                {
                    successMessage ?
                        <div>
                            <h3>Success! Your Password change successfully</h3>
                            <Button variant="secondary"
                                size="sm"
                                onClick={() => history.push('/Login')}
                            >
                                Go to the Login page
                            </Button>
                        </div> :
                        <form onSubmit={handleSubmit}>
                            <h3>Reset Password</h3>
                            <div>
                                <label>new password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    className="form-control"
                                    onChange={handleChange}
                                    placeholder="New Password"
                                    required
                                />
                            </div>
                            <div>
                                <label>confirm password</label>
                                <input
                                    className="form-control"
                                    type='password'
                                    name='confirmPassword'
                                    value={confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm Password"
                                    required
                                />
                            </div>
                            <div className="d-grid mb-3 mt-3">
                                <Button type="submit" variant="secondary" size="sm">Save</Button>
                            </div>
                        </form>
                }
            </Card>
        </div>

    )
}

export default PasswordReset