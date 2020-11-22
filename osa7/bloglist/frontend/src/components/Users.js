import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Table } from 'react-bootstrap';
import { getAllUsers } from '../reducers/usersReducer';

const Users = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector(state => state.allUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="users-section">
      <h3>
        Users
      </h3>
      <Table striped>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {allUsers && allUsers.map(user => 
            <tr key={user.username}>
              <th><Link to={`/users/${user.id}`}>{user.name}</Link></th><th>{user.blogs.length}</th>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;