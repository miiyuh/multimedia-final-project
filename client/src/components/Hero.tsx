export default function Hero() {
  const scrollToCase = () => {
    document.getElementById('case')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-dark-900 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 to-accent-green/20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-dark-900 opacity-60"></div>
        <div className="scanline absolute inset-0 opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-mono font-bold text-white mb-2">
          <span className="text-accent-blue">Ransomware</span> Incident
        </h1>
        <div className="h-1 w-24 mx-auto bg-accent-blue mb-6"></div>
        <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto mb-8">
          You're the lead digital forensic investigator on a critical ransomware case. 
          Your decisions will determine if the culprits are caught and data recovered.
        </p>
        <div className="inline-block font-code text-accent-green mb-8 max-w-xl mx-auto overflow-hidden whitespace-nowrap border-r-2 border-accent-green animate-[typing_3.5s_steps(40,end),blink_.75s_step-end_infinite]">
          &gt; Initiating investigation protocol...
        </div>
        <div>
          <button 
            onClick={scrollToCase}
            className="bg-accent-blue hover:bg-accent-blue-dark text-white font-bold py-3 px-8 rounded-md transition duration-300 transform hover:scale-105"
          >
            Begin Investigation
          </button>
        </div>
      </div>
    </section>
  );
}
