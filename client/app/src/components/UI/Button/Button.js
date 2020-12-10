import Button from "@material-ui/core/Button";

const button = (props) => {
  return (
    <Button
      variant={props.variant ? props.variant : "contained"}
      color="primary"
      onClick={props.clicked}
    >
      {props.children}
    </Button>
  );
};

export default button;
