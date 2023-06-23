import React, { FC } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Post } from "../../types/post";

type Props = {
  posts: Post[];
};

const PostList: FC<Props> = (props) => {
  const { posts } = props;
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
              primary={post.content}
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
                    sx={{ textAlign: "right", display: "block" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {post.createdAt}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};

export default PostList;
