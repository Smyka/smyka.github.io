 <script>
        // Data for each project
        const projectData = {
            "project1": {
                title: "E-commerce Platform Redesign",
                image: "https://placehold.co/800x600/007bff/ffffff?text=E-commerce+Platform+Details",
                portfolioDetails: "Led the front-end redesign and development of a high-traffic e-commerce website, improving user engagement by 20% and conversion rates by 15%. Implemented a new component library and optimized image loading to ensure a seamless shopping experience. Focused on modular and reusable code practices.",
                experience: [
                    "Senior Web Developer, Tech Solutions Inc. (Jan 2022 – Present): Spearheaded front-end architecture, collaborated with UX/UI designers, and integrated RESTful APIs.",
                    "Contributed to A/B testing and performance monitoring to fine-tune user experience and identify key areas for improvement in conversion funnels."
                ],
                skills: ["React.js", "Redux", "Sass", "Webpack", "RESTful APIs", "Performance Optimization", "A/B Testing", "Agile Methodologies", "User Experience (UX)"]
            },
            "project2": {
                title: "Mobile App UI/UX Development",
                image: "https://placehold.co/800x600/28a745/ffffff?text=Mobile+App+UI+Details",
                portfolioDetails: "Designed and developed the user interface for a cross-platform mobile application using React Native. Focused on intuitive navigation and a seamless user experience across iOS and Android platforms, enhancing user retention by 10%.",
                experience: [
                    "Junior Web Developer, Creative Minds Agency (Mar 2020 – Dec 2021): Worked on mobile-first design, implemented custom UI components, and ensured cross-device compatibility.",
                    "Participated in iterative user testing sessions and integrated feedback to refine the application's usability and visual appeal."
                ],
                skills: ["React Native", "JavaScript", "Expo", "UI/UX Design", "Mobile Development", "Git", "Figma", "User Research"]
            },
            "project3": {
                title: "Interactive Data Dashboard",
                image: "https://placehold.co/800x600/dc3545/ffffff?text=Data+Dashboard+Details",
                portfolioDetails: "Developed an interactive data visualization dashboard for internal business intelligence, enabling real-time tracking of key metrics and improving data-driven decision-making speed by 30%. Integrated with a PostgreSQL backend and ensured robust data integrity.",
                experience: [
                    "Senior Web Developer, Tech Solutions Inc. (Jan 2022 – Present): Built scalable data fetching mechanisms and interactive charts using D3.js and Chart.js, ensuring data accuracy and responsiveness across various datasets.",
                    "Optimized database queries and implemented caching strategies for improved dashboard load times."
                ],
                skills: ["D3.js", "Vue.js", "Node.js", "Express.js", "PostgreSQL", "Data Visualization", "API Development", "SQL", "Database Management"]
            },
            "project4": {
                title: "Custom Web Application",
                image: "https://placehold.co/800x600/ffc107/ffffff?text=Web+App+Details",
                portfolioDetails: "Developed a custom web application from scratch for a client in the education sector, managing the full development lifecycle from requirements gathering to deployment. Features included user authentication, content management, and reporting.",
                experience: [
                    "Lead Developer, Freelance (2019-2020): Managed end-to-end development, client communication, and project milestones. Delivered the project on time and within budget.",
                    "Troubleshoot and resolved complex issues, ensuring high application stability and security."
                ],
                skills: ["HTML5", "CSS3", "JavaScript", "jQuery", "PHP", "MySQL", "Full-Stack Development", "Project Management", "Security Best Practices"]
            },
            "project5": {
                title: "Backend API Development",
                image: "https://placehold.co/800x600/6f42c1/ffffff?text=API+Dev+Details",
                portfolioDetails: "Designed and implemented a high-performance RESTful API for a new mobile gaming application, handling millions of requests per day. Focused on scalability, security, and maintainability.",
                experience: [
                    "Backend Developer, Gaming Innovations (2018-2019): Developed and maintained core API services, optimized database interactions, and implemented robust error handling.",
                    "Collaborated with front-end teams to ensure smooth integration and optimal data flow."
                ],
                skills: ["Node.js", "Express.js", "MongoDB", "RESTful APIs", "JWT Authentication", "Unit Testing", "Microservices", "Scalability", "DevOps (basic)"]
            }
        };

        // Get elements for the lightbox
        const projectLightbox = document.getElementById('projectLightbox');
        const lightboxProjectImage = document.getElementById('lightboxProjectImage');
        const lightboxProjectTitle = document.getElementById('lightboxProjectTitle');
        const lightboxPortfolioDetails = document.getElementById('lightboxPortfolioDetails');
        const lightboxExperienceList = document.getElementById('lightboxExperienceList');
        const lightboxSkillsList = document.getElementById('lightboxSkillsList');
        const projectCards = document.querySelectorAll('.w3-card-project');
        const downloadPdfButton = document.getElementById('downloadPdfButton');

        // Dark Mode Toggle elements
        const darkModeToggle = document.getElementById('darkModeToggle'); // Get the dynamically created button

        const htmlElement = document.documentElement; // Represents the <html> tag
        const particlesJsContainer = document.getElementById('particles-js'); // Get the dynamically created particles container

        // Function to set the theme based on the 'dark' class
        function setTheme(isDark) {
            if (isDark) {
                htmlElement.classList.add('dark');
                localStorage.setItem('theme', 'dark'); // Save preference to local storage
                // Initialize particles.js when dark mode is active
                if (typeof particlesJS !== 'undefined') { // Check if particlesJS is loaded
                    particlesJS('particles-js', {
                        "particles": {
                            "number": {
                                "value": 108, // Number of particles
                                "density": {
                                    "enable": true,
                                    "value_area": 800
                                }
                            },
                            "color": {
                                "value": ["#ff0000", "#00ff00", "#800080"] // Red, Green, Purple particles
                            },
                            "shape": {
                                "type": "circle",
                                "stroke": {
                                    "width": 0,
                                    "color": "#000000"
                                },
                                "polygon": {
                                    "nb_sides": 5
                                }
                            },
                            "opacity": {
                                "value": 0.5,
                                "random": false,
                                "anim": {
                                    "enable": false,
                                    "speed": 1,
                                    "opacity_min": 0.1,
                                    "sync": false
                                }
                            },
                            "size": {
                                "value": 3,
                                "random": true,
                                "anim": {
                                    "enable": false,
                                    "speed": 40,
                                    "size_min": 0.1,
                                    "sync": false
                                }
                            },
                            "line_linked": {
                                "enable": true,
                                "distance": 150,
                                "color": "#ffffff", // Lines remain white for contrast
                                "opacity": 0.4,
                                "width": 1
                            },
                            "move": {
                                "enable": true,
                                "speed": 6,
                                "direction": "none",
                                "random": false,
                                "straight": false,
                                "out_mode": "out",
                                "bounce": false,
                                "attract": {
                                    "enable": false,
                                    "rotateX": 600,
                                    "rotateY": 1200
                                }
                            }
                        },
                        "interactivity": {
                            "detect_on": "canvas",
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": "grab"
                                },
                                "onclick": {
                                    "enable": true,
                                    "mode": "push"
                                },
                                "resize": true
                                },
                            "modes": {
                                "grab": {
                                    "distance": 140,
                                    "line_linked": {
                                        "opacity": 1
                                    }
                                },
                                "bubble": {
                                    "distance": 400,
                                    "size": 40,
                                    "duration": 2,
                                    "opacity": 8,
                                    "speed": 3
                                },
                                "repulse": {
                                    "distance": 200,
                                    "duration": 0.4
                                },
                                "push": {
                                    "particles_nb": 4
                                },
                                "remove": {
                                    "particles_nb": 2
                                }
                            }
                        },
                        "retina_detect": true
                    });
                }
            } else {
                htmlElement.classList.remove('dark');
                localStorage.setItem('theme', 'light'); // Save preference to local storage
                // Destroy particles.js instance when light mode is active
                if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
                    pJSDom[0].pJS.fn.vendors.destroypJS();
                    pJSDom = []; // Clear the instance
                }
            }
        }

        // Check for saved theme preference on page load
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setTheme(true);
        } else if (savedTheme === 'light') {
            setTheme(false); // Explicitly set light theme if saved
        } else {
            // Default to light theme if no preference is saved
            setTheme(false);
        }

        // Add event listener to the dark mode toggle button
        darkModeToggle.addEventListener('click', () => {
            // Toggle the 'dark' class on the html element
            const isCurrentlyDark = htmlElement.classList.contains('dark');
            setTheme(!isCurrentlyDark); // Invert the current theme
        });


        // Add event listeners to each project card
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.getAttribute('data-project-id');
                const data = projectData[projectId];

                if (data) {
                    lightboxProjectImage.src = data.image;
                    lightboxProjectTitle.textContent = data.title;
                    lightboxPortfolioDetails.textContent = data.portfolioDetails;

                    // Clear previous lists
                    lightboxExperienceList.innerHTML = '';
                    lightboxSkillsList.innerHTML = '';

                    // Populate Experience list
                    data.experience.forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = item;
                        lightboxExperienceList.appendChild(li);
                    });

                    // Populate Skills list
                    data.skills.forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = item;
                        lightboxSkillsList.appendChild(li);
                    });

                    projectLightbox.style.display = 'block'; // Show the lightbox
                }
            });
        });

        // Close modal when clicking outside of the content (W3.CSS default behavior)
        window.onclick = function(event) {
            if (event.target == projectLightbox) {
                projectLightbox.style.display = "none";
            }
        }

        // Add event listener for the Download PDF button
        downloadPdfButton.addEventListener('click', () => {
            window.print(); // Triggers the browser's print dialog, from which user can save as PDF
        });
    </script>