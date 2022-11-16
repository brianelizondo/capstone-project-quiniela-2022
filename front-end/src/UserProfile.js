import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import Loading from './Loading';
import ModalNotification from './ModalNotification';

// import APIFootball api
import APIFootball from "./api-football";

import UserQuinielaListCard from './UserQuinielaListCard';

function UserProfile(){
    // initial state
    const history = useHistory();
    const user = useSelector((state) => state.user);
    const [modalShow, setModalShow] = useState(false);
    const [quinielaDeleteID, setQuinielaDeleteID] = useState(0);
    const [loading, setLoading] = useState(false);
    const [userQuinielas, setUserQuinielas] = useState([]);
    
    useEffect(() => {
        setLoading(true);
        async function getQuinielas() {
            APIFootball.token = user.token;
            const resp = await APIFootball.getQuinielasByUser(user.username);
            setUserQuinielas(resp);
        }
        getQuinielas();
        setLoading(false);
    }, [user.token, user.username]);

    if(loading){
        return <Loading />;
    }

    // handle modal notificacion and delete action
    function handleModalShow(id){
        setQuinielaDeleteID(id);
        setModalShow(true);
    };
    async function deleteQuiniela(){
        APIFootball.token = user.token;
        await APIFootball.deleteQuiniela(user, quinielaDeleteID);
        setModalShow(false);
        history.go(0);
    }

    return (
        <div className="UserProfile col-md-8 offset-md-2">
            <h1>Profile</h1>
            <div className="UserProfile-data">
                <Card>
                    <Card.Header as="h5">User Details</Card.Header>
                    <Card.Body>
                        <p><b>First/Last Name:</b> { `${user.firstName} ${user.lastName}` }</p>
                        <p><b>E-mail:</b> { user.email }</p>
                        <p><b>Username:</b> { user.username }</p>
                    </Card.Body>
                </Card>
            </div>

            <h1>My Quiniela's</h1>
            <ModalNotification modalShow={modalShow} setModalShow={setModalShow} deleteQuiniela={deleteQuiniela} />
            <div className="UserProfile-quinielasList">
                { userQuinielas.map(quiniela => (<UserQuinielaListCard key={quiniela.quinielaID} quiniela={quiniela} handleModalShow={handleModalShow} />))}
            </div>
        </div>
    );
}

export default UserProfile;