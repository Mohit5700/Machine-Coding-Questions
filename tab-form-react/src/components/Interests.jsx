const Interests = ({ data, setData, errors }) => {
  const { interests } = data;

  // Handles adding/removing items in the interests array using checkboxes
  const handleChange = (event) => {
    const { name, checked } = event.target;

    setData((prev) => ({
      ...prev,
      // If checked: append option; If unchecked: filter option out
      interests: checked
        ? [...prev.interests, name]
        : prev.interests.filter((interest) => interest !== name),
    }));
  };

  return (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            name="coding"
            checked={interests.includes("coding")}
            onChange={handleChange}
          />
          Coding
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="music"
            checked={interests.includes("music")}
            onChange={handleChange}
          />
          Music
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="reading"
            checked={interests.includes("reading")}
            onChange={handleChange}
          />
          Reading
        </label>
      </div>

      {/* Render validation error if array is empty */}
      {errors.interests && <span className="error">{errors.interests}</span>}
    </div>
  );
};

export default Interests;
