import { makeStyles } from "@material-ui/core/styles";
import Inputs from "@material-ui/core/Input";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const Input = (props) => {
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Inputs
        placeholder="Ticker"
        inputProps={{ "aria-label": "description" }}
        onChange={props.changed}
      />
    </form>
  );
};

export default Input;
