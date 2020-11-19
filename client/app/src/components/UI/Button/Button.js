import Button from "@material-ui/core/Button";

const button = (props) => {
  return (
    <Button variant="contained" color="primary" onClick={props.clicked}>
      {props.children}
    </Button>
  );
};

export default button;
