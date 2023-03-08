import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function About() {
    return (
        <div className="text-center m-3">
            <h3>quick steps for create online free album</h3>
            <Col md={{ span: 3, offset: 1 }} className='p-2'>
                <Card className="text-center mt-3 p-2 bg-dark text-white">
                    <h4>1. Create Your Account</h4>
                    <div>
                        its free and easy
                        <Link to={'/LogUp'}> click here to start</Link>
                    </div>

                </Card>
            </Col>
            <Col md={{ span: 3, offset: 5 }} className='p-2'>
                <Card className="text-center m-3 p-2  bg-dark text-white">
                    <h4>2. Create New Album</h4>
                </Card></Col>
            <Col md={{ span: 3, offset: 9 }} className='p-2'>
                <Card className=" text-center m-3 p-2  bg-dark text-white">
                    <h4>3. Share With Friends :)</h4>
                </Card>
            </Col>
        </div>
    )
}