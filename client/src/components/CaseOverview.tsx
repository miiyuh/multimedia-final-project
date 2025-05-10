import { useState, useEffect } from 'react';

export default function CaseOverview() {
  const [countdown, setCountdown] = useState({
    hours: 23,
    minutes: 16,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let newSeconds = prev.seconds - 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }

        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }

        if (newHours < 0) {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }

        return {
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
  };

  return (
    <section id="case" className="py-16 bg-dark-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-mono font-bold mb-6 flex items-center">
              <span className="text-accent-blue mr-2">#</span> Case Overview
            </h2>
            <div className="bg-dark-700 border border-dark-600 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="h-8 w-1 bg-accent-red mr-3"></div>
                <h3 className="text-xl font-semibold">Incident Report: Ransomware Attack</h3>
              </div>
              <p className="text-gray-300 mb-4">
                At 03:27 AM on October 12, 2023, TechGlobal Corporation detected unauthorized access to their network. By 05:15 AM, employees reported locked systems and ransom notes demanding $2.7 million in cryptocurrency.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Case ID</p>
                  <p className="font-mono text-accent-blue">CR-2023-10567</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Priority</p>
                  <p className="font-mono text-accent-red">CRITICAL</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Affected Systems</p>
                  <p className="font-mono">237 Endpoints</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Ransom Demand</p>
                  <p className="font-mono">$2,700,000</p>
                </div>
              </div>
              <div className="border-t border-dark-500 pt-4">
                <p className="text-gray-300 mb-2">
                  Initial analysis suggests the attack vector was a phishing email with a malicious attachment. The ransomware has encrypted critical business files and databases across multiple departments.
                </p>
                <p className="text-accent-green mb-0 font-medium">
                  Your mission is to investigate the attack, trace the perpetrators, and advise on recovery options.
                </p>
              </div>
            </div>

            <div className="bg-dark-700 border border-dark-600 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="h-8 w-1 bg-accent-blue mr-3"></div>
                <h3 className="text-xl font-semibold">Your Objectives</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-blue mt-0.5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Identify the initial attack vector and payload delivery method</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-blue mt-0.5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Analyze the ransomware strain and its technical characteristics</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-blue mt-0.5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Trace cryptocurrency payments and attacker communication channels</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-blue mt-0.5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Determine lateral movement and data exfiltration scope</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-blue mt-0.5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Recommend recovery strategy and security improvements</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="bg-dark-700 border border-dark-600 rounded-lg overflow-hidden h-full">
              <div className="bg-dark-800 px-6 py-4 border-b border-dark-600 flex items-center justify-between">
                <h3 className="font-mono text-lg">Case Intelligence Dashboard</h3>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-accent-red"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-accent-green"></div>
                </div>
              </div>
              <div className="p-6">
                <div className="relative bg-dark-800 rounded-lg overflow-hidden mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800" 
                    alt="Ransomware attack visualization" 
                    className="w-full h-48 object-cover opacity-80"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-dark-900 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <h4 className="text-white font-bold mb-1">Ransomware Infection Map</h4>
                    <p className="text-sm text-gray-300">237 systems infected across 4 global locations</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-dark-800 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm text-gray-400">Initial Infection</h4>
                      <span className="text-xs text-accent-blue">03:27 AM</span>
                    </div>
                    <p className="font-mono text-2xl">Patient Zero</p>
                    <p className="text-sm text-gray-300">Marketing Department Workstation</p>
                  </div>
                  <div className="bg-dark-800 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm text-gray-400">Ransom Timer</h4>
                      <span className="text-xs text-accent-red">CRITICAL</span>
                    </div>
                    <p className="font-mono text-2xl">
                      {formatTime(countdown.hours)}:{formatTime(countdown.minutes)}:{formatTime(countdown.seconds)}
                    </p>
                    <p className="text-sm text-accent-red">Until data deletion threat</p>
                  </div>
                </div>

                <div className="bg-dark-800 rounded-lg mb-6 overflow-hidden">
                  <div className="p-4 border-b border-dark-600">
                    <h4 className="font-medium">Ransom Note (Decoded)</h4>
                  </div>
                  <div className="p-4 font-code text-sm text-accent-green">
                    <p className="mb-2">YOUR NETWORK HAS BEEN INFILTRATED AND YOUR FILES ARE ENCRYPTED.</p>
                    <p className="mb-2">ALL SENSITIVE DATA HAS BEEN COPIED TO OUR SECURE SERVERS.</p>
                    <p className="mb-2">TO DECRYPT YOUR FILES AND PREVENT DATA LEAK, PAY 75 BITCOIN TO:</p>
                    <p className="bg-dark-900 p-2 rounded mb-2 break-all">bc1q84nw6v9wzhy5h4929rvx7th9ve508xezkrlfd0rz0nm23qgv25qszfv9yn</p>
                    <p className="mb-2">YOU HAVE 48 HOURS TO COMPLY OR YOUR DATA WILL BE SOLD ON THE DARK WEB.</p>
                    <p className="mb-0">-- THE SHADOW SYNDICATE</p>
                  </div>
                </div>

                <div className="bg-dark-800 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-2 h-2 rounded-full bg-accent-green mr-2 animate-pulse"></div>
                    <h4 className="font-medium">Initial Analysis</h4>
                  </div>
                  <p className="text-sm text-gray-300 mb-0">
                    Preliminary signature analysis suggests this is a variant of the "ShadowLock" ransomware strain, previously associated with attacks on financial institutions in Eastern Europe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
