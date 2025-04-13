import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Linkedin, Twitter, Github, Mail, Instagram } from 'lucide-react';

const teamMembers = [
  {
    name: "Moksh Patel",
    role: "Founder & CEO",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQHJ1aaTdprBPg/profile-displayphoto-shrink_400_400/B4DZUk3778GcAo-/0/1740080399166?e=1746662400&v=beta&t=grLxLMYlnaAf2B_e_xbBhB1T32QdIol6jyke9VcdPHs",
    bio: "Visionary leader with expertise in AI and automation, driving innovation in business transformation.",
    social: {
      linkedin: "https://www.linkedin.com/in/patel-moksh-80467b229/",
      twitter: "https://x.com/moksh2031",
      github: "https://github.com/moksh009",
      Instagram: "https://www.instagram.com/m0ksh._.patel/",
      email: "moksh@aitopedge.com"
    }
  },
  {
    name: "Smit Tilva",
    role: "Co-Founder & CTO",
    image: "/team/smit.jpg",
    bio: "Technical innovator specializing in AI architecture and scalable solutions, passionate about pushing technological boundaries.",
    social: {
      linkedin: "https://linkedin.com/in/smittilva",
      Instagram: "https://www.instagram.com/smit108_/",
      email: "smit@aitopedge.com"
    }
  }
];

const AboutTeam = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative py-32 bg-black overflow-hidden" id="team">
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,132,255,0.05),transparent_50%)]" />
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 30% 70%, rgba(10, 132, 255, 0.08) 0%, transparent 60%)',
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-px w-12 bg-[#0A84FF]/50" />
            <p className="text-[#0A84FF] text-lg font-medium tracking-wide px-4">OUR TEAM</p>
            <div className="h-px w-12 bg-[#0A84FF]/50" />
          </div>
          <h2 className="text-5xl sm:text-6xl font-semibold tracking-tight text-white mb-6">
            Meet Our Visionaries
          </h2>
          <p className="text-xl text-[#86868B] max-w-3xl mx-auto font-light leading-relaxed">
            Passionate experts dedicated to revolutionizing business through AI innovation
          </p>
        </motion.div>

        {/* Team Grid - Adjusted for 2 members */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-[#1C1C1E]/40 backdrop-blur-xl border border-white/5 hover:border-[#0A84FF]/20 transition-all duration-500">
                {/* Image Container */}
                <div className="relative h-96 overflow-hidden">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative p-10">
                  <h3 className="text-3xl font-semibold text-white mb-2 group-hover:text-[#0A84FF] transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-[#0A84FF] font-medium text-xl mb-4">
                    {member.role}
                  </p>
                  <p className="text-[#86868B] text-lg leading-relaxed mb-8 group-hover:text-white/80 transition-colors duration-300">
                    {member.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex items-center space-x-6">
                    {member.social.linkedin && (
                      <motion.a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#86868B] hover:text-[#0A84FF] transition-colors duration-300"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Linkedin className="w-6 h-6" />
                      </motion.a>
                    )}
                    {member.social.twitter && (
                      <motion.a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#86868B] hover:text-[#0A84FF] transition-colors duration-300"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Twitter className="w-6 h-6" />
                      </motion.a>
                    )}
                    {member.social.github && (
                      <motion.a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#86868B] hover:text-[#0A84FF] transition-colors duration-300"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github className="w-6 h-6" />
                      </motion.a>
                    )}
                    {member.social.Instagram && (
                      <motion.a
                        href={member.social.Instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#86868B] hover:text-pink-500 transition-colors duration-300"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Instagram className="w-6 h-6" />
                      </motion.a>
                    )}
                    {member.social.email && (
                      <motion.a
                        href={`mailto:${member.social.email}`}
                        className="text-[#86868B] hover:text-[#0A84FF] transition-colors duration-300"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Mail className="w-6 h-6" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Hover Effects */}
                <motion.div
                  className="absolute inset-0 -m-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(10,132,255,0.1) 0%, transparent 70%)'
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
