/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HardHat, Award, ShieldAlert, FileText, CheckCircle, ChevronDown, Send } from 'lucide-react';
import { JobOpening } from '../types';

export default function CareersSection() {
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);
  
  // Application Form State
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantExp, setApplicantExp] = useState('3-5');
  const [applicantApplied, setApplicantApplied] = useState(false);

  const jobs: JobOpening[] = [
    {
      id: 'substation-tech',
      title: 'High-Voltage Substation Specialist',
      department: 'Heavy Field Operations',
      location: 'Substation Core (Statewide Support)',
      type: 'Full-Time (Union)',
      experience: '5+ Years Certified',
      description: 'Laying, testing, and commissioning heavy distribution transformers, medium-voltage vacuum breakers, and outdoor high-bus yard components.',
      requirements: [
        'OSHA 30 Certification + MSHA-approved safety compliance standards',
        'Demonstrated competence on 13.8kV to 110kV switchgear assembly',
        'Valid Class A CDL commercial license preferred for heavy utility transport',
        'Experience interpreting structural electrical BIM designs (LOD 400)'
      ]
    },
    {
      id: 'journeyman-electrician',
      title: 'Licensed Journeyman Industrial Electrician',
      department: 'Facility Infrastructure',
      location: 'Silicon District / Dublin Core',
      type: 'Full-Time (Union)',
      experience: 'Journeyman License',
      description: 'Routing large scale copper conduit setups, structural overhead busways, industrial motor starter control panels, and multi-cabinet programmable logic arrays.',
      requirements: [
        'Active State or Regional Journeyman Electrical license credentials',
        'Demonstrated skills in solid pipe bending, rigid conduit routing, and wire pulling',
        'In-depth knowledge of current NEC (National Electrical Code) codes',
        'Willingness to pass a physical wellness exam and regular safety assessments'
      ]
    },
    {
      id: 'lead-estimator',
      title: 'Senior Commercial Electrical Estimator',
      department: 'Corporate Engineering Guild',
      location: 'Dublin Headquarters (Hybrid Allowed)',
      type: 'Full-Time / Exempt',
      experience: '7+ Years Estimating',
      description: 'Leading massive bid-phase efforts for mission-critical datacenter infrastructure, sustainable energy solar arrays, and high-rise commercial structures.',
      requirements: [
        'Advanced proficiency using electrical estimation engines (ConEst, McCormick, or Accubid)',
        'Demonstrated catalog of won/commissioned commercial bids greater than $5M value',
        'Strong communication skills with architectural engineering boards and general developers',
        'Engineering Degree in Power Systems or equivalent field journeyman experience'
      ]
    }
  ];

  const handleApplyAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail || !applicantPhone) return;

    setApplicantApplied(true);
    setTimeout(() => {
      setApplicantApplied(false);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantPhone('');
      setApplyingJobId(null);
    }, 5000);
  };

  return (
    <div className="space-y-8" id="careers-section">
      {/* Safety highlight first */}
      <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
        <div className="p-4 bg-amber-500/10 rounded-xl text-amber-500 flex-shrink-0 animate-pulse">
          <HardHat className="h-8 w-8" />
        </div>
        <div>
          <span className="text-[10px] font-mono tracking-wider font-bold text-amber-600 bg-amber-500/10 px-2.5 py-0.5 rounded-full uppercase">Safety Paradigm</span>
          <h4 className="text-lg font-display font-bold text-gray-900 mt-1">Zero-Harm (0.0 TRIR) Safety Record</h4>
          <p className="text-gray-600 text-xs mt-1 leading-relaxed">
            Safety isn&apos;t secondary; it is the absolute foundation of our field. Every single team member participates in continuous OSHA guidelines, high-voltage line certifications, and structured tool calibration modules.
          </p>
        </div>
      </div>

      {/* Grid of positions */}
      <div className="space-y-4">
        <h4 className="text-xl font-display font-semibold text-gray-900 border-b border-gray-100 pb-2">Active Field Openings</h4>
        
        {jobs.map((job) => {
          const isExpanded = activeJobId === job.id;
          const isApplying = applyingJobId === job.id;

          return (
            <div 
              key={job.id} 
              className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${
                isExpanded ? 'border-gray-200' : 'border-gray-100 hover:border-gray-150 shadow-xs'
              }`}
            >
              {/* Header block */}
              <div 
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
                onClick={() => {
                  if (activeJobId === job.id) {
                    setActiveJobId(null);
                    setApplyingJobId(null);
                  } else {
                    setActiveJobId(job.id);
                  }
                }}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-1">
                    <span className="font-mono text-[10px] uppercase font-bold text-gray-400 bg-gray-50 px-2.5 py-0.5 rounded-full">{job.department}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                  <h5 className="text-base font-bold text-gray-900 leading-tight">{job.title}</h5>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs font-mono font-bold text-gray-600 block">{job.type}</span>
                    <span className="text-[10px] text-gray-400 block">{job.experience}</span>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {/* Collapsed content body */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden bg-gray-50/50 border-t border-gray-100"
                  >
                    <div className="p-5 space-y-4">
                      {/* Mobile indicators */}
                      <div className="flex flex-wrap gap-3 text-xs sm:hidden border-b border-gray-100 pb-3">
                        <span className="bg-gray-100 px-2 py-0.5 rounded font-semibold text-gray-700">{job.type}</span>
                        <span className="bg-gray-100 px-2 py-0.5 rounded font-semibold text-gray-700">{job.experience}</span>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Role Description:</span>
                        <p className="text-xs text-gray-600 leading-relaxed font-sans">{job.description}</p>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-gray-400 uppercase block mb-2">Qualifications & Requirements:</span>
                        <ul className="space-y-1.5 text-xs text-gray-600">
                          {job.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#0012FF] mt-1.5 flex-shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Apply button & Apply Drawer form */}
                      <div className="pt-4 border-t border-gray-200/60">
                        <AnimatePresence mode="wait">
                          {isApplying ? (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="bg-white border border-gray-100 p-5 rounded-xl shadow-inner space-y-4"
                            >
                              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                <span className="text-xs font-bold text-gray-800">Submit Credentials for {job.title}</span>
                                <button
                                  type="button"
                                  onClick={() => setApplyingJobId(null)}
                                  className="text-xs text-gray-400 hover:text-gray-700 underline"
                                >
                                  Cancel application
                                </button>
                              </div>

                              {applicantApplied ? (
                                <motion.div 
                                  initial={{ scale: 0.98, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  className="text-center py-6 text-emerald-600"
                                >
                                  <CheckCircle className="h-8 w-8 mx-auto text-emerald-500 mb-2 animate-bounce" />
                                  <span className="font-bold block text-gray-900 text-sm">Application Sent Successfully!</span>
                                  <span className="text-xs text-gray-500 mt-1 block">X Elektrik Recruiting has staged your file. No email accounts were connected.</span>
                                </motion.div>
                              ) : (
                                <form onSubmit={handleApplyAction} className="space-y-3">
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-mono text-gray-400 uppercase block">Full Name</label>
                                      <input
                                        required
                                        type="text"
                                        placeholder="Skilled Applicant"
                                        value={applicantName}
                                        onChange={(e) => setApplicantName(e.target.value)}
                                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#0012FF] outline-none"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-mono text-gray-400 uppercase block">Your Email</label>
                                      <input
                                        required
                                        type="email"
                                        placeholder="app@example.com"
                                        value={applicantEmail}
                                        onChange={(e) => setApplicantEmail(e.target.value)}
                                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#0012FF] outline-none"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-mono text-gray-400 uppercase block">Phone / Mobile</label>
                                      <input
                                        required
                                        type="tel"
                                        placeholder="+1 (555) 0199"
                                        value={applicantPhone}
                                        onChange={(e) => setApplicantPhone(e.target.value)}
                                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#0012FF] outline-none"
                                      />
                                    </div>
                                  </div>

                                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                      <FileText className="h-4 w-4" />
                                      <span>CV attachment not required for simulator state submission.</span>
                                    </div>
                                    <button
                                      type="submit"
                                      className="py-2.5 px-6 rounded-lg bg-gray-900 text-white font-bold hover:bg-gray-800 transition text-xs uppercase flex items-center gap-1.5 cursor-pointer"
                                    >
                                      <span>Send Application Packet</span>
                                      <Send className="h-3 w-3" />
                                    </button>
                                  </div>
                                </form>
                              )}
                            </motion.div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setApplyingJobId(job.id)}
                              className="py-2 px-5 rounded-lg bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold uppercase transition flex items-center gap-1.5 cursor-pointer"
                            >
                              <span>Apply for this Position</span>
                              <ChevronDown className="h-3.5 w-3.5 rotate-270" />
                            </button>
                          )}
                        </AnimatePresence>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
