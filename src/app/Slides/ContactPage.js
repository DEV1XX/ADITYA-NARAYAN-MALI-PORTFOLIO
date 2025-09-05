"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ContactPage = () => {
  const containerRef = useRef(null);
  const contactTitleRef = useRef(null);
  const contactFormRef = useRef(null);
  const contactInfoRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // EmailJS Configuration with fallback and debugging
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "portfolioContactService";
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "ContactServiceTemplate";
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "N57sWKxzY5UaOVYi-";
  const EMAILJS_AUTO_REPLY_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID || "AutoReplyTemp";

  // Debug logging (remove in production)
  useEffect(() => {
    console.log("EmailJS Config Debug:");
    console.log("Service ID:", EMAILJS_SERVICE_ID);
    console.log("Template ID:", EMAILJS_TEMPLATE_ID);
    console.log("Public Key:", EMAILJS_PUBLIC_KEY ? "Present" : "Missing");
    console.log("Auto Reply Template ID:", EMAILJS_AUTO_REPLY_TEMPLATE_ID);
  }, []);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const contactInfo = [
    {
      icon: "📧",
      label: "EMAIL",
      value: "adityanarayanmali2020@gmail.com",
      link: "mailto:adityanarayanmali2020"
    },
    {
      icon: "📱",
      label: "PHONE",
      value: "+91 7749081504",
      link: "tel:+7749081504"
    },
    {
      icon: "📍",
      label: "LOCATION",
      value: "Bhubaneswar, Odisha",
      link: ""
    },
    {
      icon: "💼",
      label: "LINKEDIN",
      value: "https://linkedin.com/in/aditya-narayan-mali",
      link: "https://linkedin.com/in/aditya-narayan-mali"
    }
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      url: "https://github.com/DEV1XX",
      color: "hover:text-gray-300"
    },
    {
      name: "LinkedIn",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      url: "https://www.linkedin.com/in/aditya-narayan-mali/",
      color: "hover:text-blue-400"
    },
    {
      name: "YouTube",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      url: "",
      color: "hover:text-red-500"
    },
    {
      name: "Instagram",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      url: "https://www.instagram.com/the_aditya_narayan/",
      color: "hover:text-pink-400"
    }
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const timer = setTimeout(() => {
      gsap.set(containerRef.current, { opacity: 1, visibility: 'visible' });

      const ctx = gsap.context(() => {
        // Set initial state
        gsap.set(contactTitleRef.current, { opacity: 0, scale: 0 });
        gsap.set(containerRef.current.querySelectorAll(".contact-item"), { opacity: 0, y: 100 });

        // Title animation
        gsap.to(contactTitleRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none none",
            id: "contact-page-title-animation",
            refreshPriority: 1,
          },
        });

        // Contact items animation
        const contactItems = containerRef.current.querySelectorAll(".contact-item");
        if (contactItems.length > 0) {
          gsap.to(contactItems, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "back.out(1.2)",
            stagger: {
              amount: 0.8,
              from: "start",
            },
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play none none none",
              id: "contact-page-items-stagger-animation",
              refreshPriority: 1,
            },
          });
        }

        ScrollTrigger.refresh();
      }, containerRef);

      return () => {
        ctx.revert();
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars && (
            trigger.vars.id === "contact-page-title-animation" || 
            trigger.vars.id === "contact-page-items-stagger-animation"
          )) {
            trigger.kill();
          }
        });
      };
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all required fields.", {
        style: {
          background: 'rgba(220, 38, 38, 0.2)',
          border: '1px solid rgba(220, 38, 38, 0.3)',
          color: '#fff',
          backdropFilter: 'blur(10px)',
        },
        iconTheme: {
          primary: '#dc2626',
          secondary: '#fff',
        },
      });
      return;
    }

    // Validate EmailJS configuration
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error("EmailJS configuration missing:");
      console.error("Service ID:", EMAILJS_SERVICE_ID);
      console.error("Template ID:", EMAILJS_TEMPLATE_ID);
      console.error("Public Key:", EMAILJS_PUBLIC_KEY ? "Present" : "Missing");
      toast.error("Email service configuration error. Please try again later.", {
        style: {
          background: 'rgba(220, 38, 38, 0.2)',
          border: '1px solid rgba(220, 38, 38, 0.3)',
          color: '#fff',
          backdropFilter: 'blur(10px)',
        },
        iconTheme: {
          primary: '#dc2626',
          secondary: '#fff',
        },
      });
      return;
    }
    
    setIsSubmitting(true);

    // Show loading toast
    const loadingToast = toast.loading("Sending your message...", {
      style: {
        background: 'rgba(147, 51, 234, 0.2)',
        border: '1px solid rgba(147, 51, 234, 0.3)',
        color: '#fff',
        backdropFilter: 'blur(10px)',
      },
    });

    try {
      // EmailJS template parameters - matching your template variables
      const templateParams = {
        name: formData.name,           // matches {{name}} in template
        email: formData.email,         // matches {{email}} in template  
        subject: formData.subject,     // matches {{subject}} in template
        message: formData.message,     // matches {{message}} in template
      };

      console.log("Sending email with params:", templateParams);

      // Send main email
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log("Email sent successfully:", response);

      // Send auto-reply email (only if auto-reply template is configured)
      if (EMAILJS_AUTO_REPLY_TEMPLATE_ID && EMAILJS_AUTO_REPLY_TEMPLATE_ID !== "AutoReplyTemp") {
        try {
          const autoReplyParams = {
            to_email: formData.email,
            to_name: formData.name,
            subject: formData.subject,
          };

          await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_AUTO_REPLY_TEMPLATE_ID,
            autoReplyParams
          );
          console.log("Auto-reply sent successfully");
        } catch (autoReplyError) {
          console.warn("Auto-reply failed (non-critical):", autoReplyError);
          // Don't fail the whole process if auto-reply fails
        }
      }

      if (response.status === 200) {
        toast.dismiss(loadingToast);
        toast.success("Message sent successfully! I'll get back to you soon.", {
          duration: 5000,
          style: {
            background: 'rgba(34, 197, 94, 0.2)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            color: '#fff',
            backdropFilter: 'blur(10px)',
          },
          iconTheme: {
            primary: '#22c55e',
            secondary: '#fff',
          },
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.dismiss(loadingToast);
      toast.error("There was an error sending your message. Please try again later.", {
        style: {
          background: 'rgba(220, 38, 38, 0.2)',
          border: '1px solid rgba(220, 38, 38, 0.3)',
          color: '#fff',
          backdropFilter: 'blur(10px)',
        },
        iconTheme: {
          primary: '#dc2626',
          secondary: '#fff',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSmallScreen = typeof window !== "undefined" && window.innerWidth <= 768;
  const isMediumScreen = typeof window !== "undefined" && window.innerWidth <= 1024;

  return (
    <section id="contactPage">
    <div ref={containerRef} className="min-h-screen w-full bg-[#0C090D] overflow-y-auto relative">
      {/* Toast Container */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: '14px',
            fontFamily: 'system-ui, sans-serif',
          },
        }}
      />

      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/5 rounded-full blur-xl animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/5 rounded-full blur-xl animate-pulse pointer-events-none" style={{ animationDelay: "700ms" }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-purple-500/3 to-blue-500/3 rounded-full blur-3xl pointer-events-none"></div>

      {/* Contact Title */}
      <div
        ref={contactTitleRef}
        className="text-white font-orbitron text-center relative z-10"
        style={{
          fontSize: "5vmax",
          fontWeight: 300,
          paddingTop: "3vw",
          paddingBottom: "2vw",
        }}
      >
        CONTACT ME
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Contact Form */}
          <div
            ref={contactFormRef}
            className="contact-item backdrop-blur-md rounded-2xl border border-gray-700/50 p-6 sm:p-8"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            <h2 
              className="font-bebas text-white tracking-wider mb-6"
              style={{
                fontSize: isSmallScreen ? "7vw" : isMediumScreen ? "5vw" : "3rem",
              }}
            >
              GET IN TOUCH
            </h2>
            
            <p 
              className="text-gray-300 font-poppins mb-8 leading-relaxed"
              style={{
                fontSize: isSmallScreen ? "3.5vw" : isMediumScreen ? "2.5vw" : "1rem",
              }}
            >
              Have a project in mind or just want to chat? Drop me a message and I'll get back to you as soon as possible!
            </p>

            <div className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div 
                    className="block text-white/80 font-poppins font-medium mb-2"
                    style={{
                      fontSize: isSmallScreen ? "3.2vw" : isMediumScreen ? "2.2vw" : "0.875rem",
                    }}
                  >
                    Name *
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-white/20 backdrop-blur-sm
                      text-white font-poppins focus:border-purple-400 focus:outline-none
                      transition-colors duration-300"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      fontSize: isSmallScreen ? "3.2vw" : isMediumScreen ? "2.2vw" : "1rem",
                    }}
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <div 
                    className="block text-white/80 font-poppins font-medium mb-2"
                    style={{
                      fontSize: isSmallScreen ? "3.2vw" : isMediumScreen ? "2.2vw" : "0.875rem",
                    }}
                  >
                    Email *
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-white/20 backdrop-blur-sm
                      text-white font-poppins focus:border-purple-400 focus:outline-none
                      transition-colors duration-300"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      fontSize: isSmallScreen ? "3.2vw" : isMediumScreen ? "2.2vw" : "1rem",
                    }}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <div 
                  className="block text-white/80 font-poppins font-medium mb-2"
                  style={{
                    fontSize: isSmallScreen ? "3.2vw" : isMediumScreen ? "2.2vw" : "0.875rem",
                  }}
                >
                  Subject *
                </div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-white/20 backdrop-blur-sm
                    text-white font-poppins focus:border-purple-400 focus:outline-none
                    transition-colors duration-300"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    fontSize: isSmallScreen ? "3.2vw" : isMediumScreen ? "2.2vw" : "1rem",
                  }}
                  placeholder="What's this about?"
                />
              </div>

              {/* Message */}
              <div>
                <div 
                  className="block text-white/80 font-poppins font-medium mb-2"
                  style={{
                    fontSize: isSmallScreen ? "3.2vw" : isMediumScreen ? "2.2vw" : "0.875rem",
                  }}
                >
                  Message *
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-white/20 backdrop-blur-sm
                    text-white font-poppins focus:border-purple-400 focus:outline-none
                    transition-colors duration-300 resize-vertical"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    fontSize: isSmallScreen ? "3.2vw" : isMediumScreen ? "2.2vw" : "1rem",
                  }}
                  placeholder="Tell me about your project or just say hello!"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-lg border border-gray-500/50 backdrop-blur-md
                  font-bebas text-white tracking-wider transition-all duration-300
                  hover:border-gray-400 hover:shadow-lg hover:shadow-gray-500/20
                  disabled:opacity-50 disabled:cursor-not-allowed
                  focus:outline-none focus:border-gray-400"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  fontSize: isSmallScreen ? "4vw" : isMediumScreen ? "3vw" : "1.25rem",
                }}
              >
                {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div
              ref={contactInfoRef}
              className="contact-item backdrop-blur-md rounded-2xl border border-gray-700/50 p-6 sm:p-8"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
            >
              <h3 
                className="font-bebas text-white tracking-wider mb-6"
                style={{
                  fontSize: isSmallScreen ? "6vw" : isMediumScreen ? "4vw" : "2rem",
                }}
              >
                CONTACT INFO
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div 
                      className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center border border-white/20"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        fontSize: isSmallScreen ? "1.2rem" : "1.5rem",
                      }}
                    >
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <div 
                        className="text-white/60 font-poppins font-medium"
                        style={{
                          fontSize: isSmallScreen ? "2.8vw" : isMediumScreen ? "2vw" : "0.875rem",
                        }}
                      >
                        {info.label}
                      </div>
                      {info.link ? (
                        <a 
                          href={info.link}
                          className="text-white font-poppins hover:text-purple-300 transition-colors duration-300"
                          style={{
                            fontSize: isSmallScreen ? "3.2vw" : isMediumScreen ? "2.2vw" : "1rem",
                          }}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div 
                          className="text-white font-poppins"
                          style={{
                            fontSize: isSmallScreen ? "3.2vw" : isMediumScreen ? "2.2vw" : "1rem",
                          }}
                        >
                          {info.value}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div
              className="contact-item backdrop-blur-md rounded-2xl border border-gray-700/50 p-6 sm:p-8"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
            >
              <h3 
                className="font-bebas text-white tracking-wider mb-6"
                style={{
                  fontSize: isSmallScreen ? "6vw" : isMediumScreen ? "4vw" : "2rem",
                }}
              >
                FOLLOW ME
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center p-4 rounded-lg border border-white/20 backdrop-blur-sm
                      text-white font-poppins transition-all duration-300 hover:scale-105
                      hover:border-white/40 hover:shadow-lg ${social.color}`}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <div className="mb-2">
                      {social.icon}
                    </div>
                    <span 
                      style={{
                        fontSize: isSmallScreen ? "2.8vw" : isMediumScreen ? "2vw" : "0.875rem",
                      }}
                    >
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Response Time */}
            <div
              className="contact-item backdrop-blur-md rounded-2xl border border-gray-700/50 p-6 text-center"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div 
                style={{
                  fontSize: isSmallScreen ? "2rem" : "3rem",
                }}
                className="mb-4"
              >
                ⚡
              </div>
              <h4 
                className="font-bebas text-white tracking-wider mb-2"
                style={{
                  fontSize: isSmallScreen ? "5vw" : isMediumScreen ? "3.5vw" : "1.5rem",
                }}
              >
                QUICK RESPONSE
              </h4>
              <p 
                className="text-gray-300 font-poppins"
                style={{
                  fontSize: isSmallScreen ? "3vw" : isMediumScreen ? "2vw" : "0.875rem",
                }}
              >
                I typically respond within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};