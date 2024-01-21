import classNames from "classnames/bind";
import styles from "./style.module.css";
const cx = classNames.bind(styles);

const Loading = (props) => {
    return (
        <div className={cx("overlay")}>
            <div className={cx("loader")}></div>
        </div>
    );
};

export default Loading;
