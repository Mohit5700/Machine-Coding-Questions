const Profile = ({ data, setData, errors }) => {
  // Destructure profile-specific fields from shared form data
  const { name, age, email } = data;

  // Single dynamic change handler using field 'name' attributes
  const handleDataChange = (event) => {
    const { name, value } = event.target;

    // Immutably update central form data based on input key
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div>
        <label>Name: </label>
        <input
          name="name"
          type="text"
          value={name}
          onChange={handleDataChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div>
        <label>Age: </label>
        <input
          name="age"
          type="number"
          value={age}
          onChange={handleDataChange}
        />
        {errors.age && <span className="error">{errors.age}</span>}
      </div>

      <div>
        <label>Email: </label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={handleDataChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
    </div>
  );
};

export default Profile;
