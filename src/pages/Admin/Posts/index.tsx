import DashBoard from "../Dashboard";
import Post from "src/pages/Admin/Posts/PostContainer";
export default function index() {
  return (
    <>
      <DashBoard>
        <Post />
      </DashBoard>
    </>
  );
}
