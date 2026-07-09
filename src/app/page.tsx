'use client'

export default function Home() {
  return (
    <main className="overflow-x-hidden w-full" style={{
      /* RESPONSIVE FIX: Added position: relative to establish positioning context so overflow-x-hidden successfully clips absolute elements */
      position: 'relative',
      minHeight: '100vh',
      background: '#EAEFF5',
      fontFamily: 'Inter, sans-serif',
      color: '#0A2540'
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 1px rgba(99,91,255,0.2), 0 32px 64px rgba(99,91,255,0.15); }
          50% { box-shadow: 0 0 0 1px rgba(99,91,255,0.4), 0 32px 64px rgba(99,91,255,0.25); }
        }
        .fade-in-up {
          opacity: 0;
          animation: fadeUp 0.8s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .pulse-card {
          animation: pulseGlow 4s ease-in-out infinite;
        }
        .hover-lift {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(10,37,64,0.1) !important;
        }

        /* RESPONSIVE FIX: Added media queries to override specific fixed inline styles ONLY on mobile screens */
        @media (max-width: 768px) {
          /* Prevent horizontal overflow on navbar by scaling down fonts and gaps for 320px screens */
          .resp-nav { padding: 16px 16px !important; }
          .resp-nav-logo { font-size: 20px !important; }
          .resp-nav-buttons { gap: 12px !important; }
          .resp-nav-link { font-size: 14px !important; }
          .resp-nav-btn { padding: 8px 12px !important; font-size: 13px !important; }
          
          /* Prevent fixed layout overflow by switching to 1 column */
          .resp-hero { grid-template-columns: 1fr !important; padding: 120px 16px 60px !important; gap: 40px !important; }
          .resp-h1 { font-size: 40px !important; }
          
          .resp-stats { grid-template-columns: 1fr !important; padding: 40px 16px !important; gap: 24px !important; }
          .resp-section { padding: 60px 16px !important; }
          .resp-grid-2 { grid-template-columns: 1fr !important; gap: 40px !important; }
          .resp-grid-3 { grid-template-columns: 1fr !important; gap: 24px !important; }
          
          /* Prevent feature card padding from squashing text on narrow screens */
          .resp-feature-card { padding: 24px !important; }
          
          /* Convert flex rows to flex columns to prevent overflow */
          .resp-flex-col { flex-direction: column !important; gap: 40px !important; }
          .resp-footer-links { flex-direction: column !important; gap: 24px !important; }
          
          /* Typography scaling */
          .resp-h2 { font-size: 32px !important; }
          .resp-h2-large { font-size: 40px !important; }
          
          /* Hide absolute decorative elements that break stacked layouts */
          .resp-hide-mobile { display: none !important; }
          
          /* Stack buttons inside hero to prevent button text clipping */
          .resp-buttons { flex-direction: column !important; align-items: stretch !important; gap: 16px !important; }
        }
      `}} />

      {/* Stripe Light Background Pattern */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '100vh', zIndex: 0,
        backgroundSize: '100px 100px',
        backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)',
        pointerEvents: 'none'
      }}></div>
      <div className="resp-bg" style={{
        position: 'absolute', top: '-10%', right: '-5%', width: '700px', height: '500px',
        background: 'linear-gradient(135deg, #7A73FF 0%, #00D4FF 100%)',
        transform: 'rotate(-15deg)', opacity: 0.15, filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none', borderRadius: '100px'
      }}></div>

      {/* NAVBAR */}
      <nav className="resp-nav" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 48px',
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(10,37,64,0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          <span className="resp-nav-logo" style={{ color: '#0A2540', fontSize: '24px', fontWeight: '800', letterSpacing: '-1px' }}>SehatKosh</span>
          <div style={{ display: 'flex', gap: '32px', color: '#425466', fontWeight: '600', fontSize: '15px' }} className="hidden md:flex">
            <a href="#features" className="hover-lift" style={{ cursor: 'pointer', textDecoration: 'none', color: '#425466', boxShadow: 'none' }}>Features</a>
            <a href="#how-it-works" className="hover-lift" style={{ cursor: 'pointer', textDecoration: 'none', color: '#425466', boxShadow: 'none' }}>How it Works</a>
            <a href="#treasury" className="hover-lift" style={{ cursor: 'pointer', textDecoration: 'none', color: '#425466', boxShadow: 'none' }}>Savings</a>
          </div>
        </div>
        
        <div className="resp-nav-buttons" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a href="/login" className="resp-nav-link hover-lift" style={{ background: 'transparent', border: 'none', color: '#425466', cursor: 'pointer', fontSize: '15px', fontWeight: '600', textDecoration: 'none', boxShadow: 'none' }}>Login</a>
          <a href="/login" className="hover-lift resp-nav-btn" style={{ background: '#0A2540', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', textDecoration: 'none', whiteSpace: 'nowrap' }}>Get Started</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="resp-hero" style={{ maxWidth: '1200px', margin: '0 auto', padding: '160px 48px 100px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px', alignItems: 'center', position: 'relative', zIndex: 10 }}>
        
        {/* Left */}
        <div className="fade-in-up">
          <div style={{ color: '#635BFF', fontSize: '14px', fontWeight: '700', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <span style={{ background: 'rgba(99,91,255,0.1)', padding: '6px 12px', borderRadius: '6px' }}>✦ Hackathon Project</span>
          </div>
          
          <h1 className="resp-h1" style={{ fontSize: '72px', fontWeight: '800', color: '#0A2540', lineHeight: '1.05', letterSpacing: '-2.5px', margin: '0 0 24px 0' }}>
            Your Family&apos;s<br/>
            <span style={{ color: '#635BFF' }}>Health Vault.</span>
          </h1>
          
          <p style={{ color: '#425466', fontSize: '20px', lineHeight: '1.6', marginBottom: '48px', maxWidth: '480px', fontWeight: '400' }}>
            Store prescriptions, get AI-powered medical insights in your local language, and find generic medicines to save thousands every month.
          </p>
          
          <div className="resp-buttons" style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '40px' }}>
            <a href="/login" style={{ background: '#635BFF', color: 'white', textDecoration: 'none', padding: '16px 32px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} className="hover-lift">
              Start Free
            </a>
            <a href="#features" style={{ background: 'white', border: '1px solid #E6EBF1', color: '#0A2540', textDecoration: 'none', padding: '16px 32px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} className="hover-lift">
              Try Demo
            </a>
          </div>

          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: '#425466' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00D924" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              End-to-End Encrypted
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: '#425466' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00D924" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Family Profiles
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: '#425466' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00D924" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              AI Powered
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: '#425466' }}>
              <span style={{ fontSize: '16px' }}>🇮🇳</span>
              Built for India
            </div>
          </div>
        </div>

        {/* Right — Premium Dashboard Mockup */}
        <div className="pulse-card fade-in-up delay-200" style={{
          background: 'white', borderRadius: '24px', border: '1px solid #E6EBF1', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 32px 64px rgba(10,37,64,0.08)'
        }}>
          {/* Mockup Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 24px', borderBottom: '1px solid #E6EBF1' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F56' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27C93F' }}></div>
            </div>
            <div style={{ flex: 1, background: '#F6F9FC', borderRadius: '6px', height: '28px', display: 'flex', alignItems: 'center', padding: '0 12px' }}>
              <div style={{ color: '#8898AA', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0110 0v4"></path></svg>
                sehatkosh.in/dashboard
              </div>
            </div>
          </div>
          
          {/* Mockup Body */}
          <div className="resp-feature-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', background: '#FAFCFF' }}>
            
            {/* Header row in mockup */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #7A73FF 0%, #00D4FF 100%)' }}></div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#0A2540' }}>Rahul Sharma</div>
                  <div style={{ fontSize: '13px', color: '#635BFF', fontWeight: '600' }}>Primary Profile</div>
                </div>
              </div>
              <div style={{ background: 'white', border: '1px solid #E6EBF1', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: '#0A2540', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                ABHA: 91-XXXX
              </div>
            </div>

            {/* AI Insight Box */}
            <div style={{ background: 'white', border: '1px solid rgba(99,91,255,0.2)', borderRadius: '12px', padding: '20px', boxShadow: '0 12px 24px rgba(99,91,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#635BFF', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                Medicine Savings Found
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px dashed #E6EBF1' }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#0A2540' }}>Dolo 650</div>
                  <div style={{ fontSize: '13px', color: '#8898AA', marginTop: '2px' }}>Paracetamol 650mg</div>
                </div>
                <div style={{ color: '#E02424', fontWeight: '700', fontSize: '15px' }}>₹30</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', marginBottom: '8px' }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#00D924' }}>Jan Aushadhi</div>
                  <div style={{ fontSize: '13px', color: '#8898AA', marginTop: '2px' }}>Generic Alternative</div>
                </div>
                <div style={{ color: '#00D924', fontWeight: '800', fontSize: '15px' }}>₹6</div>
              </div>

              <button style={{ width: '100%', background: '#F0EFFF', color: '#635BFF', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'background 0.2s' }} className="hover-lift">
                Save ₹24 per strip
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="resp-stats" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 48px', borderTop: '1px solid #E6EBF1', borderBottom: '1px solid #E6EBF1', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', textAlign: 'center', background: 'rgba(246,249,252,0.5)' }}>
        <div className="fade-in-up delay-100">
          <div style={{ fontSize: '36px', fontWeight: '800', color: '#0A2540' }}>₹1,200+</div>
          <div style={{ fontSize: '14px', color: '#425466', marginTop: '4px', fontWeight: '500' }}>Average monthly savings</div>
        </div>
        <div className="fade-in-up delay-200">
          <div style={{ fontSize: '36px', fontWeight: '800', color: '#0A2540' }}>50+</div>
          <div style={{ fontSize: '14px', color: '#425466', marginTop: '4px', fontWeight: '500' }}>Govt schemes covered</div>
        </div>
        <div className="fade-in-up delay-300">
          <div style={{ fontSize: '36px', fontWeight: '800', color: '#0A2540' }}>Multilingual</div>
          <div style={{ fontSize: '14px', color: '#425466', marginTop: '4px', fontWeight: '500' }}>Available in your language</div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="resp-section" style={{ padding: '120px 48px', background: 'transparent' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', marginBottom: '80px' }}>
          <h2 className="resp-h2" style={{ fontSize: '48px', fontWeight: '800', color: '#0A2540', letterSpacing: '-1px' }}>What does SehatKosh do?</h2>
          <p style={{ fontSize: '20px', color: '#425466', marginTop: '16px' }}>One app for your entire family&apos;s health.</p>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '100px' }}>
          
          {/* Feature 1 */}
          <div className="resp-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <div style={{ color: '#635BFF', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>AI Assistant</div>
              <h3 style={{ fontSize: '36px', fontWeight: '800', color: '#0A2540', marginBottom: '24px', lineHeight: '1.2' }}>Ask AI, Get Instant Answers</h3>
              <p style={{ fontSize: '18px', color: '#425466', lineHeight: '1.6', marginBottom: '24px' }}>Have a fever? Don&apos;t understand a medical report? Just ask — our AI explains everything clearly. No waiting, no appointments.</p>
            </div>
            <div className="hover-lift resp-feature-card" style={{ background: '#F6F9FC', borderRadius: '16px', padding: '40px', border: '1px solid #E6EBF1' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ alignSelf: 'flex-end', background: '#635BFF', color: 'white', padding: '12px 16px', borderRadius: '16px 16px 0 16px', fontSize: '15px' }}>My report shows HbA1c 7.2, what does this mean?</div>
                <div style={{ alignSelf: 'flex-start', background: 'white', color: '#0A2540', padding: '12px 16px', borderRadius: '16px 16px 16px 0', fontSize: '15px', border: '1px solid #E6EBF1', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>Your HbA1c is 7.2, which indicates your blood sugar level is slightly elevated.</div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="resp-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div className="hover-lift resp-feature-card" style={{ background: '#F6F9FC', borderRadius: '16px', padding: '40px', border: '1px solid #E6EBF1' }}>
              <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <h4 style={{ fontWeight: '700', fontSize: '18px', marginBottom: '16px' }}>Paracetamol 500mg</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#FFF0F0', borderRadius: '8px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '500' }}>Branded</span><span style={{ color: '#E02424', fontWeight: '700' }}>₹45</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#E3FFF1', borderRadius: '8px', marginBottom: '16px' }}>
                  <span style={{ fontWeight: '500' }}>Generic (Jan Aushadhi)</span><span style={{ color: '#00D924', fontWeight: '700' }}>₹5</span>
                </div>
                <div style={{ background: '#0A2540', color: 'white', textAlign: 'center', padding: '12px', borderRadius: '8px', fontWeight: '700' }}>Savings: ₹40/strip</div>
              </div>
            </div>
            <div>
              <div style={{ color: '#635BFF', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Savings</div>
              <h3 style={{ fontSize: '36px', fontWeight: '800', color: '#0A2540', marginBottom: '24px', lineHeight: '1.2' }}>Find Cheaper Medicines</h3>
              <p style={{ fontSize: '18px', color: '#425466', lineHeight: '1.6', marginBottom: '24px' }}>Get ₹45 medicines for ₹5. Switch to Jan Aushadhi generic alternatives and save thousands every month.</p>
            </div>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="resp-section" style={{ padding: '120px 48px', background: 'transparent' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className="resp-h2" style={{ fontSize: '48px', fontWeight: '800', color: '#0A2540', textAlign: 'center', marginBottom: '80px', letterSpacing: '-1px' }}>How does it work?</h2>
          
          <div className="resp-flex-col" style={{ display: 'flex', justifyContent: 'space-between', gap: '40px', position: 'relative' }}>
            {/* Dashed line */}
            <div className="resp-hide-mobile" style={{ position: 'absolute', top: '32px', left: '10%', right: '10%', borderTop: '2px dashed #E6EBF1', zIndex: 0 }}></div>
            
            {[
              { step: '1', title: 'Login with Mobile', desc: 'Via OTP, no passwords' },
              { step: '2', title: 'Add Family Members', desc: 'Setup in 2 minutes' },
              { step: '3', title: 'Ask the AI', desc: 'Everything in one place' }
            ].map((item, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center', zIndex: 10 }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#635BFF', color: 'white', fontSize: '24px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 4px 16px rgba(99,91,255,0.4)' }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0A2540', marginBottom: '12px' }}>{item.title}</h3>
                <p style={{ fontSize: '16px', color: '#425466' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="resp-section" style={{ padding: '120px 48px', background: 'transparent' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className="resp-h2" style={{ fontSize: '48px', fontWeight: '800', color: '#0A2540', textAlign: 'center', marginBottom: '80px', letterSpacing: '-1px' }}>What our users say</h2>
          
          <div className="resp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {[
              { quote: "My mother's diabetes reports are always accessible on my phone now.", name: "Priya S.", city: "Lucknow" },
              { quote: "Switched to Jan Aushadhi — saving ₹800/month.", name: "Ramesh K.", city: "Bhopal" },
              { quote: "I never miss my child's vaccine schedule anymore.", name: "Sunita D.", city: "Jaipur" }
            ].map((t, i) => (
              <div key={i} className="hover-lift resp-feature-card" style={{ background: '#F6F9FC', padding: '40px', borderRadius: '16px', border: '1px solid #E6EBF1' }}>
                <div style={{ color: '#635BFF', fontSize: '64px', lineHeight: 0.5, opacity: 0.5, marginBottom: '24px', fontFamily: 'serif' }}>&ldquo;</div>
                <p style={{ fontSize: '18px', color: '#0A2540', fontStyle: 'italic', marginBottom: '32px', lineHeight: '1.6' }}>{t.quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#635BFF', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '18px' }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontWeight: '700', color: '#0A2540' }}>{t.name}</div>
                    <div style={{ color: '#425466', fontSize: '14px' }}>{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA & FOOTER */}
      <section className="resp-section" style={{ background: '#0A2540', padding: '80px 48px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(99,91,255,0.2) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
        
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10, marginBottom: '64px' }}>
          <h2 className="resp-h2-large" style={{ fontSize: '48px', fontWeight: '800', color: 'white', marginBottom: '20px', letterSpacing: '-1px' }}>Secure Your Family&apos;s Health</h2>
          <p style={{ fontSize: '18px', color: '#8898AA', marginBottom: '32px', lineHeight: '1.6' }}>An initiative built to make medical records accessible, AI advice multilingual, and medicines affordable for every Indian household.</p>
          <a href="/login" style={{ background: '#635BFF', color: 'white', textDecoration: 'none', padding: '14px 32px', borderRadius: '999px', fontSize: '16px', fontWeight: '600', display: 'inline-block' }} className="hover-lift">Access SehatKosh &gt;</a>
        </div>

        <div className="resp-flex-col" style={{ maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ maxWidth: '320px' }}>
            <div style={{ color: 'white', fontSize: '24px', fontWeight: '800', letterSpacing: '-1px', marginBottom: '12px' }}>SehatKosh</div>
            <div style={{ color: '#8898AA', fontSize: '14px', lineHeight: '1.6' }}>Empowering citizens with AI-driven health insights and generic medicine savings. Proudly built for Good 2026 🇮🇳.</div>
          </div>
          <div className="resp-footer-links" style={{ display: 'flex', gap: '64px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ color: 'white', fontWeight: '600', marginBottom: '8px', fontSize: '15px' }}>Project</div>
              <a href="#features" style={{ color: '#8898AA', textDecoration: 'none', fontSize: '14px' }}>AI Assistant</a>
              <a href="#treasury" style={{ color: '#8898AA', textDecoration: 'none', fontSize: '14px' }}>Medicine Savings</a>
              <a href="#how-it-works" style={{ color: '#8898AA', textDecoration: 'none', fontSize: '14px' }}>How it Works</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ color: 'white', fontWeight: '600', marginBottom: '8px', fontSize: '15px' }}>Resources</div>
              <a href="https://janaushadhi.gov.in/" target="_blank" style={{ color: '#8898AA', textDecoration: 'none', fontSize: '14px' }}>Jan Aushadhi Kendra</a>
              <a href="#" style={{ color: '#8898AA', textDecoration: 'none', fontSize: '14px' }}>ABHA ID Info</a>
              <a href="https://github.com" target="_blank" style={{ color: '#8898AA', textDecoration: 'none', fontSize: '14px' }}>GitHub Repo</a>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
