import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  console.log({ data });
  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/delete/${id}`)
      .then((res) => {
        setData(res.data);
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <h2>Student list</h2>

        <div className="d-flex justify-content-end">
          <Link to={"/create"} className="btn btn-success">
            Create +
          </Link>
        </div>
        {data.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((student, index) => {
                return (
                  <tr key={index}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>
                      <Link
                        to={`/read/${student.id}`}
                        className="btn btn-sm btn-info"
                      >
                        Read
                      </Link>
                      <Link
                        to={`/edit/${student.id}`}
                        className="btn btn-sm btn-primary mx-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {data.length <= 0 && (
          <div className="d-flex justify-content-center">
            <p>There are no students</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
