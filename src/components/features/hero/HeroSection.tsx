import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Clock, Award } from 'lucide-react';
import Button from '../../ui/Button/Button';

const HeroSection: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-primary-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.4'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="text-center lg:text-left"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Award size={16} />
              <span>Award-Winning Restaurant</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
            >
              Experience
              <span className="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent"> Culinary </span>
              Excellence
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl"
            >
              Savor authentic flavors crafted with the finest ingredients. From farm to table, 
              every dish tells a story of passion and culinary mastery.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Button size="lg" className="group">
                Order Now
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                View Menu
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-3 gap-8 text-center lg:text-left"
            >
              <div>
                <div className="flex items-center justify-center lg:justify-start space-x-1 text-primary-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-2xl font-bold text-gray-900">4.9</p>
                <p className="text-sm text-gray-600">Customer Rating</p>
              </div>
              <div>
                <div className="flex items-center justify-center lg:justify-start text-primary-500 mb-2">
                  <Clock size={20} />
                </div>
                <p className="text-2xl font-bold text-gray-900">30min</p>
                <p className="text-sm text-gray-600">Delivery Time</p>
              </div>
              <div>
                <div className="flex items-center justify-center lg:justify-start text-primary-500 mb-2">
                  <Award size={20} />
                </div>
                <p className="text-2xl font-bold text-gray-900">2024</p>
                <p className="text-sm text-gray-600">Best Restaurant</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Delicious restaurant food"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute -right-4 top-16 bg-white rounded-lg shadow-lg p-4 max-w-xs hidden lg:block"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Award className="text-primary-500" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Michelin Star</p>
                    <p className="text-sm text-gray-600">Awarded 2024</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -left-4 bottom-16 bg-white rounded-lg shadow-lg p-4 max-w-xs hidden lg:block"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="text-green-500" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Fast Delivery</p>
                    <p className="text-sm text-gray-600">Under 30 minutes</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary-200 rounded-full blur-3xl opacity-20" />
            <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-primary-300 rounded-full blur-3xl opacity-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
