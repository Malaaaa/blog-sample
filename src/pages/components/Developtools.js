import React from "react";
function Developtools({ aws }) {
  return (
    <div>
      <p>
        <i>Development : </i>
        <a href='https://www.linux.org/' target='_blank' rel='noreferrer'>
          <img
            src='https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg'
            alt='linux'
            width='28'
            height='28'
          />
        </a>
        <a href='https://www.postgresql.org' target='_blank' rel='noreferrer'>
          <img
            src='https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg'
            alt='postgresql'
            width='28'
            height='28'
          />
        </a>
        <a href='https://spring.io/' target='_blank' rel='noreferrer'>
          <img
            src='https://www.vectorlogo.zone/logos/springio/springio-icon.svg'
            alt='spring'
            width='28'
            height='28'
          />
        </a>
        <a href='https://www.mysql.com/' target='_blank' rel='noreferrer'>
          <img
            src='https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg'
            alt='mysql'
            width='28'
            height='28'
          />
        </a>
        <a href='https://canvasjs.com' target='_blank' rel='noreferrer'>
          <img
            src='https://raw.githubusercontent.com/Hardik0307/Hardik0307/master/assets/canvasjs-charts.svg'
            alt='canvasjs'
            width='28'
            height='28'
          />
        </a>
        <a href='https://getbootstrap.com' target='_blank' rel='noreferrer'>
          <img
            src='https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg'
            alt='bootstrap'
            width='28'
            height='28'
          />
        </a>
        <a href='https://expressjs.com' target='_blank' rel='noreferrer'>
          <img
            src='https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg'
            alt='express'
            width='28'
            height='28'
          />
        </a>
        <a href='https://firebase.google.com/' target='_blank' rel='noreferrer'>
          <img
            src='https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg'
            alt='firebase'
            width='28'
            height='28'
          />
        </a>
        <a href='https://git-scm.com/' target='_blank' rel='noreferrer'>
          <img
            src='https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg'
            alt='git'
            width='28'
            height='28'
          />
        </a>
        <a href='https://aws.amazon.com/' target='_blank' rel='noreferrer'>
          <img src={aws} alt='aws' width='28' height='28' />
        </a>
      </p>
      <p>
        <i>Test and Operations : </i>
        <a href='https://www.selenium.dev' target='_blank' rel='noreferrer'>
          <img
            src='https://raw.githubusercontent.com/detain/svg-logos/780f25886640cef088af994181646db2f6b1a3f8/svg/selenium-logo.svg'
            alt='selenium'
            width='28'
            height='28'
          />
        </a>
        <a href='https://kubernetes.io' target='_blank' rel='noreferrer'>
          <img
            src='https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg'
            alt='kubernetes'
            width='28'
            height='28'
          />
        </a>
        <a href='https://icons8.com/' target='_blank' rel='noreferrer'>
          <img
            src='https://img.icons8.com/external-flaticons-lineal-color-flat-icons/344/external-agile-agile-flaticons-lineal-color-flat-icons-2.png'
            alt='kubernetes'
            width='28'
            height='28'
          />
        </a>
      </p>
    </div>
  );
}
export default Developtools;
