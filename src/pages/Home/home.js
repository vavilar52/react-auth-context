import { useAuth } from "../../context";

const Home = () => {
  const [, { signOut }] = useAuth();

  return (
    <div>
      <div>Hello there!</div>
      <button type="button" onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
};

export default Home;
