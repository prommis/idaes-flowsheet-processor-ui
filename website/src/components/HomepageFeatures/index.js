import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'IDAES',
    Img: require('@site/static/img/idaes-logo.png').default,
    description: (
      <>
        IDAES Flowsheets
      </>
    ),
    pageName: 'idaes',
  },
  {
    title: 'PrOMMiS',
    Img: require('@site/static/img/prommis-logo.png').default,
    description: (
      <>
        PRoMMiS Flowsheets
      </>
    ),
    pageName: 'prommis',
  },
  {
    title: 'WaterTAP',
    Img: require('@site/static/img/watertap-logo.png').default,
    description: (
      <>
        WaterTAP Flowsheets
      </>
    ),
    pageName: 'watertap',
  },
];

function Feature({Img, title, description, pageName}) {
  let pageLink = "docs/Download/" + pageName;
  return (
    <div className={clsx('col col--4')}>
      <a href={pageLink} className={styles.featureLink}>
      <div className="text--center">
      <img src={Img} role="img" className={styles.featureImg} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
      </a>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
