<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="task.css">
    <title>Ahamed Aboo Adnan | Backend Developer</title>
    <link rel="icon" href="adnan pic.jpg">
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet">
    <script type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js">
</script>
<script type="text/javascript">
   (function(){
      emailjs.init({
        publicKey: "I2rGo68ZlLxJNmKO4",
      });
   })();
</script>
<script src="task.js"></script>

</head>
<body>
    <header class="header">
        <a href="" class="logo">Ahamed Adnan</a>
        <div class="bx bx-menu" id="menu-icon"></div>
        <div class="navbar position-fixed">
            <a href="#home" class="active">Home</a>
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#project">Project</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
        </div>
    </header>
    
    <section class="home" id="home">
        <div class="home-content">

            <h1>Hi, I'm <span>Ahamed Aboo Adnan</span></h1>

            <div class="text-animate">
                <h3>Laravel & PHP Backend Developer</h3>
            </div>

            <p>
                Backend Developer with expertise in PHP, Laravel, Django,
                MySQL, PostgreSQL, WordPress, and REST API development.
                Passionate about building scalable applications, secure
                authentication systems, and high-performance backend solutions
                following modern software development practices.
            </p>

            <div class="btn-box">
                <a href="Ahamed Aboo Adnan kp.pdf" class="btn" download>Download CV</a>                

                <a href="#contact" class="btn">Hire Me</a>
            </div>

        </div>

        <div class="home-sci">
            <a href="https://github.com/ahamedabu2003" target="_blank">
                <i class='bx bxl-github'></i>
            </a>

            <a href="https://www.instagram.com/__ahmd_adnan__/" target="_blank">
                <i class='bx bxl-instagram-alt'></i>
            </a>

            <a href="https://www.linkedin.com/in/ahamed-adnan-650070311/" target="_blank">
                <i class='bx bxl-linkedin'></i>
            </a>
        </div>
    </section>
    
    <section class="about" id="about">

    <h2 class="heading">About <span>Me</span></h2>

    <div class="about-container">

        <div class="about-img">
            <img src="ADNAN.jpg" alt="Ahamed Aboo Adnan">
        </div>

        <div class="about-content">

            <span class="about-tag">
                <h3>{{ $about->title }}</h3>
            </span>

            <h3>
                Building Scalable Web Applications &
                Modern Backend Solutions
            </h3>

            <p>
                <p>{{ $about->description }}</p>
            </p>

            <p>
                Passionate about clean code, performance optimization,
                and delivering high-quality software solutions that
                provide exceptional user experiences.
            </p>

            <div class="about-info">

                <div class="info-box">
                    <h4>2+</h4>
                    <span>Years Experience</span>
                </div>

                <div class="info-box">
                    <h4>10+</h4>
                    <span>Projects Completed</span>
                </div>

                <div class="info-box">
                    <h4>100%</h4>
                    <span>Commitment</span>
                </div>

            </div>

            <a href="#contact" class="btn">
                Let's Connect
            </a>

        </div>

    </div>

</section>


<!-- EXPERIENCE SECTION -->

<section class="experience" id="experience">

    <h2 class="heading">Work <span>Experience</span></h2>

    <div class="experience-row">

        <div class="experience-column">

            <div class="experience-box">

                <!-- Brandstrek -->

                <div class="experience-content">
                    <div class="content">

                        <div class="year">
                            <i class='bx bxs-calendar'></i>
                            Mar 2025 - Nov 2025
                        </div>

                        <h3>Software Developer | Brandstrek Coders</h3>

                        <p>
                            Developing and maintaining robust backend services
                            using Django, Django REST Framework, PostgreSQL,
                            and WebSockets for real-world business applications.
                            Building scalable REST APIs and optimizing database
                            performance for high-traffic systems.
                        </p>

                    </div>
                </div>

                <!-- Appziac -->

                <div class="experience-content">
                    <div class="content">

                        <div class="year">
                            <i class='bx bxs-calendar'></i>
                            Jul 2024 - Mar 2025
                        </div>

                        <h3>Backend Developer | Appziac Technologies</h3>

                        <p>
                            Developed scalable web applications using PHP and
                            Laravel. Optimized MySQL databases, improved
                            application performance, implemented MVC architecture,
                            and reduced production bugs through testing and
                            code reviews.
                        </p>

                    </div>
                </div>

                <!-- MaiTexa -->

                <div class="experience-content">
                    <div class="content">

                        <div class="year">
                            <i class='bx bxs-calendar'></i>
                            Dec 2023 - Mar 2024
                        </div>

                        <h3>Internship | MaiTexa Info Solutions</h3>

                        <p>
                            Developed a weather prediction system using Python,
                            machine learning, and external weather APIs.
                            Achieved approximately 85% prediction accuracy
                            through data analysis and forecasting models.
                        </p>

                    </div>
                </div>

            </div>

        </div>

    </div>

</section>

    <section class="project" id="project">
    <h2 class="heading">My <span>Projects</span></h2>
    <div class="project-row">
        <div class="project-column">

        <div class="project-box">
            <div class="project-content">
    <div class="content">

        <div class="year">
            <i class='bx bxs-calendar'></i> 2025
        </div>

        <h3>Rental Platform</h3>

        <p>
            Developed using Django, DRF, PostgreSQL and WebSockets.
            Features include vehicle listings, booking management,
            user registration and real-time updates.
        </p>

    </div>
</div>
        <div class="project-content">
    <div class="content">

        <div class="year">
            <i class='bx bxs-calendar'></i> 2025
        </div>

        <h3>Online Cart - E-Commerce Platform</h3>

        <p>
            Laravel based e-commerce platform with authentication,
            shopping cart, payment integration, product management,
            sales dashboard and advanced search functionality.
        </p>

    </div>
</div>

            <div class="project-content">
    <div class="content">

        <div class="year">
            <i class='bx bxs-calendar'></i> 2024
        </div>

        <h3>Weather Prediction System</h3>

        <p>
            Machine learning based weather prediction system using
            Python and weather APIs. Achieved approximately
            85% forecasting accuracy.
        </p>

    </div>
</div>
        </div>
    </div> 
</div>
</section>
   
      <section class="skills" id="skills">
        <h2 class="heading">My<span> Skills</span></h2>
        <div class="skills-row">
            <div class="skills-column">
                <h3 class="title">Coding Skills</h3>
                <br>
                <div class="skills-box">
                    <div class="skills-content">
                        <div class="progress">
                            <h3>PHP <span> 95%</span></h3>
                            <div class="bar"><span></span></div>
                        </div>
                        <div class="progress">
                            <h3>Laravel<span> 90%</span></h3>
                            <div class="bar"><span></span></div>
                        </div>
                        <div class="progress">
                            <h3>MySQL<span> 90%</span></h3>
                            <div class="bar"><span></span></div>
                        </div>
                        <div class="progress">
                            <h3>REST API<span> 95%</span></h3>
                            <div class="bar"><span></span></div>
                        </div>
                        
                        <div class="progress">
                            <h3>Python<span> 80%</span></h3>
                            <div class="bar"><span></span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="skills-column">
                <h3 class="title">Skills & Strength</h3>
                <br>
                <div class="skills-box">
                    <div class="skills-content">
                        <div class="progress">
                            <h3>Communication Skills<span> 100%</span></h3>
                            <div class="bar"><span></span></div>
                        </div>
                        <div class="progress">
                            <h3>Time Management<span> 100%</span></h3>
                            <div class="bar"><span></span></div>
                        </div>
                        <div class="progress">
                            <h3>Decision Making<span> 80%</span></h3>
                            <div class="bar"><span></span></div>
                        </div>
                        <div class="progress">
                            <h3>Team Work<span> 100%</span></h3>
                            <div class="bar"><span></span></div>
                        </div>
                        <div class="progress">
                            <h3>Punctuality<span> 100%</span></h3>
                            <div class="bar"><span></span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
  
    <section class="contact" id="contact">
        <h2 class="heading">Contact<span> Me!</span></h2>
        <form action="#">
            <div class="input-box">
                <div class="input-field">
                    <input type="text" placeholder="Full Name" required id="fname">
                    <span class="focus"></span>
                </div>

                <div class="input-field">
                    <input type="text" placeholder="Email Address" required id="ed">
                    <span class="focus"></span>
                </div>
            </div>

            <div class="input-box">
                <div class="input-field">
                    <input type="number" placeholder="Mobile Number" required id="mn">
                    <span class="focus"></span>
                </div>

                <div class="input-field">
                    <input type="text"  placeholder="Email Subject" required id="es">
                    <span class="focus"></span>
                </div>
            </div>
            <div class="textarea-field">
                <textarea name=""  id="textarea" cols="15" rows="10" placeholder="Your Message" required></textarea>
                <span class="focus"></span>
            </div>
            <div class="btn-box btns">
                <button type="submit" class="btn" onclick= "sentmail()">Submit</button>
            </div>
        </form>
    </section>
</html>