import React, { useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import ji from "../../static/img/Ji.png";
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header>
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
            <h3>Skills</h3>
            <strong>Program Language</strong>
            <p><i>Frontend side : </i>HTML CSS JavaScript</p>
            <div>
            <div>90%</div>
            </div>
            <p><i>Backend side : </i>Java C++ Python C#</p>
            <div>
            <div>70%</div>
            </div>
            <strong>Development Tools</strong>
            <p><i>Development : </i>
              ASP.NET MVC / Core, Spring Boot,
              React, Redux, MySQL, Git, AWS,</p>
            <p><i>Test and Operations : </i>Jenkins,  Kubernetes, K8s, Distributed System,
               Agile Development (Scrum)</p>
          </div>
          <div className={styles.right}></div>


        </div>
      </div>
    </header>
  );
}
export default function Home() {
  const [option, setOption] = useState(true);

  return (
    <main>
      <Layout
        title={`Liangji Ma Resume`}
        description="This is a resume and blog for my program">
        <HomepageHeader />
        <div className={styles.warp}>

        </div>
        <div className="container" >
          <div className={styles.description}>
          </div>
        </div>
      </Layout>
    </main>
  );
}
