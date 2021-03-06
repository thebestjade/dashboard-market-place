import UserContext from "./UserContext";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function ProvedorUsuario(props) {
  const [user, setUser] = useLocalStorage([], 'user');

  return (
    <UserContext.Provider value={{ user, setUser}}>
      {props.children}
    </UserContext.Provider>
  );
}
