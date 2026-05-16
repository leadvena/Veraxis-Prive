import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
      isScrolled ? "bg-spa-cream/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-serif tracking-[0.2em] font-light uppercase text-spa-charcoal">
          Power <span className="text-spa-gold italic text-xl uppercase tracking-[0.1em]">On</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-12 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={cn(
                "text-[11px] uppercase tracking-[0.15em] transition-all font-medium border-b border-transparent pb-1",
                location.pathname === link.path ? "text-spa-gold" : "text-spa-charcoal opacity-60 hover:opacity-100"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/booking" className="bg-spa-charcoal text-spa-cream px-8 py-3 text-[10px] uppercase tracking-widest hover:bg-[#2A2A2A] transition-all duration-300 rounded-full shadow-soft">
            Booking
          </Link>
        </div>

        {/* Mobile Toggle - Minimalist Lines */}
        <button className="md:hidden text-spa-charcoal w-10 h-10 relative z-50 flex flex-col items-center justify-center space-y-1.5" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className={cn("w-6 h-[1px] bg-spa-charcoal transition-all duration-300", isMenuOpen && "rotate-45 translate-y-[3.5px]")} />
          <span className={cn("w-6 h-[1px] bg-spa-charcoal transition-all duration-300", isMenuOpen && "opacity-0")} />
          <span className={cn("w-6 h-[1px] bg-spa-charcoal transition-all duration-300", isMenuOpen && "-rotate-45 -translate-y-[3.5px]")} />
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-spa-cream z-40 flex flex-col items-center justify-center space-y-10 p-10"
          >
            {navLinks.map((link) => (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                key={link.path}
              >
                 <Link 
                  to={link.path} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-serif text-spa-charcoal hover:text-spa-gold transition-colors block"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <div className="w-16 h-[1px] bg-spa-gold/30" />
            <Link 
              to="/booking" 
              onClick={() => setIsMenuOpen(false)}
              className="bg-spa-charcoal text-spa-cream px-12 py-5 text-sm uppercase tracking-[0.3em] font-bold rounded-full"
            >
              Reservation
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const WhatsAppButton = () => (
  <a 
    href="https://wa.me/971500000000" 
    target="_blank" 
    rel="noreferrer"
    className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full border border-spa-gold flex items-center justify-center bg-white shadow-xl hover:scale-110 transition-transform duration-300 group"
    title="Chat on WhatsApp"
  >
    <div className="w-6 h-6 bg-spa-gold rounded-full opacity-40 group-hover:opacity-60 transition-opacity" />
    <span className="absolute flex h-3 w-3 top-3 right-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-spa-gold opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-spa-gold"></span>
    </span>
  </a>
);

const Footer = () => (
  <footer className="bg-spa-charcoal text-spa-cream/70 py-32 px-6 border-t border-spa-gold/10">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
      <div className="col-span-1 md:col-span-1">
        <h3 className="text-3xl font-serif text-spa-cream mb-10 tracking-widest uppercase">Power On</h3>
        <p className="text-sm leading-relaxed mb-10 font-light max-w-xs">
          Redefining men's wellness through premium treatments and a serene environment. Strength meets serenity.
        </p>
        <div className="flex space-x-10 text-[10px] uppercase tracking-[0.3em] font-bold">
          <Link to="#" className="text-spa-gold border-b border-spa-gold/20 pb-1">Instagram</Link>
          <Link to="#" className="text-spa-gold border-b border-spa-gold/20 pb-1">Facebook</Link>
        </div>
      </div>
      
      <div>
        <h4 className="text-[10px] uppercase tracking-[0.5em] text-spa-gold mb-10 font-black">Location</h4>
        <div className="space-y-8 text-sm font-light">
          <p className="leading-relaxed">
            Electra Street, Al Zahiyah,<br />Abu Dhabi, UAE
          </p>
          <div className="w-8 h-[1px] bg-spa-gold/20" />
          <p>
            T: +971 2 000 0000
          </p>
        </div>
      </div>

      <div>
        <h4 className="text-[10px] uppercase tracking-[0.5em] text-spa-gold mb-10 font-black">Sanctuary Hours</h4>
        <div className="space-y-6 text-xs font-light">
          <div className="flex justify-between items-center opacity-80">
            <span>Monday — Thursday</span>
            <span className="text-spa-gold">10:00 - 22:00</span>
          </div>
          <div className="flex justify-between items-center text-spa-cream font-medium">
            <span>Friday — Sunday</span>
            <span className="text-spa-gold">10:00 - 00:00</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-[10px] uppercase tracking-[0.5em] text-spa-gold mb-10 font-black">Explore</h4>
        <div className="space-y-4 text-xs font-light uppercase tracking-widest">
          <Link to="/services" className="block hover:text-spa-gold transition-colors">Treatments</Link>
          <Link to="/about" className="block hover:text-spa-gold transition-colors">Philosophy</Link>
          <Link to="/contact" className="block hover:text-spa-gold transition-colors">Inquiries</Link>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-32 pt-10 border-t border-spa-cream/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] uppercase tracking-[0.4em] font-light">
      <p>&copy; {new Date().getFullYear()} Power On Men's Spa. Abu Dhabi.</p>
      <div className="flex space-x-10 opacity-50">
        <span>Privacy Policy</span>
        <span>Terms of Service</span>
      </div>
    </div>
  </footer>
);

// Pages
const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative min-h-[calc(100vh-100px)] mt-24 flex items-center px-6 md:px-12 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-12 items-stretch">
          
          {/* Hero Text Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
            >
              <div className="mb-8 h-[1px] w-12 bg-spa-gold"></div>
              <h1 className="text-6xl md:text-8xl leading-[1.1] mb-10 tracking-tight font-serif">
                Where Strength <br/>
                <span className="italic font-light">Meets Serenity.</span>
              </h1>
              <p className="text-sm md:text-base leading-relaxed opacity-70 max-w-sm mb-12 font-light">
                A sanctuary for the modern gentleman on Electra Street. Experience the pinnacle of men's wellness in Abu Dhabi's most refined health spa.
              </p>
              <Link to="/booking" className="inline-block bg-spa-charcoal text-spa-cream px-12 py-5 rounded-full text-xs uppercase tracking-widest hover:bg-[#2A2A2A] transition-all soft-shadow font-medium">
                Book Your Session
              </Link>
            </motion.div>
          </div>

          {/* Visual Section */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <div className="flex-1 min-h-[400px] relative flex flex-col sm:flex-row gap-4">
              {/* Featured Card 1 */}
              <div className="w-full sm:w-1/2 h-full bg-spa-charcoal rounded-[40px] p-8 flex flex-col justify-end text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-20 serif italic text-5xl">01</div>
                <div className="relative z-10">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-spa-gold mb-3 font-bold">Concept</p>
                  <h3 className="text-3xl mb-4 font-serif">Structural Recovery</h3>
                  <p className="text-xs font-light opacity-60 leading-relaxed mb-6">
                    A clinical precision meets sensory refinement. Restoring the human machine.
                  </p>
                  <div className="w-8 h-[1px] bg-spa-gold transition-all group-hover:w-full duration-1000"></div>
                </div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-spa-gold opacity-10 blur-[80px] rounded-full group-hover:scale-110 transition-transform duration-1000"></div>
              </div>

              {/* Featured Card 2 */}
              <div className="w-full sm:w-1/2 h-full bg-[#EAE7DF] rounded-[40px] relative overflow-hidden flex items-center justify-center p-8 group">
                <img 
                  src="https://picsum.photos/seed/spa-minimal-1/800/800"
                  className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-[10s]"
                  alt="Spa Atmosphere"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#EAE7DF] to-transparent z-0"></div>
                <div className="relative text-center z-10">
                   <div className="w-8 h-[1px] bg-spa-gold mx-auto mb-6"></div>
                   <p className="italic text-xl text-spa-charcoal font-serif">The space between noise and silence.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-40 px-6 bg-spa-cream border-y border-spa-gold/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-spa-gold mb-12 font-bold opacity-60">The Sanctuary</p>
          <h2 className="text-4xl md:text-6xl mb-16 leading-tight font-serif font-light tracking-tight text-spa-charcoal/90">
            Designed for the <span className="serif-italic">High-Load</span> Professional.
          </h2>
          <p className="text-sm md:text-base text-spa-charcoal/60 leading-relaxed max-w-2xl mx-auto font-light">
             We facilitate the transition from intense performance to profound rest through controlled environments and specialized practitioner sequences.
          </p>
        </div>
      </section>

      {/* Services Preview Strip */}
      <section className="bg-white border-b border-spa-gold/20 flex flex-col md:flex-row items-stretch">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-spa-gold/10">
          {[
            { name: "Deep Tissue", time: "60 min", price: "350 AED" },
            { name: "Steam Bath", time: "45 min", price: "220 AED" },
            { name: "Swedish Therapy", time: "90 min", price: "450 AED" },
            { name: "Decompressive", time: "60 min", price: "300 AED" }
          ].map((s, i) => (
            <div key={i} className="px-12 py-10 hover:bg-spa-cream/30 transition-colors group">
              <h4 className="text-xl mb-2 font-serif group-hover:text-spa-gold transition-colors">{s.name}</h4>
              <p className="text-[9px] opacity-50 uppercase tracking-widest font-black leading-none">{s.time} · {s.price}</p>
            </div>
          ))}
        </div>
        <div className="w-full md:w-1/4 p-12 flex flex-col justify-center border-l border-spa-gold/10 bg-spa-charcoal text-spa-cream">
          <p className="text-[9px] uppercase tracking-widest text-spa-gold mb-3 font-black">Quick Visit</p>
          <p className="text-xs leading-tight opacity-70 mb-4">
            Al Zahiyah, Electra Street,<br/>
            Abu Dhabi, UAE
          </p>
          <Link to="/contact" className="text-[9px] uppercase tracking-widest font-black border-b border-spa-gold w-fit pb-1">Map</Link>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-40 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <div>
              <p className="text-[10px] uppercase tracking-[0.5em] text-spa-gold mb-8 font-black">Selected Treatments</p>
              <h2 className="text-6xl md:text-8xl tracking-tighter">Signature <span className="serif-italic">Rituals</span></h2>
            </div>
            <Link to="/services" className="text-[11px] uppercase tracking-[0.5em] border-b border-spa-gold/30 pb-3 mt-10 md:mt-0 hover:text-spa-gold transition-colors font-black">
              View The Full Menu
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
            {[
              { name: "Deep Tissue", desc: "Intense pressure to release chronic muscle tension and restore structural integrity.", price: "From 350 AED", seed: "spa-massage" },
              { name: "Cupping Therapy", desc: "Traditional technique to stimulate blood flow and enhance physical recovery.", price: "From 275 AED", seed: "spa-cupping" },
              { name: "Steam Bath", desc: "Aromatic steam infusion to detoxify the body and clear the cognitive fog.", price: "From 150 AED", seed: "spa-steam" }
            ].map((service, i) => (
              <motion.div 
                key={i}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }}
                transition={{ duration: 1.2, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="group cursor-default"
                id={`service-card-${i}`}
              >
                <div className="aspect-[4/5] overflow-hidden mb-12 relative rounded-[40px] shadow-soft">
                  <div className="absolute inset-0 bg-spa-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 flex flex-col items-center justify-center p-10 text-center">
                    <span className="text-spa-cream text-[11px] uppercase tracking-[0.5em] border border-spa-cream/30 px-10 py-5 backdrop-blur-md mb-6 rounded-full">Discover</span>
                    <p className="text-spa-cream/60 text-[9px] uppercase tracking-[0.3em] font-light">Limited Booking Windows</p>
                  </div>
                  <img 
                    src={`https://picsum.photos/seed/${service.seed}/1000/1250`} 
                    className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" 
                    referrerPolicy="no-referrer" 
                    alt={service.name}
                  />
                </div>
                <div className="flex items-center space-x-6 mb-6">
                    <h3 className="text-3xl md:text-4xl tracking-tight">{service.name}</h3>
                    <div className="flex-grow h-[1px] bg-spa-gold/15" />
                </div>
                <p className="text-sm text-spa-charcoal/50 mb-10 font-light leading-relaxed max-w-xs group-hover:text-spa-charcoal transition-colors duration-500">{service.desc}</p>
                <div className="flex items-center justify-between">
                    <p className="text-spa-gold font-bold text-[10px] tracking-[0.5em] uppercase">{service.price}</p>
                    <span className="w-1.5 h-1.5 bg-spa-gold/30 rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Therapist */}
      <section className="py-40 px-6 bg-spa-cream">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-24 md:gap-40">
          <div className="w-full md:w-5/12">
            <div className="relative p-6 md:p-12">
              <div className="absolute top-0 left-0 w-1/2 h-1/2 border-t-2 border-l-2 border-spa-gold/20 -z-10" />
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 border-b-2 border-r-2 border-spa-gold/20 -z-10" />
              <img 
                src="https://picsum.photos/seed/spa-specialist/1000/1333" 
                alt="Vishnu" 
                className="w-full aspect-[3/4] object-cover shadow-soft rounded-[40px] grayscale hover:grayscale-0 transition-all duration-[3s]" 
                referrerPolicy="no-referrer" 
              />
            </div>
          </div>
          <div className="w-full md:w-7/12">
            <div className="w-16 h-[1px] bg-spa-gold mb-12" />
            <p className="text-[10px] uppercase tracking-[0.6em] text-spa-gold mb-16 font-black">Signature Practitioner</p>
            <h2 className="text-7xl md:text-9xl mb-16 leading-tight tracking-tighter">Master <br /><span className="serif-italic">Vishnu</span></h2>
            <p className="text-2xl md:text-4xl font-serif italic leading-snug mb-16 font-light text-spa-charcoal/90">
              "True recovery isn't passive. It's an intentional restoration of the structural and mental state."
            </p>
            <p className="text-sm md:text-md font-light leading-relaxed mb-16 text-spa-charcoal/50 max-w-xl">
              With over 12 years of clinical experience in high-end men's health, Vishnu leads with an unmatched understanding of muscular recovery. He specializes in structural integration and neuro-muscular release for high-performance professionals.
            </p>
            <Link to="/about" className="text-[11px] uppercase tracking-[0.5em] font-black border-b-2 border-spa-gold/40 pb-4 hover:border-spa-gold transition-all duration-500">The Power On Ethos</Link>
          </div>
        </div>
      </section>

       {/* Testimonials */}
       <section className="py-40 px-6 bg-spa-charcoal text-spa-cream relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-32">
            <p className="text-[10px] uppercase tracking-[0.7em] text-spa-gold/40 mb-10 font-black">Guest Account</p>
            <div className="w-20 h-[1px] bg-spa-gold/20 mx-auto mb-16" />
            <h2 className="text-6xl md:text-8xl tracking-tighter">Impact <span className="serif-italic">Observed</span></h2>
          </div>
          
          <div className="space-y-40">
            {[
              { text: "The most clinical and professional environment I've experienced in Abu Dhabi. Crucial for post-gym structural reset.", name: "Ahmed K." },
              { text: "Vishnu's technique is peerless. The attention to detail in the acoustics and lighting makes this an essential weekly retreat.", name: "Marcus J." }
            ].map((t, i) => (
              <motion.div 
                key={i} 
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true }}
              >
                <p className="text-3xl md:text-5xl font-serif italic mb-16 leading-tight opacity-95 font-light max-w-3xl px-6 tracking-tight">"{t.text}"</p>
                <div className="flex items-center space-x-10">
                    <span className="w-12 h-[1px] bg-spa-gold/20" />
                    <p className="text-[11px] uppercase tracking-[0.6em] text-spa-gold font-black">{t.name}</p>
                    <span className="w-12 h-[1px] bg-spa-gold/20" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-40 px-6 bg-spa-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-40 items-center">
          <div>
            <div className="w-16 h-[1px] bg-spa-gold mb-16" />
            <h2 className="text-6xl md:text-8xl mb-16 leading-tight tracking-tighter">The <span className="serif-italic">Electra</span> Studio</h2>
            <div className="space-y-20 text-sm font-light">
              <div className="flex items-start group">
                <div className="mr-10 pt-1.5">
                  <div className="w-1.5 h-10 bg-spa-gold/30 group-hover:h-16 transition-all duration-1000" />
                </div>
                <div>
                  <p className="font-black text-spa-charcoal mb-5 uppercase tracking-[0.4em] text-[10px]">Destination</p>
                  <p className="text-spa-charcoal/70 leading-relaxed text-2xl font-serif italic tracking-tight italic">Al Zahiyah, Electra Street,<br />Opposite Electra Park, Abu Dhabi</p>
                </div>
              </div>
              <div className="flex items-start group border-t border-spa-gold/10 pt-16">
                <div className="mr-10 pt-1.5">
                  <div className="w-1.5 h-10 bg-spa-gold/30 group-hover:h-16 transition-all duration-1000" />
                </div>
                <div>
                  <p className="font-black text-spa-charcoal mb-5 uppercase tracking-[0.4em] text-[10px]">Access</p>
                  <p className="text-spa-charcoal/70 leading-relaxed text-2xl font-serif italic tracking-tight italic">Daily Sanctuary: 10:00 — 00:00</p>
                </div>
              </div>
            </div>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noreferrer"
              className="inline-block mt-24 bg-spa-charcoal text-spa-cream px-16 py-7 text-[10px] uppercase tracking-[0.6em] hover:bg-spa-gold transition-all duration-700 rounded-full font-black shadow-soft"
            >
              Get Directions
            </a>
          </div>
          <div className="h-[700px] bg-spa-charcoal overflow-hidden rounded-[40px] relative shadow-soft group">
            <div className="absolute inset-0 grayscale opacity-40 mix-blend-overlay group-hover:scale-110 transition-transform duration-[30s] linear">
              <img 
                src="https://picsum.photos/seed/map-location/1500/1500" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer" 
                alt="Studio location"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center p-16 text-center z-20">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
              >
                <div className="w-24 h-24 border border-spa-gold/30 rounded-full mx-auto mb-12 flex items-center justify-center bg-spa-cream/5 backdrop-blur-sm">
                  <div className="w-2.5 h-2.5 bg-spa-gold rounded-full animate-ping" />
                </div>
                <div className="bg-spa-charcoal/95 backdrop-blur-3xl px-16 py-10 border-t-2 border-spa-gold rounded-sm shadow-2xl">
                    <p className="text-spa-cream text-[11px] uppercase tracking-[0.7em] font-black">Power On Spa</p>
                </div>
              </motion.div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-spa-charcoal/95 to-transparent z-10" />
          </div>
        </div>
      </section>
    </div>
  );
};

const Services = () => (
    <div className="pt-48 pb-40 px-6 bg-spa-cream min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-40">
          <p className="text-[11px] uppercase tracking-[0.6em] text-spa-gold mb-8 font-black">Selection Menu</p>
          <h1 className="text-8xl md:text-[10rem] mb-12 leading-tight tracking-tighter">The <span className="serif-italic">Menu</span></h1>
          <div className="w-32 h-[1px] bg-spa-gold/40 mx-auto" />
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32 lg:gap-48">
          {[
            { category: "Massage Sequence", items: [
              { name: "Deep Tissue", time: "60/90m", price: "350/450 AED", desc: "Technical focus on deep muscular layers for structural restoration." },
              { name: "Swedish", time: "60/90m", price: "300/400 AED", desc: "Rhythmic therapy to down-regulate the nervous system." },
              { name: "Sports Recovery", time: "60/90m", price: "375/475 AED", desc: "Athletic-focused intensive recovery for high-load performance." },
              { name: "Aromatherapy", time: "60/90m", price: "325/425 AED", desc: "Sensory restoration using bespoke botanical extracts." }
            ]},
            { category: "Body Restoration", items: [
              { name: "Cupping Therapy", time: "45m", price: "275 AED", desc: "Decompressive therapy to promote blood flow and metabolic reset." },
              { name: "Steam Ritual", time: "30m", price: "150 AED", desc: "Eucalyptus-infused steam sanctuary for deep detoxification." },
              { name: "Volcanic Scrub", time: "45m", price: "250 AED", desc: "Refined mineral exfoliation to revitalize the epidermis." },
              { name: "Royal Moroccan", time: "90m", price: "550 AED", desc: "Comprehensive ritual of heat, exfoliation, and deep nutritional hydration." }
            ]}
          ].map((group, idx) => (
            <div key={idx} id={`category-group-${idx}`}>
              <h2 className="text-[11px] uppercase tracking-[0.7em] text-spa-gold mb-20 border-b border-spa-gold/15 pb-8 font-black">{group.category}</h2>
              <div className="space-y-20">
                {group.items.map((item, i) => (
                  <div key={i} className="group cursor-default">
                    <div className="flex justify-between items-baseline mb-6">
                      <h3 className="text-3xl md:text-4xl font-serif tracking-tight">{item.name}</h3>
                      <div className="flex-grow mx-8 border-b border-dotted border-spa-charcoal/15" />
                      <span className="text-spa-gold font-bold tracking-[0.2em] text-sm md:text-md">{item.price}</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-spa-charcoal/30 mb-5 font-black">{item.time}</p>
                    <p className="text-sm md:text-md font-light text-spa-charcoal/50 leading-relaxed max-w-lg transition-colors group-hover:text-spa-charcoal duration-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
  
        <div className="mt-48 text-center">
          <Link to="/booking" className="inline-block bg-spa-charcoal text-spa-cream px-20 py-8 text-[11px] uppercase tracking-[0.6em] hover:bg-[#2A2A2A] transition-all duration-700 rounded-full shadow-soft font-black">
            Request Session
          </Link>
        </div>
      </div>
    </div>
  );

const About = () => (
    <div className="pt-48 pb-40 px-6 bg-spa-cream min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-40">
            <p className="text-[11px] uppercase tracking-[0.6em] text-spa-gold mb-8 font-black">Philosophy</p>
            <h1 className="text-8xl md:text-[10rem] mb-12 leading-tight tracking-tighter">Quiet <span className="serif-italic">Superiority</span></h1>
            <div className="w-32 h-[1px] bg-spa-gold/40 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-32 lg:gap-48 items-center mb-40">
            <div className="order-2 md:order-1">
                <h2 className="text-5xl md:text-7xl mb-12 tracking-tighter">The <span className="serif-italic">Technical</span> Retreat</h2>
                <p className="text-2xl font-serif italic leading-snug text-spa-charcoal/80 mb-10 font-light tracking-tight">
                    Power On was engineered for the high-load professional. We facilitate the transition from intense performance to profound rest.
                </p>
                <div className="space-y-8 text-sm md:text-md font-light leading-relaxed text-spa-charcoal/50">
                    <p>
                        In the heart of Abu Dhabi's Al Zahiyah district, we established a space where the noise of the city is neutralized by architecture and intent.
                    </p>
                    <p>
                        We understand the specific physiological requirements of men. Our treatments are not merely relaxing — they are restorative sequences designed to optimize your recovery profile.
                    </p>
                </div>
            </div>
            <div className="order-1 md:order-2">
                <div className="aspect-[4/5] bg-spa-charcoal overflow-hidden rounded-[40px] relative group shadow-soft">
                    <img 
                      src="https://picsum.photos/seed/spa-env-1/1000/1250" 
                      className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-[20s]" 
                      referrerPolicy="no-referrer" 
                      alt="Spa Environment"
                    />
                    <div className="absolute inset-0 border-[30px] border-white/5 pointer-events-none" />
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-32 lg:gap-48 items-center">
            <div>
                <div className="aspect-[4/5] bg-spa-charcoal overflow-hidden rounded-[40px] relative group shadow-soft">
                    <img 
                      src="https://picsum.photos/seed/spa-details-1/1000/1250" 
                      className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-[20s]" 
                      referrerPolicy="no-referrer" 
                      alt="Spa Details"
                    />
                    <div className="absolute inset-0 border-[30px] border-white/5 pointer-events-none" />
                </div>
            </div>
            <div>
                <h2 className="text-5xl md:text-7xl mb-12 tracking-tighter">Controlled <span className="serif-italic">Environment</span></h2>
                <p className="text-2xl font-serif italic leading-snug text-spa-charcoal/80 mb-10 font-light tracking-tight">
                    Every element is calculated. Textures of stone, cedar, and brushed brass anchors the subconscious. 
                </p>
                <div className="space-y-8 text-sm md:text-md font-light leading-relaxed text-spa-charcoal/50 mb-12">
                    <p>
                        Sensory architecture is the foundation of our studio. From the sub-bass frequencies in our soundscape to the precise Kelvin-rating of our lighting, we target the parasympathetic nervous system with precision.
                    </p>
                    <p>
                        This is not "pampering." This is the deliberate recalibration of the human machine.
                    </p>
                </div>
                <div className="w-16 h-[1px] bg-spa-gold/30 mb-8" />
                <p className="text-[11px] uppercase tracking-[0.6em] font-black text-spa-gold">The Architecture of Stillness</p>
            </div>
        </div>
      </div>
    </div>
);

const Booking = () => (
    <div className="pt-48 pb-40 px-6 bg-spa-cream min-h-screen font-light">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-32">
            <p className="text-[11px] uppercase tracking-[0.6em] text-spa-gold mb-12 font-black">Availability</p>
            <h1 className="text-8xl md:text-[10rem] mb-12 leading-tight tracking-tighter">Reserve <span className="serif-italic">Time</span></h1>
            <div className="w-32 h-[1px] bg-spa-gold/30 mx-auto" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white p-12 md:p-24 shadow-soft rounded-[40px] border-t-8 border-spa-gold relative overflow-hidden"
          id="booking-form-container"
        >
            <div className="absolute top-0 right-0 w-64 h-64 border-t border-r border-spa-gold/10 -mr-32 -mt-32 rounded-full" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
                <div className="space-y-6">
                    <label className="text-[11px] uppercase tracking-[0.5em] font-black text-spa-gold border-b border-spa-gold/10 pb-2 block">Identity</label>
                    <input type="text" className="w-full bg-spa-cream/50 p-6 text-md focus:outline-none border-b border-transparent focus:border-spa-gold transition-all" placeholder="Legal Name" />
                </div>
                <div className="space-y-6">
                    <label className="text-[11px] uppercase tracking-[0.5em] font-black text-spa-gold border-b border-spa-gold/10 pb-2 block">Chronos</label>
                    <input type="date" className="w-full bg-spa-cream/50 p-6 text-md focus:outline-none border-b border-transparent focus:border-spa-gold transition-all" />
                </div>
            </div>
            <div className="space-y-6 mb-16">
                <label className="text-[11px] uppercase tracking-[0.5em] font-black text-spa-gold border-b border-spa-gold/10 pb-2 block">Ritual Selection</label>
                <div className="relative">
                    <select className="w-full bg-spa-cream/50 p-6 text-md focus:outline-none border-b border-transparent focus:border-spa-gold transition-all appearance-none cursor-pointer">
                        <option>Primary Treatment Sequence</option>
                        <option>Deep Tissue Recovery (60m)</option>
                        <option>Royal Moroccan Immersion (90m)</option>
                        <option>Sports Structural Reset (90m)</option>
                        <option>Decompressive Cupping (60m)</option>
                        <option>Detox Steam & Focus (60m)</option>
                    </select>
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none">
                        <div className="w-2.5 h-2.5 border-r border-b border-spa-gold/40 rotate-45" />
                    </div>
                </div>
            </div>
            <div className="space-y-6 mb-20">
                <label className="text-[11px] uppercase tracking-[0.5em] font-black text-spa-gold border-b border-spa-gold/10 pb-2 block">Special Directives</label>
                <textarea className="w-full bg-spa-cream/50 p-6 text-md focus:outline-none border-b border-transparent focus:border-spa-gold transition-all h-48 resize-none leading-relaxed" placeholder="Specify physical focus areas or medical requirements..."></textarea>
            </div>
            <button className="w-full bg-spa-charcoal text-spa-cream py-8 rounded-full uppercase tracking-[0.6em] text-[11px] hover:bg-[#2A2A2A] transition-all duration-700 font-black shadow-soft relative group overflow-hidden">
                <span className="relative z-10">Request Reservation</span>
                <div className="absolute inset-0 bg-spa-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
            </button>
            <div className="mt-16 pt-16 border-t border-spa-charcoal/5 flex flex-col md:flex-row justify-between items-center gap-10">
                <p className="text-[10px] text-spa-charcoal/40 uppercase tracking-[0.3em] max-w-sm text-center md:text-left leading-relaxed">
                    Personal concierge will verify specialist availability and confirm via direct channel within 60 minutes.
                </p>
                <a href="https://wa.me/971500000000" className="text-[11px] uppercase tracking-[0.4em] font-black text-spa-gold hover:opacity-100 opacity-60 transition-all border-b border-spa-gold/20 pb-2">Connect via WhatsApp</a>
            </div>
        </motion.div>
      </div>
    </div>
);

const Contact = () => (
    <div className="pt-48 pb-40 px-6 bg-spa-cream min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-40">
            <p className="text-[11px] uppercase tracking-[0.6em] text-spa-gold mb-8 font-black">Studio Access</p>
            <h1 className="text-8xl md:text-[10rem] mb-12 leading-tight tracking-tighter">Direct <span className="serif-italic">Channel</span></h1>
            <div className="w-32 h-[1px] bg-spa-gold/40 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-32 lg:gap-48 items-start">
            <div className="space-y-32 transition-all duration-1000">
                <div className="group">
                    <h3 className="text-[11px] uppercase tracking-[0.6em] text-spa-gold mb-12 font-black border-l-2 border-spa-gold/20 pl-6 group-hover:border-spa-gold transition-all duration-700">The Destination</h3>
                    <p className="text-4xl md:text-5xl font-serif mb-8 tracking-tighter italic">Al Zahiyah, Electra Street<br />Abu Dhabi, UAE</p>
                    <p className="text-sm md:text-md font-light text-spa-charcoal/50 leading-relaxed max-w-md">
                        Centrally positioned in Al Zahiyah. Opposite Electra Park. Concierge valet parking available at the west entrance.
                    </p>
                </div>
                <div className="group">
                    <h3 className="text-[11px] uppercase tracking-[0.6em] text-spa-gold mb-12 font-black border-l-2 border-spa-gold/20 pl-6 group-hover:border-spa-gold transition-all duration-700">Direct Comms</h3>
                    <p className="text-4xl md:text-5xl font-serif mb-6 tracking-tighter italic">+971 2 000 0000</p>
                    <p className="text-4xl md:text-5xl font-serif mb-10 tracking-tighter italic">hello@poweronspa.ae</p>
                    <p className="text-sm md:text-md font-light text-spa-charcoal/50 leading-relaxed max-w-md">
                        Our private line is monitored 24/7. Same-day treatment requests are best facilitated via WhatsApp.
                    </p>
                </div>
                <div>
                   <div className="w-16 h-[1px] bg-spa-gold/20 mb-8" />
                   <div className="flex space-x-16">
                        <Link to="#" className="text-[11px] uppercase tracking-[0.5em] font-black hover:text-spa-gold transition-colors">Instagram</Link>
                        <Link to="#" className="text-[11px] uppercase tracking-[0.5em] font-black hover:text-spa-gold transition-colors">Facebook</Link>
                    </div>
                </div>
            </div>
            <div className="h-[800px] w-full bg-white relative rounded-[40px] shadow-soft overflow-hidden group">
                 <img 
                    src="https://picsum.photos/seed/spa-map-location/1500/2000" 
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-105 transition-transform duration-[40s] linear" 
                    referrerPolicy="no-referrer" 
                    alt="Map"
                />
                 <div className="absolute inset-0 bg-spa-charcoal/5 flex flex-col items-center justify-center p-16 text-center pointer-events-none z-10">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 2 }}
                    >
                        <div className="w-24 h-24 border border-spa-gold/30 rounded-full flex items-center justify-center mb-10 bg-white/5 backdrop-blur-md">
                           <div className="w-1.5 h-1.5 bg-spa-gold rounded-full animate-ping" />
                        </div>
                        <div className="bg-white/95 backdrop-blur-3xl p-12 border-t-8 border-spa-gold shadow-soft rounded-2xl">
                            <p className="text-spa-charcoal font-serif text-4xl mb-4 tracking-tighter italic">Power On Men's Spa</p>
                            <p className="text-[11px] uppercase tracking-[0.7em] text-spa-charcoal/40 font-black">Abu Dhabi • Electra St</p>
                        </div>
                    </motion.div>
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-t from-spa-cream via-transparent to-transparent z-1" />
            </div>
        </div>
      </div>
    </div>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans selection:bg-spa-gold/30 selection:text-spa-charcoal bg-spa-cream">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}
