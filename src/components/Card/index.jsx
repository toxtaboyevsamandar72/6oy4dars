import './index.css';

function Card({ users, onDelete }) {
  return (
    <div className='contain'>
      {users.map((user, index) => (
        <div key={index} className="user-card">
          <h3>{user.username}</h3>
          <p>Email: {user.email}</p>
          <p>Nationality: {user.nationality}</p>
          <p>Languages: {user.languages.join(", ")}</p>
          <p>Description: {user.description}</p>
          <button onClick={() => onDelete(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Card;
