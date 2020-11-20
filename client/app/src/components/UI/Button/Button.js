import Button from "@material-ui/core/Button";

const button = (props) => {
  return (
    <Button variant="contained" color="primary">
      {props.children}
    </Button>
  );
};

export default button;
