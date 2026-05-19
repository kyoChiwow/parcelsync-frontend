import { Users, Target, Award, Rocket, ArrowRight, ShieldCheck, Zap } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Ahmed",
      role: "CEO & Founder",
      image: "/team/sarah.jpg",
      bio: "10+ years in logistics, passionate about simplifying deliveries.",
    },
    {
      name: "Rafiq Hasan",
      role: "CTO",
      image: "/team/rafiq.jpg",
      bio: "Full-stack wizard, building reliable tech that moves parcels faster.",
    },
    {
      name: "Nusrat Jahan",
      role: "Head of Operations",
      image: "/team/nusrat.jpg",
      bio: "Ensuring every package reaches its destination on time, every time.",
    },
  ];

  const stats = [
    { icon: Rocket, value: "10,000+", label: "Daily Deliveries" },
    { icon: Users, value: "5,000+", label: "Active Users" },
    { icon: Target, value: "99.2%", label: "On-Time Delivery" },
    { icon: Award, value: "50+", label: "Cities Covered" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 selection:bg-orange-500 selection:text-white overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-28 bg-white dark:bg-neutral-950 border-b border-neutral-200/60 dark:border-neutral-800/50">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] bg-size-[24px_24px] opacity-40 pointer-events-none" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-150 h-75 bg-orange-400/10 dark:bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 rounded-full border border-orange-100 dark:border-orange-900/30 mb-6 animate-fade-in">
            <Zap className="w-3.5 h-3.5 fill-current" /> Our Story
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl bg-linear-to-r from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
            Redefining Logistics <br className="hidden sm:block"/>
            <span className="bg-linear-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">For The Modern Era</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto font-normal">
            Whether you’re sending a personal gift or scale‑managing enterprise e‑commerce shipments, ParcelSync provides real‑time tracking, role‑based precision tools, and a frictionless experience.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-32 container mx-auto px-4 max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Card 1: Mission */}
          <div className="group relative p-8 rounded-3xl border border-neutral-200/70 dark:border-neutral-800/60 bg-white dark:bg-neutral-900/40 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30 dark:hover:border-orange-500/20 hover:shadow-2xl hover:shadow-orange-500/3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/20 mb-6">
              <Rocket className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              To make parcel delivery effortless for everyone. We empower senders, receivers, and fleet admins with intuitive tools to create, orchestrate, and trace shipments — all nested harmoniously under a single digital hub.
            </p>
          </div>

          {/* Card 2: Vision */}
          <div className="group relative p-8 rounded-3xl border border-neutral-200/70 dark:border-neutral-800/60 bg-white dark:bg-neutral-900/40 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30 dark:hover:border-orange-500/20 hover:shadow-2xl hover:shadow-orange-500/3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-900 dark:bg-neutral-800 text-white dark:text-orange-400 border border-neutral-800 dark:border-neutral-700 mb-6 shadow-lg">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
              Our Vision
            </h2>
            <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              A world where borders and distances never stifle connectivity. We are engineering a responsive, intelligently routed, eco‑conscious delivery network that permanently pushes the paradigm of speed and trust.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-neutral-900 dark:bg-neutral-900/40 border-y border-neutral-800 relative">
        <div className="absolute inset-0 bg-radial-from-center from-orange-500/2 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid grid-cols-2 gap-y-12 gap-x-6 md:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center group">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-800 border border-neutral-700 text-orange-400 transition-all duration-300 group-hover:scale-110 group-hover:border-orange-500/50 group-hover:shadow-lg group-hover:shadow-orange-500/10">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-5 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                  {value}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 lg:py-32 container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">Talent Behind The Tech</span>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl mt-2">
            Meet Our Leadership Team
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 mt-3">
            The operators, builders, and dreamers orchestrating frictionless global parcel systems.
          </p>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="group relative rounded-3xl border border-neutral-200/60 dark:border-neutral-800/70 bg-white dark:bg-neutral-900/30 p-6 transition-all duration-300 hover:shadow-xl hover:border-neutral-300 dark:hover:border-neutral-700 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-28 w-28 mx-auto mb-6">
                  <div className="absolute inset-0 bg-linear-to-tr from-orange-500 to-amber-400 rounded-full scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xs" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="relative h-28 w-28 rounded-full object-cover bg-neutral-100 dark:bg-neutral-800 border-2 border-white dark:border-neutral-900"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white transition-colors group-hover:text-orange-600 dark:group-hover:text-orange-400">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 mt-1">
                    {member.role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 px-2">
                    "{member.bio}"
                  </p>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center justify-center text-xs font-semibold text-neutral-400 dark:text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Profile <ArrowRight className="w-3 h-3 ml-1 transform group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
