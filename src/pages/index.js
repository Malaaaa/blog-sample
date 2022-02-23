import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title"><Translate>Welcome to my website</Translate></h1>
        <p className="hero__subtitle"><Translate>'Think Big，Think Long'</Translate></p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
              <Translate>
              How I Lived My Life in the Year 2021
              </Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <main>
      <Layout
        title={`Hello Stranger`}
        description="This is a resume and blog for my program">
        <HomepageHeader />
      </Layout>
    </main>
  );
}
