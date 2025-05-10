import { timelineEvents } from "@/lib/data";

export default function Timeline() {
  return (
    <section id="timeline" className="py-16 bg-dark-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-mono font-bold mb-2 flex items-center">
          <span className="text-accent-blue mr-2">#</span> Attack Timeline
        </h2>
        <p className="text-gray-400 mb-10 max-w-3xl">Reconstruct the sequence of events leading to the ransomware infection and subsequent activity.</p>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-1 bg-dark-700 transform -translate-x-1/2"></div>
          
          {/* Timeline events */}
          <div className="relative">
            {timelineEvents.map((event, index) => (
              <div key={index} className="timeline-event mb-16 md:mb-12 flex flex-col md:flex-row items-start">
                {index % 2 === 0 ? (
                  // Left side event
                  <>
                    <div className="order-1 md:w-1/2 pr-0 md:pr-8 md:text-right">
                      <span className="inline-block text-xs font-mono bg-dark-700 px-2 py-1 rounded mb-2">{event.date}</span>
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <p className="text-gray-400 mb-2">{event.description}</p>
                      <div className="inline-block bg-dark-800 px-3 py-1 rounded-full text-xs font-mono">EVENT #{String(index + 1).padStart(3, '0')}</div>
                    </div>
                    <div className="order-0 md:order-2 md:w-1/2 relative mb-4 md:mb-0">
                      <div className={`timeline-node absolute top-0 left-6 md:left-0 w-8 h-8 bg-dark-800 border-2 ${index === timelineEvents.length - 1 ? 'border-accent-red' : 'border-accent-blue'} rounded-full transform md:translate-x-0 -translate-x-1/2 flex items-center justify-center${index === 0 ? ' active' : ''}`}>
                        <div className={`w-2 h-2 ${index === timelineEvents.length - 1 ? 'bg-accent-red animate-pulse' : 'bg-accent-blue'} rounded-full`}></div>
                      </div>
                      <div className="pl-12 md:pl-8">
                        <div className="bg-dark-800 rounded-lg overflow-hidden">
                          <img 
                            src={event.image} 
                            alt={event.title} 
                            className="w-full h-32 object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  // Right side event
                  <>
                    <div className="order-1 md:order-0 md:w-1/2 pl-0 md:pl-8">
                      <span className="inline-block text-xs font-mono bg-dark-700 px-2 py-1 rounded mb-2">{event.date}</span>
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <p className="text-gray-400 mb-2">{event.description}</p>
                      <div className="inline-block bg-dark-800 px-3 py-1 rounded-full text-xs font-mono">EVENT #{String(index + 1).padStart(3, '0')}</div>
                    </div>
                    <div className="order-0 md:w-1/2 relative mb-4 md:mb-0">
                      <div className={`timeline-node absolute top-0 left-6 md:right-0 w-8 h-8 bg-dark-800 border-2 ${index === timelineEvents.length - 1 ? 'border-accent-red' : 'border-accent-blue'} rounded-full transform md:translate-x-0 -translate-x-1/2 flex items-center justify-center`}>
                        <div className={`w-2 h-2 ${index === timelineEvents.length - 1 ? 'bg-accent-red animate-pulse' : 'bg-accent-blue'} rounded-full`}></div>
                      </div>
                      <div className="pl-12 md:pr-8 md:pl-0 md:text-right">
                        <div className="bg-dark-800 rounded-lg overflow-hidden">
                          <img 
                            src={event.image} 
                            alt={event.title} 
                            className="w-full h-32 object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
