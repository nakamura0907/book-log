import AntRate, { RateProps } from "@components/ui/rate";

import styles from "./index.module.css";

const Rate = (props: RateProps) => {
  const { className, ...rest } = props;
  return <AntRate {...rest} className={styles.rate} />;
};

export default Rate;
