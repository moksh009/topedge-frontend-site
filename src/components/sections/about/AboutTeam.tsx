import React, { useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Linkedin, Twitter, Github, Mail, Instagram } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    Instagram?: string;
    email?: string;
  };
}

const teamMembers: TeamMember[] = [
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

const TeamMemberCard: React.FC<TeamMember> = React.memo(({ name, role, image, bio, social }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-b from-gray-900 to-black p-1">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative p-4">
          <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
              decoding="async"
            />
          </div>
          <h3 className="text-lg font-semibold text-white text-center mb-1">{name}</h3>
          <p className="text-sm text-gray-400 text-center">{role}</p>
          <p className="text-gray-400 text-center">{bio}</p>
        </div>
      </div>

      {/* Social Links */}
      <div className="absolute inset-0 -m-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center space-x-4">
          {social.linkedin && (
            <motion.a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>
          )}
          {social.twitter && (
            <motion.a
              href={social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Twitter className="w-6 h-6" />
            </motion.a>
          )}
          {social.github && (
            <motion.a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-6 h-6" />
            </motion.a>
          )}
          {social.Instagram && (
            <motion.a
              href={social.Instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition-colors duration-300"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Instagram className="w-6 h-6" />
            </motion.a>
          )}
          {social.email && (
            <motion.a
              href={`mailto:${social.email}`}
              className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail className="w-6 h-6" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
});

TeamMemberCard.displayName = 'TeamMemberCard';

const AboutTeam: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const staggerVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        ease: "easeOut",
        duration: 0.5
      }
    }
  }), []);

  return (
    <section className="py-16 bg-black relative overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Our Team
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Meet the passionate individuals driving innovation and excellence in our company.
          </p>
        </motion.div>

        <motion.div
          variants={staggerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          style={{ willChange: 'transform' }}
        >
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </motion.div>
      </div>

      {/* Optimized background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black to-black/80" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(10,132,255,0.1) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
        />
      </div>
    </section>
  );
};

export default React.memo(AboutTeam);
