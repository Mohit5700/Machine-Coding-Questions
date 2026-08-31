const Settings = ({ data, setData }) => {
  const { theme } = data;

  // Update theme setting choice
  const handleChange = (event) => {
    setData((prev) => ({
      ...prev,
      theme: event.target.value,
    }));
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          name="theme"
          value="dark"
          checked={theme === "dark"}
          onChange={handleChange}
        />
        Dark
      </label>

      <label>
        <input
          type="radio"
          name="theme"
          value="light"
          checked={theme === "light"}
          onChange={handleChange}
        />
        Light
      </label>
    </div>
  );
};

export default Settings;
