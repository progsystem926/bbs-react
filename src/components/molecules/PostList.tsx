import React, { FC, useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Post } from "../../types/post";
import { LoginUsernameContext } from "../../App";

type Props = {
  posts: Post[];
  onClickDelete: (id: string) => void;
};

const PostList: FC<Props> = (props) => {
  const { posts, onClickDelete } = props;
  const { loginUsername } = useContext(LoginUsernameContext);
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      {posts.map((post) => (
        <React.Fragment key={post.id}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={
                <Typography
                  sx={{ fontSize: "1.2em", overflowWrap: "break-word" }}
                >
                  {post.content}
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {post.username}
                  </Typography>
                  <Typography
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      mb: 1,
                      mr: 1,
                    }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {post.createdAt}
                  </Typography>
                </React.Fragment>
              }
            />
            {loginUsername === "admin" && (
              <Button
                variant="outlined"
                size="small"
                onClick={() => onClickDelete(post.id)}
                sx={{ postition: "absolute", top: 0, right: 0 }}
              >
                Delete
              </Button>
            )}
          </ListItem>
          <Divider component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};

export default PostList;
