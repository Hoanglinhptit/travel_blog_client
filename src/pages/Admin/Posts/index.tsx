import DashBoard from "../Dashboard";
import Posts from "./PostContainer";
export default function index() {
  return (
    <>
      <DashBoard>
        <Posts />
      </DashBoard>
    </>
  );
}
