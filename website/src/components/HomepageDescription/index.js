import styles from './styles.module.css';

export default function HomepageDescription() {
  return (
    <div className={styles.container}>
      The IDAES Flowsheet Processor provides a zero-code way of running selected <a href='https://idaes.org/' target='_blank'>IDAES</a> flowsheets in a graphical user interface. Downloads with pre-loaded dependencies and flowsheets for <a href='https://github.com/prommis/prommis' target='_blank'>PrOMMIS</a>, <a href='https://github.com/idaes/idaes-pse' target='_blank'>IDAES</a>, and <a href='https://github.com/watertap-org/watertap' target='_blank'>WaterTAP</a> can be found under the appropriate project link below.
    </div>
  );
}
