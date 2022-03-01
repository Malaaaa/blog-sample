import React, { useState } from 'react';
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
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            <Translate>
              Here is some notes
            </Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}
const Skills = () => {
  return(
  <div
    className='card card-background card--pointer margin-horiz--md margin-vert--md shadow--md'
  >
    <div className='card__header'>
      <h3>Skills</h3>
    </div>
    <div className='card__footer'>
      <pre>
        <strong>Program Language:</strong> Python, Java, HTML 5, CSS 3, JavaScript ES6, TypeScript, React Hooks, Redux, MySQL, Unix/Linux
        <br/>
        <strong>Version Control:</strong>  Git
        <br/>
        <strong>Develop tool:</strong> Docker
        <br/>
        <strong>Editors:</strong> Vim, VS Code, IntelliJ IDEA
        <br/>
        <strong>Automates tool:</strong> Selenium
        <br/>
        <strong>Activities: </strong> <a href='https://malaaa.mljlls.tech/'>https://malaaa.mljlls.tech/</a>（A blog that documents the learning process）

      </pre>
    </div>
  </div>)
}
const Projects = () => {
  return (
    <div className='card card-background card--pointer margin-horiz--md margin-vert--md shadow--md'>
      <div className='card__header'>
        <h3>Projects</h3>
      </div>
      <div className='card__footer'>
        <pre>
          <strong>Library control system:</strong> (based on Java spring-boot co-work another people on GitHub)
          <br/>
          • Use <strong>JAVA</strong> with <strong>spring-boot</strong> frame with JDBC.
          <br/>
          • Use <strong>Bootstrap 5</strong>and <strong>JavaScript</strong> to design the interface.
          <br/>
          • GitHub url: <a href='https://ninth-glider-325616.web.app'>Library control system</a>
          <br/>
          <strong>Private BI consultant company website:</strong>Designed a full-stack website by React and Bootstrap, and build API on Google Cloud Platform for Sum accounting company.    <br />
          <br/>
          • Use firebase as the back-end platform and build robot function APIs.
          <br/>
          • Design and build user interface by using <strong>React</strong> and use the <strong>Bootstrap</strong>Bootstrap styles.
          <br/>
          • Hosting url: <a href='https://ninth-glider-325616.web.app'>SumAccounting</a>
        </pre>
      </div>
    </div>)
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
          <div className={clsx("button button--secondary button--lg", styles.left)} onClick={() => { setOption(true) }}><strong>skills</strong></div>
          <div className={styles.middle}></div>
          <div className={clsx("button  button--secondary button--lg", styles.right)} onClick={() => { setOption(false) }}><strong>projects</strong></div>

        </div>
        <div className="container" >
          <div className={styles.description}>
            {option ? <Skills /> : <Projects />}

          </div>
        </div>
      </Layout>
    </main>
  );
}
