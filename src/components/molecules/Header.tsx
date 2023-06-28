import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
  onClickNewPost?: () => void;
  loginUsername: string;
};

const Header: FC<Props> = (props) => {
  const { onClickNewPost, loginUsername } = props;

  const onClickLogout = () => {
    localStorage.clear();
    document.location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to={`/`} style={{ textDecoration: "none", color: "inherit" }}>
              BBS
            </Link>
          </Typography>
          {loginUsername ? (
            <>
              <Button color="inherit" onClick={onClickNewPost}>
                New
              </Button>
              <Button color="inherit" onClick={onClickLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit">
                <Link
                  to={`/signup`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Sign up
                </Link>
              </Button>
              <Button color="inherit">
                <Link
                  to={`/login`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Login
                </Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
