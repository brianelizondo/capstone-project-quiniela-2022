import React from 'react';
import { useSelector } from 'react-redux';

function UserProfile(){
    const user = useSelector((state) => state.user.username);

    return (
        <div className="UserProfile">
            <h1>User Profile: { user }</h1>
        </div>
    );
}

export default UserProfile;