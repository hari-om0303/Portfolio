import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaShieldAlt } from 'react-icons/fa';
import { api } from '../context/AuthContext';

const Contact = () => {
  const [sending, setSending] = useState(false);
  const [profile, setProfile] = useState({
    email: 'hariomgupta0303@gmail.com',
    phone: '+91-8905952189',
    address: 'Indore, Madhya Pradesh, India',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile');
        if (response.data) {
          setProfile(response.data);
        }
      } catch (err) {
        console.warn('Backend profile fetch failed in Contact, using fallback:', err.message);
      }
    };
    fetchProfile();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSending(true);
    try {
      const response = await api.post('/contact', data);
      toast.success(response.data.message || 'Message sent successfully!');
      reset();
    } catch (error) {
      console.error('Contact submission error:', error);
      const msg = error.response?.data?.message || 'Failed to send message. Please try again later.';
      toast.error(msg);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-black/30 border-t border-slate-100 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Get In <span className="text-accent-primary">Touch</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary mt-3 rounded-full" />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column - Contact Details Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <motion.div
              className="p-8 rounded-3xl bg-white dark:bg-zinc-900/30 border border-slate-100 dark:border-zinc-900 shadow-xl flex-grow flex flex-col justify-center space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                Contact Information
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                Have a question or want to work together? Feel free to drop a message, send an email, or connect via LinkedIn. I'm always open to discussing new opportunities.
              </p>

              {/* Direct Details */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <span className="p-3.5 rounded-2xl bg-accent-primary/10 text-accent-primary flex items-center justify-center">
                    <FaEnvelope className="w-4.5 h-4.5" />
                  </span>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400">Email Address</h4>
                    <a href={`mailto:${profile.email}`} className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-accent-primary">
                      {profile.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="p-3.5 rounded-2xl bg-accent-secondary/10 text-accent-secondary flex items-center justify-center">
                    <FaPhoneAlt className="w-4.5 h-4.5" />
                  </span>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400">Phone Number</h4>
                    <a href={`tel:${profile.phone}`} className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-accent-primary">
                      {profile.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="p-3.5 rounded-2xl bg-accent-emerald/10 text-accent-emerald flex items-center justify-center">
                    <FaMapMarkerAlt className="w-4.5 h-4.5" />
                  </span>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400">Location</h4>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {profile.address}
                    </p>
                  </div>
                </div>
              </div>
              {/* Rate Limit Security Note */}
              <div className="flex items-center space-x-2 p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800/40 text-[11px] text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-zinc-800/50 mt-4">
                <FaShieldAlt className="text-accent-primary w-4.5 h-4.5 flex-shrink-0" />
                <span>Anti-spam rate limit active. Max 5 submissions per 15 minutes.</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              className="p-8 rounded-3xl bg-white dark:bg-zinc-900/30 border border-slate-100 dark:border-zinc-900 shadow-xl h-full"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="name" className="text-xs font-bold text-slate-600 dark:text-slate-300">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Hari Om Gupta"
                      {...register('name', { required: 'Name is required' })}
                      className="px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary transition-colors"
                    />
                    {errors.name && (
                      <span className="text-xs text-red-500 font-semibold">{errors.name.message}</span>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className="text-xs font-bold text-slate-600 dark:text-slate-300">
                      Your Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="example@gmail.com"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      className="px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary transition-colors"
                    />
                    {errors.email && (
                      <span className="text-xs text-red-500 font-semibold">{errors.email.message}</span>
                    )}
                  </div>
                </div>

                {/* Subject field */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="subject" className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Subject (Optional)
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Project Inquiry / Job Opportunity"
                    {...register('subject')}
                    className="px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary transition-colors"
                  />
                </div>

                {/* Message field */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="message" className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    placeholder="Hi, I'd love to chat about..."
                    {...register('message', { required: 'Message content is required' })}
                    className="px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary transition-colors resize-none"
                  />
                  {errors.message && (
                    <span className="text-xs text-red-500 font-semibold">{errors.message.message}</span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center space-x-2 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-accent-primary to-accent-secondary hover:shadow-lg hover:shadow-accent-primary/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:scale-100 transition-all duration-300"
                >
                  <FaPaperPlane className="w-3.5 h-3.5" />
                  <span>{sending ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
