import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Read = () => {
  const { id } = useParams();
  const [student, setStudent] = useState([]);
  // console.log(student[0]?.id);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/read/${id}`)
      .then((res) => {
        console.log(res);
        setStudent(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="2-50 bg-white rounded p-3">
        <div className="p-2">
          <h2>Student Detail</h2>
          <h2>{student?.id}</h2>
          <h2>{student?.name}</h2>
          <h2>{student?.email}</h2>
        </div>
        <Link to={"/"} className="btn btn-primary me-2">
          Back
        </Link>
        <Link to={`/edit/${student?.id}`} className="btn btn-info">
          Edit
        </Link>
      </div>
    </div>
  );
};

export default Read;
