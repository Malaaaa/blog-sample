import { Developtools } from './components/Developtools';
import React, { useState } from 'react';
import clsx from 'clsx';
import csharp from '../../static/img/icons8-c-sharp-logo-48.png';
import aws from '../../static/img/icons8-amazon-web-services-32.png';
import Layout from '@theme/Layout';
import ji from "../../static/img/Ji.png";
import styles from './index.module.css';
import Frontendab from './components/Frontendab';
import Backendab from './components/Backendab';

export default function Home() {

  return (
    <main>
      <Layout
        title={`Liangji Ma Resume`}
        description="This is a resume and blog for my program">
        <div className="container">
          <div className={styles.warp}>
            <div className={styles.left}>
              <img src={ji} className={styles.img} />
              <h2>Liangji Ma</h2>
              <div>
                <p className='work'>Software Developer Engineer</p>
                <p className='location'>Toronto, CA</p>
                <p className='email'>liangji_ma@hotmail.com</p>
                <p className='linkedin'>linkedin.com/in/liangji-ma</p>
              </div>
              <hr />
              <h3 className={styles.skill}>Skills</h3>
              <strong>Program Language</strong>
              <>
              <Frontendab />
              <Backendab csharp={csharp} />
              </>
              <strong>Development Tools</strong>
              <Developtools   aws={aws}  />
            </div>
            <div className={styles.right}></div>
            <div className={styles.education}>

            </div>
            <div className={styles.experience}>

            </div>

          </div>
        </div>
      </Layout>
    </main>
  );
}
