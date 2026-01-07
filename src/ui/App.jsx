import Header from './components/Header';
import Hero from './sections/Hero';
import Problem from './sections/Problem';
import Solution from './sections/Solution';
import Benefits from './sections/Benefits';
import DashboardSection from './sections/DashboardSection';
import CTASection from './sections/FinalCTA';
import SocialProof from './sections/SocialProof';
import Footer from './components/Footer';
import ChatbotWidget from './chatbot/ChatbotWidget';
import { useState } from 'react';

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
      <ChatbotWidget kpis={kpis} profile={profile} />
    </>
  )
}

export default App;