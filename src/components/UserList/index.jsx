import { useState, useEffect } from "react";
import Card from "../Card";
import './index.css'

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    nationality: "",
    languages: [],
    description: "",
  });



  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      const updatedLanguages = checked
        ? [...formData.languages, value]
        : formData.languages.filter((lang) => lang !== value);
      setFormData((prev) => ({ ...prev, languages: updatedLanguages }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsers([...users, formData]);
    setFormData({
      username: "",
      email: "",
      nationality: "",
      languages: [],
      description: "",
    });
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <select
        className="nati"
          id="nationality"
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
          required
        >
          <option className="option" value="uz">O'zbekiston</option>
          <option className="option" value="ru">Rossiya</option>
          <option className="option" value="us">AQSh</option>
        </select>
        <div className="label">
          <label>
            <input
            className="cheked"
              type="checkbox"
              name="languages"
              value="uzbekistan"
              checked={formData.languages.includes("uzbekistan")}
              onChange={handleChange}
            />
            Uzbekistan
          </label>
          <label>
            <input
              type="checkbox"
              name="languages"
              value="russia"
              checked={formData.languages.includes("russia")}
              onChange={handleChange}
            />
            Russia
          </label>
          <label>
            <input
              type="checkbox"
              name="languages"
              value="english"
              checked={formData.languages.includes("english")}
              onChange={handleChange}
            />
            English
          </label>
        </div>

        <textarea
        className="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <button type="submit">Save</button>
      </form>
      <Card users={users} onDelete={handleDelete} />
    </div>
  );
}

export default App;
