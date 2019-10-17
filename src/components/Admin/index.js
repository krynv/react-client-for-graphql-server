import React from 'react';

import withAuth from '../Session/withAuth';

const AdminPage = () => (
    <div>
        <h1>Admin Page</h1>
    </div>
);

export default withAuth(
    session => session && session.me && session.me.role === 'ADMIN',
)(AdminPage);