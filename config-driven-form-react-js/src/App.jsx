import "./App.css";
import Form from "./components/Form";
import { schema } from "./utils/schema";

function App() {
  /**
   * CENTRAL CALLBACK: The Submission Destination
   * This function handles the final, fully validated data payload.
   * In a real-world app, this is where you would make an API call
   * (e.g., Axios/Fetch) to send data to your backend database server.
   */
  const onSubmit = (formData) => {
    // formData will be an object structured like:
    // { name: "John", email: "john@example.com", gender: "Male", ... }
    console.log("Form processing complete! Final data =", formData);
  };

  return (
    <div className="app">
      <h1>Config Driven Form</h1>

      {/* 
        INVERSION OF CONTROL:
        We inject the 'schema' blueprint configuration array and our local 
        'onSubmit' execution callback straight into the Form component.
        
        This makes the <Form /> component completely generic. You could pass it 
        a totally different schema array tomorrow (e.g., a 'LoginSchema'), and 
        it would render a completely different form without breaking a sweat!
      */}
      <Form schema={schema} onSubmit={onSubmit} />
    </div>
  );
}

export default App;
