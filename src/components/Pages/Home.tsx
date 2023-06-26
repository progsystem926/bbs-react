import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { format } from "date-fns";
import { db } from "../../firebase";
import { LoginUsernameContext } from "../../App";
import { Post } from "../../types/post";
import Header from "../molecules/Header";
import PostList from "../molecules/PostList";
import NewPostModal from "../molecules/NewPostModal";

const Home = () => {
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState("");

  const postsRef = collection(db, "posts");

  const fetchPosts = async () => {
    const q = query(postsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const tmpPosts: Post[] = [];
    querySnapshot.docs.map((doc) => {
      const data = doc.data({ serverTimestamps: "estimate" });
      const post: Post = {
        id: data.id,
        content: data.content,
        username: data.username,
        createdAt: format(data.createdAt.toDate(), "yyyy-MM-dd HH:mm:ss"),
      };
      tmpPosts.push(post);
    });
    setPosts(tmpPosts);
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { loginUsername } = useContext(LoginUsernameContext);

  const onClickNewPost = () => {
    setNewPostOpen(true);
  };
  const handleCloseNewPost = () => {
    setNewPostOpen(false);
    setNewPostContent("");
  };

  const onClickSubmit = async () => {
    const uniqueId = uuidv4();
    await addDoc(postsRef, {
      id: uniqueId,
      content: newPostContent,
      username: loginUsername,
      createdAt: serverTimestamp(),
    });
    fetchPosts();
    setNewPostContent("");
    setNewPostOpen(false);
  };

  const onChangeNewPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPostContent(e.target.value);
  };

  return (
    <>
      <Header onClickNewPost={onClickNewPost} loginUsername={loginUsername} />
      <PostList posts={posts} />
      <NewPostModal
        open={newPostOpen}
        handleClose={handleCloseNewPost}
        onClickSubmit={onClickSubmit}
        newPost={newPostContent}
        onChangeNewPost={(e) => onChangeNewPost(e)}
      />
    </>
  );
};

export default Home;
