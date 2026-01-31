
import { useState } from "react";
import EnquiryForm from "../components/EnquiryForm.jsx";


const Home = () => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <div>
      <button onClick={() => setOpenForm(true)}>
        Open Enquiry Form
      </button>

      {openForm && <EnquiryForm />}
    </div>
  );
};

export default Home;