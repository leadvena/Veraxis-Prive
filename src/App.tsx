import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { 
  Scissors, 
  Waves, 
  Sparkles, 
  Hand, 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  ChevronRight, 
  Star,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Components
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Booking', path: '/booking' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-6 md:px-12",
      isScrolled ? "bg-primary/95 backdrop-blur-md py-4 shadow-xl border-b border-white/5" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex flex-col items-start group">
          <span className="text-2xl md:text-3xl font-serif tracking-[0.3em] font-light uppercase text-accent group-hover:scale-105 transition-transform duration-500">
            Veraxis
          </span>
          <span className="text-[10px] tracking-[0.8em] uppercase font-medium text-white/50 -mt-1 ml-1 group-hover:text-accent/70 transition-colors duration-500">
            Privé
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-12 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={cn(
                "text-[10px] uppercase tracking-[0.2em] transition-all font-medium pb-1",
                location.pathname === link.path 
                  ? "text-accent border-b border-accent" 
                  : "text-white/60 hover:text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/booking" className="bg-accent text-primary px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white transition-all duration-500 rounded-full">
            Reserve
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-primary z-40 flex flex-col items-center justify-center space-y-10"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-serif text-white hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/booking" 
              onClick={() => setIsMenuOpen(false)}
              className="bg-accent text-primary px-12 py-5 text-sm uppercase tracking-[0.4em] font-bold rounded-full"
            >
              Book Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const WhatsAppButton = () => (
  <a 
    href="https://wa.me/971558833672" 
    target="_blank" 
    rel="noreferrer"
    className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group"
  >
    <Phone className="text-white fill-white" size={24} />
    <span className="absolute -top-2 -right-2 bg-accent text-primary text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">
      Online
    </span>
  </a>
);

const Footer = () => (
  <footer className="bg-primary text-white/50 py-32 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
      <div className="col-span-1 md:col-span-1">
        <h3 className="text-3xl font-serif text-accent mb-10 tracking-widest uppercase">Veraxis Privé</h3>
        <p className="text-sm leading-relaxed mb-10 font-light max-w-xs">
          Abu Dhabi's exclusive luxury men's spa and grooming destination. Elevating the modern gentleman's experience.
        </p>
        <div className="flex space-x-8">
          <a href="#" className="hover:text-accent transition-colors"><Instagram size={20} /></a>
          <a href="#" className="hover:text-accent transition-colors"><Facebook size={20} /></a>
        </div>
      </div>
      
      <div>
        <h4 className="text-[10px] uppercase tracking-[0.5em] text-accent mb-10 font-bold">Location</h4>
        <div className="space-y-4 text-sm font-light">
          <p className="leading-relaxed">
            Hadbat Bin Al Kharsan St<br />
            Al Zahiyah, E14<br />
            Abu Dhabi, UAE
          </p>
          <p>T: +971 55 883 3672</p>
        </div>
      </div>

      <div>
        <h4 className="text-[10px] uppercase tracking-[0.5em] text-accent mb-10 font-bold">Hours</h4>
        <div className="space-y-4 text-sm font-light">
          <div className="flex justify-between">
            <span>Daily</span>
            <span className="text-white">10:00 - 22:00</span>
          </div>
          <p className="text-[10px] text-accent/50 italic">*Appointments recommended</p>
        </div>
      </div>

      <div>
        <h4 className="text-[10px] uppercase tracking-[0.5em] text-accent mb-10 font-bold">Quick Links</h4>
        <div className="space-y-4 text-sm font-light">
          <Link to="/services" className="block hover:text-accent transition-colors">Services</Link>
          <Link to="/about" className="block hover:text-accent transition-colors">About Us</Link>
          <Link to="/booking" className="block hover:text-accent transition-colors">Booking</Link>
          <Link to="/contact" className="block hover:text-accent transition-colors">Contact</Link>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-32 pt-10 border-t border-white/5 text-center md:text-left">
      <p className="text-[10px] uppercase tracking-[0.4em] font-light">
        &copy; {new Date().getFullYear()} Veraxis Privé Men's Spa & Salon. All rights reserved.
      </p>
    </div>
  </footer>
);

// Page Components
const Home = () => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });

  const services = [
    { title: "Precision Barbering", icon: <Scissors />, img: "/images/barbering.png", desc: "Masterful cuts and grooming tailored to your style." },
    { title: "Oriental Oud Bath", icon: <Waves />, img: "/images/bath.png", desc: "Traditional Emirati and Oud baths for ultimate relaxation." },
    { title: "Thai Body Therapy", icon: <Sparkles />, img: "/images/therapy.png", desc: "Signature Swedish and Thai therapy for physical restoration." },
    { title: "Signature Facials", icon: <Sparkles />, img: "/images/facial.png", desc: "Advanced skincare treatments for the modern man." },
    { title: "Men's Manicure", icon: <Hand />, img: "/images/manicure.png", desc: "Premium hand and nail care for a polished look." }
  ];

  return (
    <div className="bg-primary overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="/images/hero.png" 
            className="w-full h-full object-cover"
            alt="Veraxis Prive Hero"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/20 to-primary/90 z-1" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="text-accent text-[11px] uppercase tracking-[0.8em] font-bold mb-8 block">
              Exclusive Men's Sanctuary
            </span>
            <h1 className="text-6xl md:text-9xl text-white font-serif mb-12 leading-tight tracking-tight">
              Quiet <span className="italic font-light">Luxury.</span><br />
              Absolute <span className="italic font-light text-accent">Precision.</span>
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <Link to="/booking" className="bg-accent text-primary px-16 py-6 text-xs uppercase tracking-[0.4em] font-bold rounded-full hover:bg-white transition-all duration-500 shadow-2xl">
                Experience Veraxis
              </Link>
              <Link to="/services" className="text-white text-xs uppercase tracking-[0.4em] font-bold flex items-center gap-4 group">
                View Menu <ArrowRight className="group-hover:translate-x-2 transition-transform" size={16} />
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-accent/50 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-40 px-6 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-accent text-[10px] uppercase tracking-[0.5em] font-black mb-8 block">Our Ethos</span>
            <h2 className="text-5xl md:text-7xl font-serif text-primary mb-12 leading-tight">
              The Art of <span className="italic">Gentleman's</span> Restoration
            </h2>
            <p className="text-lg text-secondary leading-relaxed mb-12 font-light">
              Veraxis Privé is Abu Dhabi's premier destination for the man who understands that grooming is an investment, and relaxation is a necessity. Our space is engineered to neutralize the noise of the outside world, focusing entirely on your recalibration.
            </p>
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h4 className="text-4xl font-serif text-primary mb-2">5.0</h4>
                <div className="flex text-accent mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-[10px] uppercase tracking-widest text-secondary/60">Google Reviews</p>
              </div>
              <div>
                <h4 className="text-4xl font-serif text-primary mb-2">Exclusive</h4>
                <p className="text-[10px] uppercase tracking-widest text-secondary/60">Limited Appointments</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl relative z-10">
              <img src="/images/hero.png" className="w-full h-full object-cover" alt="Spa Detail" />
            </div>
            <div className="absolute -top-12 -right-12 w-64 h-64 border-2 border-accent/20 rounded-full z-0" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-accent/10 blur-3xl rounded-full z-0" />
          </motion.div>
        </div>
      </section>

      {/* Services Horizontal Scroll */}
      <section className="py-40 bg-primary relative overflow-hidden" ref={scrollRef}>
        <div className="max-w-7xl mx-auto px-6 mb-24">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-accent text-[10px] uppercase tracking-[0.5em] font-black mb-8 block">Services</span>
              <h2 className="text-5xl md:text-8xl font-serif text-white leading-tight">
                Crafted <span className="italic text-accent">Sequences</span>
              </h2>
            </div>
            <Link to="/services" className="text-white/60 hover:text-accent text-[11px] uppercase tracking-[0.3em] font-bold border-b border-white/10 pb-2 transition-all">
              Full Menu
            </Link>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex overflow-hidden pb-20 group/marquee"
        >
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
            className="flex gap-8 md:gap-16 w-max px-6 md:px-12"
          >
            {[...services, ...services].map((service, i) => (
              <div 
                key={i}
                className="flex-shrink-0 w-[300px] md:w-[450px] group cursor-pointer"
              >
                <Link to="/booking" state={{ service: service.title }} className="block">
                  <div className="aspect-[3/4] rounded-[30px] overflow-hidden mb-8 relative">
                    <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/0 transition-all duration-700 z-10" />
                    <img 
                      src={service.img} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" 
                      alt={service.title} 
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="w-12 h-12 rounded-full bg-accent/90 backdrop-blur-md flex items-center justify-center text-primary mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {service.icon}
                      </div>
                      <h3 className="text-3xl font-serif text-white mb-2">{service.title}</h3>
                      <p className="text-white/60 text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 bg-accent text-primary text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-8xl font-serif mb-12 leading-tight">
            Ready to <span className="italic font-light">Elevate</span> Your Game?
          </h2>
          <p className="text-xl mb-16 font-medium tracking-tight opacity-80 max-w-2xl mx-auto">
            Secure your sanctuary session today. Experience the pinnacle of men's grooming in Abu Dhabi.
          </p>
          <Link to="/booking" className="inline-block bg-primary text-white px-20 py-8 text-sm uppercase tracking-[0.5em] font-bold rounded-full hover:bg-white hover:text-primary transition-all duration-500 shadow-2xl">
            Book Appointment
          </Link>
        </motion.div>
        
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
           <div className="absolute -top-40 -left-40 w-96 h-96 border-[40px] border-primary rounded-full" />
           <div className="absolute -bottom-40 -right-40 w-96 h-96 border-[40px] border-primary rounded-full" />
        </div>
      </section>

      {/* Contact Preview */}
      <section className="py-32 px-6 bg-primary border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex items-center gap-8 group">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-500">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Visit Us</p>
              <p className="text-white font-medium text-sm">Al Zahiyah, Abu Dhabi</p>
            </div>
          </div>
          <div className="flex items-center gap-8 group">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-500">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Call Us</p>
              <p className="text-white font-medium text-sm">+971 55 883 3672</p>
            </div>
          </div>
          <div className="flex items-center gap-8 group">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-500">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Open Daily</p>
              <p className="text-white font-medium text-sm">10:00 AM — 10:00 PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const MENU_DATA = [
  {
    categoryEn: "PRESTIGE GROOMING LOUNGE",
    categoryAr: "صالة الحلاقة الفاخرة",
    subtitle: "Where Style Meets Excellence",
    items: [
      { en: "Shaving", ar: "حلاقة لحية", duration: "15–20 min", price: "50 AED" },
      { en: "Hair Cut", ar: "حلاقة شعر", duration: "20–30 min", price: "50 AED" },
      { en: "Hair Styling", ar: "تسريحة للشعر", duration: "15–25 min", price: "50 AED" },
      { en: "Eyebrow Grooming", ar: "ترتيب الحواجب", duration: "10–15 min", price: "50 AED" },
      { en: "Cover Baldness with Styling", ar: "تغطية الصلع وترتيب الشعر", duration: "20–30 min", price: "75 AED" },
      { en: "Hair Hanna", ar: "حنة للشعر", duration: "45–60 min", price: "75 AED" },
      { en: "Hot Oil", ar: "حمام زيت ساخن", duration: "30–40 min", price: "75 AED" },
      { en: "Beard Hanna", ar: "حنة للحية", duration: "30–45 min", price: "75 AED" },
      { en: "Wax", ar: "واكس", duration: "10–20 min", price: "20–120 AED" },
      { en: "Hair Botox", ar: "بوتكس شعر", duration: "60–90 min", price: "300 AED" },
      { en: "Keratin Hair Treatment", ar: "علاج كيراتين للشعر", duration: "90–120 min", price: "700 AED" }
    ]
  },
  {
    categoryEn: "PRECISION HAIR REMOVAL & WAXING",
    categoryAr: "إزالة الشعر واكس",
    subtitle: "Expert Care • Smooth Results",
    items: [
      { en: "Under Arm", ar: "إزالة شعر الإبطين", duration: "10–15 min", price: "50 AED" },
      { en: "Shoulder", ar: "الكتفين", duration: "10–20 min", price: "50 AED" },
      { en: "Half Arm", ar: "نصف الذراعين", duration: "15–25 min", price: "50 AED" },
      { en: "Full Arm", ar: "كامل الذراعين", duration: "25–40 min", price: "100 AED" },
      { en: "Half Legs", ar: "نصف الساقين", duration: "20–35 min", price: "100 AED" },
      { en: "Chest and Stomach", ar: "الصدر والبطن", duration: "20–40 min", price: "100 AED" },
      { en: "Full Back & Shoulder", ar: "كامل الظهر والكتفين", duration: "30–50 min", price: "100 AED" },
      { en: "Bikini", ar: "بيكيني", duration: "15–25 min", price: "100 AED" },
      { en: "Full Legs", ar: "كامل الساقين", duration: "40–60 min", price: "200 AED" },
      { en: "Full Body", ar: "الجسم كامل", duration: "90–120 min", price: "400 AED" }
    ]
  },
  {
    categoryEn: "VÉRAXIS PRIVÉ FACIAL COLLECTION",
    categoryAr: "التجميل وتنظيف البشرة",
    subtitle: "Refresh Your Skin, Reveal Your Glow",
    items: [
      { en: "Express Executive Facial", ar: "فيشل سريع للعملاء المشغولين", duration: "", price: "199 AED" },
      { en: "Royal Glow Facial", ar: "تنظيف عميق + توهج فوري", duration: "", price: "299 AED" },
      { en: "Aqua Luxe Hydration Ritual", ar: "ترطيب مكثف + علاج تحجيم البشرة", duration: "", price: "399 AED" },
      { en: "Bright Aura Skin Ritual", ar: "تفتيح + تصحيح التصبغات", duration: "", price: "449 AED" },
      { en: "Age Reverse Therapy", ar: "شد + مكافحة الشيخوخة + مساج رفع", duration: "", price: "599 AED" },
      { en: "24K Gold Signature Facial", ar: "علاج توهج فاخر بالذهب", duration: "", price: "799 AED" },
      { en: "Platinum Skin Renewal", ar: "تجديد متقدم + منتجات فاخرة", duration: "", price: "999 AED" }
    ]
  },
  {
    categoryEn: "LUXURY HAND & FOOT CARE RITUAL",
    categoryAr: "علاج اليدين والقدمين",
    subtitle: "Soft Touch • Smooth Finish • Perfect Grooming",
    items: [
      { en: "Manicure", ar: "تقليم أظافر اليدين", duration: "30–45 min", price: "70 AED" },
      { en: "Pedicure", ar: "تقليم أظافر القدمين", duration: "40–60 min", price: "70 AED" },
      { en: "Foot Spa", ar: "تنظيف القدمين", duration: "20–30 min", price: "70 AED" },
      { en: "Manicure & Hand Care Ritual", ar: "تقليم أظافر ومساج اليدين", duration: "45–60 min", price: "100 AED" },
      { en: "Pedicure & Foot Care Ritual", ar: "تقليم أظافر ومساج القدمين", duration: "60–75 min", price: "100 AED" },
      { en: "Foot Spa & Massage", ar: "تنظيف ومساج القدم", duration: "40–50 min", price: "100 AED" }
    ]
  },
  {
    categoryEn: "OASIS BATH & SCRUB LOUNGE",
    categoryAr: "الحمام الشرقي وسكربات",
    subtitle: "Indulge in Pure Relaxation",
    items: [
      { en: "Whitening Scrub", ar: "سكراب تبييض", duration: "45–60 min", price: "200 AED" },
      { en: "Slimming Scrub", ar: "اسكرب تخسيس", duration: "45–60 min", price: "200 AED" },
      { en: "Regular / Traditional Bath", ar: "الحمام التقليدي", duration: "40–60 min", price: "200 AED" },
      { en: "Detox Scrub (Lymphatic Drainage)", ar: "سكراب ديتوكس (إزالة للسموم)", duration: "45–60 min", price: "200 AED" },
      { en: "Veraxis Premium Majestic Bath", ar: "حمام ذا ون الخاص", duration: "75–90 min", price: "300 AED" },
      { en: "Emirati Bath", ar: "الحمام الإماراتي", duration: "15–25 min", price: "350 AED" },
      { en: "Bath with Musk", ar: "حمام المسك", duration: "45–60 min", price: "450 AED" },
      { en: "Bath with Oud", ar: "حمام العود", duration: "45–60 min", price: "550 AED" }
    ]
  },
  {
    categoryEn: "VÉRAXIS PRIVÉ MEN'S WELLNESS LOUNGE",
    categoryAr: "صالة العناية بالرجل",
    subtitle: "Where Personal Care Becomes a Ritual",
    items: [
      { en: "Swedish Personal Care Ritual", ar: "ريلاكس سويدي", duration: "60 / 90 MIN", price: "200 / 300 AED" },
      { en: "Aroma Personal Care Ritual", ar: "ريلاكس بالزيوت العطرية", duration: "60 / 90 MIN", price: "200 / 300 AED" },
      { en: "Deep Relax Personal Care Ritual", ar: "ريلاكس عميق", duration: "60 / 90 MIN", price: "250 / 350 AED" },
      { en: "Stretch Personal Care Ritual", ar: "ريلاكس تمدد", duration: "60 / 90 MIN", price: "250 / 350 AED" },
      { en: "Hot Stone Personal Care Ritual", ar: "ريلاكس بالأحجار الساخنة", duration: "60 / 90 MIN", price: "300 / 400 AED" }
    ]
  }
];

const ServicesPage = () => (
  <div className="bg-primary min-h-screen pt-48 pb-40 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-32">
        <span className="text-accent text-[11px] uppercase tracking-[0.8em] font-bold mb-8 block">Ritual Menu</span>
        <h1 className="text-6xl md:text-9xl text-white font-serif mb-12">The <span className="italic text-accent">Menu</span></h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 lg:gap-40">
        {MENU_DATA.map((group, idx) => (
          <div key={idx} className="space-y-12">
            <div>
              <h2 className="text-accent text-sm md:text-base tracking-[0.2em] font-black">{group.categoryEn} | {group.categoryAr}</h2>
              <p className="text-white/50 text-sm italic mt-2 border-b border-white/10 pb-4">{group.subtitle}</p>
            </div>
            <div className="space-y-10">
              {group.items.map((item, i) => (
                <Link 
                  key={i} 
                  to="/booking" 
                  state={{ service: item.en }}
                  className="group block cursor-pointer"
                >
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-xl md:text-2xl text-white font-serif group-hover:text-accent transition-colors flex items-center gap-3">
                      {item.en} <span className="text-sm font-sans text-white/70 font-light ml-2">{item.ar}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                    </h3>
                    <div className="flex-grow mx-6 border-b border-white/5 border-dotted" />
                    <span className="text-accent font-bold text-sm whitespace-nowrap">{item.price}</span>
                  </div>
                  <div className="flex justify-end text-white/40 text-sm font-light leading-relaxed transition-colors">
                    {item.duration && <span className="text-[10px] uppercase tracking-widest">{item.duration}</span>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-40 text-center">
        <Link to="/booking" className="bg-accent text-primary px-20 py-8 text-xs uppercase tracking-[0.5em] font-bold rounded-full hover:bg-white transition-all shadow-2xl">
          Request Session
        </Link>
      </div>
    </div>
  </div>
);

const AboutPage = () => (
  <div className="bg-primary min-h-screen pt-48 pb-40 px-6">
    <div className="max-w-7xl mx-auto">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center mb-40">
          <div>
            <span className="text-accent text-[11px] uppercase tracking-[0.8em] font-bold mb-8 block">Our Story</span>
            <h1 className="text-6xl md:text-9xl text-white font-serif mb-12 leading-tight">Quiet <span className="italic">Superiority.</span></h1>
            <p className="text-xl text-white/70 leading-relaxed mb-8 font-light">
              Founded in Al Zahiyah, Veraxis Privé was born from a simple observation: the modern gentleman in Abu Dhabi needed a sanctuary that matched his ambition.
            </p>
            <p className="text-lg text-white/50 leading-relaxed mb-12 font-light">
              We don't just offer services; we offer a transition. From the high-velocity world outside to a state of absolute stillness and precision. Every texture, every sound, and every technique in our space is calculated to facilitate your restoration.
            </p>
            <div className="w-16 h-[1px] bg-accent" />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="aspect-[3/4] rounded-[30px] overflow-hidden mt-12">
               <img src="/images/barbering.png" className="w-full h-full object-cover" alt="Detail 1" />
            </div>
            <div className="aspect-[3/4] rounded-[30px] overflow-hidden">
               <img src="/images/bath.png" className="w-full h-full object-cover" alt="Detail 2" />
            </div>
          </div>
       </div>

       <div className="py-32 border-y border-white/5 text-center">
          <h2 className="text-4xl md:text-6xl text-white font-serif mb-12 max-w-4xl mx-auto leading-tight italic">
            "We believe that true grooming is an act of maintenance, and maintenance is the foundation of excellence."
          </h2>
          <span className="text-accent text-[10px] uppercase tracking-[0.5em] font-black">— Veraxis Ethos</span>
       </div>
    </div>
  </div>
);

const BookingPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const preselectedService = location.state?.service || "Select Service";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      date: formData.get('date'),
      ritual: formData.get('ritual')
    };

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send booking request.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary min-h-screen pt-48 pb-40 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-accent text-[11px] uppercase tracking-[0.8em] font-bold mb-8 block">Reserve</span>
          <h1 className="text-6xl md:text-9xl text-white font-serif">Stay <span className="italic text-accent">Privé</span></h1>
        </div>

        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 backdrop-blur-3xl p-20 rounded-[40px] text-center border border-white/10"
          >
            <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-12 text-primary">
              <Sparkles size={40} />
            </div>
            <h2 className="text-4xl font-serif text-white mb-6">Request Received</h2>
            <p className="text-white/60 mb-12 text-lg">Our concierge will contact you shortly via WhatsApp to confirm your session.</p>
            <button onClick={() => setSubmitted(false)} className="text-accent text-xs uppercase tracking-widest font-bold">Back to menu</button>
          </motion.div>
        ) : (
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-3xl p-12 md:p-20 rounded-[40px] border border-white/10 shadow-2xl"
            onSubmit={handleSubmit}
          >
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-8 text-sm">
                {error}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.4em] text-accent font-black">Full Name</label>
                <input required name="name" type="text" className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-accent transition-colors" placeholder="Gentleman's Name" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.4em] text-accent font-black">Email Address</label>
                <input required name="email" type="email" className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-accent transition-colors" placeholder="hello@example.com" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.4em] text-accent font-black">Phone Number</label>
                <input required name="phone" type="tel" className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-accent transition-colors" placeholder="+971" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.4em] text-accent font-black">Date</label>
                <input required name="date" type="date" className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-accent transition-colors" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.4em] text-accent font-black">Ritual</label>
                <select name="ritual" defaultValue={preselectedService} className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-accent transition-colors appearance-none">
                  <option value="Select Service" disabled className="bg-primary">Select Service</option>
                  {MENU_DATA.map((group, idx) => (
                    <optgroup key={idx} label={`${group.categoryEn} | ${group.categoryAr}`} className="bg-primary">
                      {group.items.map((item, i) => (
                        <option key={i} value={item.en} className="bg-primary">
                          {item.en} | {item.ar}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>
            <button disabled={loading} type="submit" className="w-full bg-accent text-primary py-8 rounded-full text-xs uppercase tracking-[0.6em] font-black hover:bg-white transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Sending..." : "Request Booking"}
            </button>
            <p className="text-center mt-12 text-white/30 text-[10px] uppercase tracking-widest">
              Private Concierge Response within 30 Minutes
            </p>
          </motion.form>
        )}
      </div>
    </div>
  );
};

const ContactPage = () => (
  <div className="bg-primary min-h-screen pt-48 pb-40 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-32">
        <span className="text-accent text-[11px] uppercase tracking-[0.8em] font-bold mb-8 block">Connect</span>
        <h1 className="text-6xl md:text-9xl text-white font-serif">Direct <span className="italic text-accent">Access</span></h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
        <div className="space-y-20">
          <div className="bg-white/5 p-12 rounded-[40px] border border-white/5 group hover:border-accent/30 transition-all">
             <MapPin className="text-accent mb-8" size={32} />
             <h3 className="text-3xl text-white font-serif mb-4">Location</h3>
             <p className="text-white/60 leading-relaxed text-lg">
                Hadbat Bin Al Kharsan St, Al Zahiyah, E14<br />
                Abu Dhabi, United Arab Emirates
             </p>
             <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-block mt-8 text-accent text-xs uppercase tracking-widest font-bold border-b border-accent pb-1">Get Directions</a>
          </div>
          <div className="bg-white/5 p-12 rounded-[40px] border border-white/5 group hover:border-accent/30 transition-all">
             <Phone className="text-accent mb-8" size={32} />
             <h3 className="text-3xl text-white font-serif mb-4">Communication</h3>
             <p className="text-white/60 leading-relaxed text-lg mb-2">WhatsApp: +971 55 883 3672</p>
             <p className="text-white/60 leading-relaxed text-lg">Direct: +971 52 523 3175</p>
          </div>
        </div>
        <div className="aspect-square rounded-[40px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl relative">
           <img src="/images/hero.png" className="w-full h-full object-cover" alt="Location Map Preview" />
           <div className="absolute inset-0 bg-accent/20 mix-blend-overlay pointer-events-none" />
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center animate-pulse">
                <MapPin className="text-primary" size={32} />
              </div>
           </div>
        </div>
      </div>
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans selection:bg-accent selection:text-primary bg-primary overflow-x-hidden">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}
