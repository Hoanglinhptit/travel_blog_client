import DashBoard from "../Dashboard";
import Users from "./UserContainer";
export default function index() {
  return (
    <>
      <DashBoard>
        <Users />
      </DashBoard>
    </>
  );
}
