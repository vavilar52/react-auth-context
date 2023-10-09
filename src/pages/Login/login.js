import { Navigate } from "react-router-dom";
import { useAuth } from "../../context";
import { ROUTE } from "../../constants/routes";

const Login = () => {
  const [{ loading, token }, { signIn }] = useAuth();

  if (token) {
    return <Navigate to={ROUTE.HOME} replace />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signIn();
      }}
    >
      <label>
        Username
        <input type="text" required />
      </label>
      <label>
        Password
        <input type="password" required minLength={8} />
      </label>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default Login;
