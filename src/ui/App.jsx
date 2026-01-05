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

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <DashboardSection />
      <SocialProof />
      <Benefits />
      <CTASection />
      <ChatbotWidget />
      <Footer />
    </>
  )
}

export default App;