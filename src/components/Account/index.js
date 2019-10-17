import React from 'react';

import withAuth from '../Session/withAuth';

const AccountPage = () => (
    <div>
        <h1>Account Page</h1>
    </div>
);

export default withAuth(session => session && session.me)(
    AccountPage,
);