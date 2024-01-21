import "./assets/css/alert.css";
import PropTypes from "prop-types";
const Alert = (props) => {
  return <div>{props.alert && <div className={`alert ${props.alert.type}`}>{props.alert.msg}</div>}</div>;
};

export default Alert;

Alert.propTypes = {
  alert: PropTypes.string,
};
