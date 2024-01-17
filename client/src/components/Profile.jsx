import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <>
      <div> <h1 className="text-3xl font-bold">this is the user profile page</h1>  {<Link to={`/new`}>+</Link>} </div>
    </>
  );
};

export default Profile;
