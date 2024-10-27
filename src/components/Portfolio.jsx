import React, { useState, useEffect, useRef } from 'react';
import { Github, Mail, Phone, Database, Code, Brain, School, Menu, X } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Refs for sections
  const homeRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const educationRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const scrollToSection = (section) => {
    const refs = {
      home: homeRef,
      projects: projectsRef,
      skills: skillsRef,
      education: educationRef
    };

    if (refs[section]?.current) {
      refs[section].current.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(section);
      setIsMobileMenuOpen(false); // Close mobile menu after clicking
    }
  };

  // Intersection Observer to update active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = [homeRef, projectsRef, skillsRef, educationRef];
    sections.forEach((section) => {
      if (section.current) {
        observer.observe(section.current);
      }
    });

    return () => sections.forEach((section) => {
      if (section.current) {
        observer.unobserve(section.current);
      }
    });
  }, []);

  const projects = [
    {
      title: "Image-based Song Recommendation System",
      description: "A system that analyzes facial expressions to recommend personalized songs using Vision APIs and K-means clustering.",
      technologies: ["Python", "OpenCV", "Keras", "TensorFlow", "Vision API"],
      status: "In Progress"
    },
    {
      title: "Task Management System",
      description: "Distributed task management system using Raft consensus algorithm for fault tolerance and consistency.",
      technologies: ["Python", "MySQL", "Flask", "Hypercorn", "Raftos"]
    },
    {
      title: "Blockchain Attendance System",
      description: "Decentralized attendance management platform using Ethereum blockchain and smart contracts.",
      technologies: ["Solidity", "Ethereum", "MetaMask"]
    }
  ];

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <h1 className="text-6xl font-bold text-white animate-pulse">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white" onMouseMove={handleMouseMove}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-sm z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="logo-container">
              <h1 className="text-2xl font-bold cursor-pointer">
                VIRUPAKSHI.DEV
                <div className="shine"></div>
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              {['home', 'projects', 'skills', 'education'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`uppercase tracking-wider hover:text-purple-400 transition-all ${
                    activeSection === section ? 'text-purple-400' : ''
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-4">
                {['home', 'projects', 'skills', 'education'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`uppercase tracking-wider hover:text-purple-400 transition-all ${
                      activeSection === section ? 'text-purple-400' : ''
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" ref={homeRef} className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.3) 0%, transparent 60%)`
          }}
        ></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-6xl md:text-8xl font-bold animate-fade-in">
              K Virupakshi
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 animate-slide-up">
              Computer Science Student & Developer
            </p>
            <div className="flex justify-center space-x-6">
              <a href="tel:+919019341637" className="hover:text-purple-400 transition-colors">
                <Phone className="w-8 h-8" />
              </a>
              <a href="mailto:virupakshivijji@gmail.com" className="hover:text-purple-400 transition-colors">
                <Mail className="w-8 h-8" />
              </a>
              <Github className="w-8 h-8 hover:text-purple-400 transition-colors cursor-pointer" />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-neutral-800 p-6 rounded-lg"
              >
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                {project.status && (
                  <span className="bg-purple-600/50 px-3 py-1 rounded-full text-sm mb-4 inline-block">
                    {project.status}
                  </span>
                )}
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-purple-900/50 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Code className="w-6 h-6 text-purple-400" />
                <div>
                  <h3 className="font-bold mb-2">Languages</h3>
                  <p className="text-gray-400">C/C++, Python, HTML, CSS, JavaScript</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Database className="w-6 h-6 text-purple-400" />
                <div>
                  <h3 className="font-bold mb-2">Databases</h3>
                  <p className="text-gray-400">MySQL</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Brain className="w-6 h-6 text-purple-400" />
                <div>
                  <h3 className="font-bold mb-2">Soft Skills</h3>
                  <p className="text-gray-400">Creativity, Self-learning, Presentation, Teamwork</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" ref={educationRef} className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12">Education</h2>
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <School className="w-6 h-6 text-purple-400 mt-1" />
              <div>
                <h3 className="text-xl font-bold">PES University (RR CAMPUS)</h3>
                <p className="text-purple-400">2021 - 2025</p>
                <p className="text-gray-400">BTech, Computer Science and Engineering</p>
                <p className="text-gray-400">CGPA: 7.6</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <School className="w-6 h-6 text-purple-400 mt-1" />
              <div>
                <h3 className="text-xl font-bold">Alvas PU College</h3>
                <p className="text-purple-400">March 2021</p>
                <p className="text-gray-400">Higher Secondary School</p>
                <p className="text-gray-400">Percentage: 90.3%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .logo-container {
          position: relative;
          overflow: hidden;
        }

        .logo-container h1 {
          position: relative;
          z-index: 1;
        }

        .shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            135deg,
            transparent 0%,
            rgba(139, 92, 246, 0.4) 50%,
            transparent 100%
          );
          animation: shine-effect 3s infinite;
          transform: skewX(-20deg);
        }

        @keyframes shine-effect {
          from {
            left: -100%;
          }
          to {
            left: 200%;
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slideUp 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;