import Header from './components/Header';
import Hero from './sections/Hero';
import Problem from './sections/Problem';
import Solution from './sections/Solution';
import Benefits from './sections/Benefits';
import DashboardSection from './sections/DashboardSection';
import CTASection from './sections/FinalCTA';
import SocialProof from './sections/SocialProof';
import Footer from './components/Footer';
import { useState } from 'react';
import { ChatbotWidget } from './chatbot/ChatbotWidget';

function App() {
   const [kpis, setKpis] = useState(null)
  const [profile, setProfile] = useState("industrial") 
  return (
    <>
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <DashboardSection onKpisReady={setKpis} profile={profile} />
      <SocialProof />
      <Benefits />
      <CTASection />
      <Footer />
      <ChatbotWidget />
    </>
  )
}

export default App;