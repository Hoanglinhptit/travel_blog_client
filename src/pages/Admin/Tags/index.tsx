import DashBoard from "../Dashboard";
import Posts from "./TagContainer";
export default function index() {
  return (
    <>
      <DashBoard>
        <Posts />
      </DashBoard>
    </>
  );
}
