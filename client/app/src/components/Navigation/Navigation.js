import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuColor: {
    backgroundColor: "#1282b3",
    color: "#f9f9f9",
  },
  title: {
    flexGrow: 1,
  },
}));

const Navigation = (props) => {
  const classes = useStyles();

  return (
    <AppBar position="static" color="transparent" className={classes.menuColor}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        ></IconButton>
        <Typography variant="h6" className={classes.title}>
          Investor Dashboard
        </Typography>
        <Button color="inherit" component={NavLink} to="/" exact>
          Home
        </Button>
        <Button color="inherit" component={NavLink} to="/scan">
          Scan
        </Button>
        <Button color="inherit" component={NavLink} to="/analysis">
          Analysis
        </Button>
        <Button color="inherit" component={NavLink} to="/portfolio">
          Portfolio
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
