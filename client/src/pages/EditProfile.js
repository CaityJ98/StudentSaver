import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CurrentListings from '../components/Profile/Sales/CurrentListings';
import { getUser, getuserProfile } from '../functions/userData';
import { Col, Row, Button, OverlayTrigger, Tooltip, Spinner, Alert } from 'react-bootstrap';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { FaSchool } from 'react-icons/fa'
import { TiTick } from 'react-icons/ti';
import { AiFillCloseSquare } from 'react-icons/ai';
import { editUserProfile } from '../functions/userData';


function EditProfile () {
const [user, setUser ] = useState({ name: "", email: "", avatar: "", university: ""})
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);
const[alertShow, setAlertShow] = useState(false);
const navigate = useNavigate();

useEffect(() => {
    window.scrollTo(0, 0);
    getUser()
        .then(res => setUser(res.user))
        .catch(err => console.log(err))
}, [setUser])

const handleDiscard = () => { navigate(`/profile/${user._id}`) }
const handleChanges = (e) => {
    e.preventDefault();
    setUser({...user, [e.target.name]: e.target.value});
    if (e.target.files) {
        setUser({ ...user, avatar: e.target.files[0] })
    }
}
const handleSave = (e) => {
    e.preventDefault();
    let {_id, name, email, university, avatar } = user;
    let obj = { name, email, university }
    setLoading(true);
    if (typeof avatar === 'object') {
        getBase64(avatar)
            .then((data) => {
                obj['avatar'] = data;
                editUserProfile(_id, obj)
                console.log(avatar)
                    .then(res => {
                        if (res) {
                            navigate(`/profile/${_id}`);
                        } else{
                            setLoading(false);
                            setError(res.error);
                            setAlertShow(true);
                        }
                    })
                    .catch(err => console.error('edit profile err: ', err))
                })
            .catch(err => console.log('base64 error: ', err));
    }
    // } else {
    //     editUserProfile(_id, obj)
    //         .then(res => {
    //             if ()
    //         })
    }
    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    return (
    <>
         <div id="profile-head">
            <div className="profile-container">
                <form className="col-lg-12">
                    {alertShow && 
                        <Alert variant="danger" onClose={() => setAlertShow(false)} dismissable>
                            <p>
                                {error}
                            </p>
                        </Alert>
                    }
                    <Row className="profile-row">
                        <Col lg={3} md={5} sm={12}>
                            <label htmlFor="file-upload" className="customer-file-upload">
                                <OverlayTrigger placement="bottom" overlay={<Tooltip>Click to select a photo</Tooltip>}>
                                    <img id="avatar" src={user.avatar} alt="user-avatar"/>
                                </OverlayTrigger>
                            </label>
                            <input id="file-upload" type="file" name="avatar" onChangeCapture={handleChanges} />
                        </Col>
                        <Col lg={4} md={3} sm={12}>
                            <p><BsFillPersonFill /> <input type="text" name="name" value={user.name} onChange={handleChanges} required /></p>
                            <p><MdEmail /> <input type="email" name="email" value={user.email} onChange={handleChanges} required /></p>
                            <p><FaSchool /> <input type="text" name="university" value={user.university} onChange={handleChanges} required /></p>
                        </Col>
                        <Col lg={2} id="edit-profile-icons">
                            {loading ? (
                                <Spinner animation="border" />
                            ) : (
                                <>
                                    <OverlayTrigger placement="bottom"
                                        overlay={<Tooltip> Save Changes </Tooltip>}>
                                            <span onClick={handleSave}><TiTick /></span>
                                        </OverlayTrigger>
                                        <OverlayTrigger placement="bottom" overlay={<Tooltip>Discard Changes </Tooltip>}>
                                            <span onClick={handleDiscard}><AiFillCloseSquare /></span>
                                        </OverlayTrigger>
                                </>
                            )
                        }
                        </Col>
                    </Row>
                </form>
           </div>
        </div>
        <div className="button-container">
            <Row>
                <Col lg={2} sm={12} id="aside">
                    <Button disabled variant="dark" id="current-listings">Current Listings</Button>{' '}
                    <Button disabled variant="dark" id="archived-listings"> Archived Listings</Button> {' '}
                </Col>
                <Col lg={10} sm={12} disabled>
                    <CurrentListings params={user}/>
                </Col>
            </Row>
        </div>
        
     </>
    )
}


export default EditProfile;
