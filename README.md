<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a>
    <img src="images/logo.png" alt="Logo" height="150">
  </a>

</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#local-deployment">Local Deployment</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Hello developers! I hope your term is going well. This document will server as an entry point into the project, and provide a brief overview of what we have implemented so far.

As you are probably aware, BC CAHS is looking to digitialize their sample registration process. Currently, BC CAHS accepts all sample submissions through a physical form. This form is then manually transposed into an excel sheet, which houses all information about the submitted sample and lab results. BC CAHS aims to replace this excel based system with a database that can be filtered, effectively searched through and edited. 

Through-out our project term, our team’s focus was  on designing a centralized database that can be used by BC CAHS lab workers. Our emphasis was on implementing this database, basic user authentication and a front-end component which allows CAHS staff to filter, search and edit existing database elements. You will continue to build upon these existing features! 

Key Development Points:

- Our database is built on PostgreSQL. We suggest checking out the database folder, and looking through the migration file to see our current DB structure. PGadmin is what we used for testing and development.
- Docker is being used to ensure consistency across all development environments.  Make sure to install Docker Desktop.
- Hope you like Express as a backend framework!
- React is used in the frontend. We tried to keep things as contemporary as possible. Material UI is used through-out for styling.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With
<br>
<a>
    <img src="images/structure_diagram.png" alt="Logo" height="150">
</a>

- [React][react-url]
- [Docker][docker-url]
- [PostgreSQL][postgres-url]
- [Express.JS][express-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

If you have never used Docker before, it may feel somewhat intimidating. But once you get used to using it, Docker becomes a very useful and valuable developmental tool. This section will run through how to get your project up and running by using docker.

### Prerequisites

Make sure you have all the nessecary tools downloaded.  

- npm
  ```sh
  npm install npm@latest -g
  ```
- express
  ```sh
  npm install express
  ```
- [Downlod Docker!][docker-url]

### Local Deployment

_Once you have both the code base and nessecary programs downloaded on your machine, it is time to start devloping!_

1. Open a terminal, within your code base, and run
   ```sh
   docker-compose build
   ```
   This command builds all services, including any database migrations. It an essential step!

2. Now your sevices are built, run docker-compose up.
   ```sh
   docker-compose up
   ```
   This command creates, starts and attaches containers for a service. It handles configuration steps outlined in the dockerfile, like npm start, automatically.

3. The project is now running! Open http://localhost:3000/login. As of right now, anyone can sign up to create an account. Your server will be running on http://localhost:8000 . 
 
4. Hot reloads are supported. Changes to your code, once saved, will prompt a reload and rendered.

5. Once you are ready to stop development, be sure to run the following command:
   ```sh
   docker-compose build
   ```
   This command stops and removes containers, networks, volumes and other images created by the docker-compose up command. 

6. If you run into issues with you a corrupted database and need to locally delete your db folder, just follow these steps again! 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

The functionality of the site is pretty straight forward. We'd encourage you to play around with the site before you begin further development. Best place to start would be signing up and logging in (authorization code can be found ). You'll be greeted by the following page:
<div align=center>
<a>
    <img src="images/sample_home.png" alt="Logo" height="150">
</a>
</div>

No data has been inputted yet. The Frontend code can be found here --> client\src\app\pages\Home\Sample. Let's start be logging some data. Our submission form, and all provided fields, are based upon the specifications of the BC CAHS. 

<div align=center>
<a>
    <img src="images/loginSamplePage.png" alt="Logo" height="150">
</a>
</div>

If you want to take a look at the code, we suggest checking out --> client\src\app\pages\Home\components\SampleInput.js. Be sure to also look into the server side of things to see the connection between frontend and backend --> server\router\submission.js!

After you have logged in data, it'll be rendered in both the sample landing page and in the status page. Check out the code for the Status page here --> client\src\app\pages\Home\Status. 

Mess around with inputting data, and applying different fields on the pages mentioned above. We've tried our best to document the code through-out the development, so hopefully you will be able to dive in quickly and build upon the work that we have started.

From our understanding, alot of the work you will tackle will centered on data visualization for the Data/Report Templates. We'd recommend looking closely at the implementation of our Status page code, and understanding the way in which data is being grabbed from postgres.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Structure and Create Database
- [x] Accept and render live data
- [x] Bar graphical representation of data
- [x] User Authentication (Login, Log-out, session persistence)
- [ ] Further User Authentication (ie. admin privledges, limited accounts)
- [ ] Additional data representation fields
- [ ] To be determined by BC CAHS
- [ ] Deployment on BC CAHS Arbutus Cloud
- [ ] To be determined by use

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

I hope this section is not redundant! We used the following git work-flow in our developmental process: 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[postgres.js]: https://webapp.io/blog/content/images/2019/11/postgres.png
[postgres-url]: https://www.postgresql.org/
[docker.dev]:https://miro.medium.com/max/1200/1*9CnqScCEkVJlvOXXXzvwhg.jpeg
[docker-url]: https://www.docker.com/
[express-url]: https://expressjs.com/
[vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[vue-url]: https://vuejs.org/
[angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[angular-url]: https://angular.io/
[svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[svelte-url]: https://svelte.dev/
[laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[laravel-url]: https://laravel.com
[bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[bootstrap-url]: https://getbootstrap.com
[jquery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[jquery-url]: https://jquery.com
