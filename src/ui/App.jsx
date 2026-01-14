import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './sections/Hero';
import Problem from './sections/Problem';
import Solution from './sections/Solution';
import Benefits from './sections/Benefits';
import DashboardSection from './sections/DashboardSection';
import CTASection from './sections/FinalCTA';
import SocialProof from './sections/SocialProof';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';
import { useState } from 'react';
import { ChatbotWidget } from './chatbot/ChatbotWidget';

// Creamos un componente para la Landing
const LandingPage = ({ setKpis, profile }) => (
  <>
    <Hero />
    <div id="problem"><Problem /></div>
    <div id="solution"><Solution /></div>
    <div id="dashboard"><DashboardSection onKpisReady={setKpis} profile={profile} /></div>
    <div id="SocialProof"><SocialProof /></div>
    <Benefits />
    <div id="form"><CTASection /></div>
  </>
);

function App() {
  const [kpis, setKpis] = useState(null);
  const [profile, setProfile] = useState("industrial");

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage setKpis={setKpis} profile={profile} />} />
        <Route path="/nosotros" element={<AboutUs />} />
      </Routes>
      <Footer />
      <ChatbotWidget />
    </Router>
  );
}

export default App;