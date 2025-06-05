import React, { useEffect, useState } from 'react';
import { FaUnlock, FaTrash } from 'react-icons/fa';
import axios from 'axios';
const currentUser = JSON.parse(localStorage.getItem('user'));

function UserTable() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    axios.get('https://task-4-backend-83tr.onrender.com/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Failed to load users', err));
  }, []);

  const toggleAll = (e) => {
    if (e.target.checked) {
      setSelected(users.map(user => user.id));
    } else {
      setSelected([]);
    }
  };

  const toggleOne = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBlock = async () => {
    if (currentUser?.status !== 'active') {
      alert('You are blocked and cannot perform this action.');
      window.location.href = '/login';
      return;
    }
    if (selected.length === 0) return;
    try {
      await axios.post('https://task-4-backend-83tr.onrender.com/block-users', { ids: selected });
      alert('Users blocked');
      // Refresh users
      const res = await axios.get('https://task-4-backend-83tr.onrender.com/users');
      setUsers(res.data);
      setSelected([]);
    } catch (err) {
      alert('Failed to block users');
      console.error(err);
    }
  };

  const handleUnblock = async () => {
    if (currentUser?.status !== 'active') {
      alert('You are blocked and cannot perform this action.');
      window.location.href = '/login';
      return;
    }
    if (selected.length === 0) return;
    try {
      await axios.post('https://task-4-backend-83tr.onrender.com/unblock-users', { ids: selected });
      alert('Users unblocked');
      const res = await axios.get('https://task-4-backend-83tr.onrender.com/users');
      setUsers(res.data);
      setSelected([]);
    } catch (err) {
      alert('Failed to unblock users');
      console.error(err);
    }
  };
  const handleDelete = async () => {
    if (currentUser?.status !== 'active') {
      alert('You are blocked and cannot perform this action.');
      window.location.href = '/login';
      return;
    }
    if (selected.length === 0) return;
    if (!window.confirm('Are you sure you want to delete these users?')) return;
    try {
      await axios.post('https://task-4-backend-83tr.onrender.com/delete-users', { ids: selected });
      alert('Users deleted');
      const res = await axios.get('https://task-4-backend-83tr.onrender.com/users');
      setUsers(res.data);
      setSelected([]);
    } catch (err) {
      alert('Failed to delete users');
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-warning" onClick={handleBlock}>Block</button>
        <div>
          <FaUnlock className="me-3" style={{ cursor: 'pointer' }} onClick={handleUnblock} />
          <FaTrash style={{ cursor: 'pointer', color: 'red' }} onClick={handleDelete} />
        </div>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selected.length === users.length}
                onChange={toggleAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Last Login</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(user.id)}
                  onChange={() => toggleOne(user.id)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.last_login_time || '—'}</td>
              <td>
                <span className={`badge bg-${user.status === 'active' ? 'success' : 'secondary'}`}>
                  {user.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
