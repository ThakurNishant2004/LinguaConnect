import { useState } from 'react';
import { Globe, MessageSquare, BarChart3, Zap, Shield, Users } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AuthModal } from './AuthModal';

type Page = 'landing' | 'chat' | 'knowledge' | 'dashboard' | 'howitworks';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // 🔥 New: track authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const openLoginModal = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
  };

  const openSignupModal = () => {
    setAuthMode('signup');
    setAuthModalOpen(true);
  };

  const floatingTexts = [
    { text: 'Hello', top: '20%', left: '15%', delay: '0s' },
    { text: 'Hola', top: '30%', right: '20%', delay: '0.5s' },
    { text: 'नमस्ते', top: '60%', left: '10%', delay: '1s' },
    { text: 'Bonjour', top: '70%', right: '15%', delay: '1.5s' },
    { text: '你好', top: '40%', left: '25%', delay: '2s' },
    { text: 'مرحبا', top: '50%', right: '30%', delay: '2.5s' },
  ];

  return (
    <>
      {/* MAIN PAGE WRAPPER */}
      <div className="min-h-screen bg-gradient-to-br from-[#007BFF] via-[#0056b3] to-[#00B5AD] overflow-x-hidden">

        {/* ---------------------- HEADER ---------------------- */}
        <nav className="absolute top-0 left-0 right-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-[#007BFF]" />
                </div>
                <span className="text-white text-lg font-medium">LinguaConnect</span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => onNavigate('howitworks')}
                  className="text-white hover:text-blue-100 transition"
                >
                  How It Works
                </button>

                <button
                  onClick={() => onNavigate('knowledge')}
                  className="text-white hover:text-blue-100 transition"
                >
                  Knowledge Base
                </button>

                <button
                  onClick={() => onNavigate('dashboard')}
                  className="text-white hover:text-blue-100 transition"
                >
                  Dashboard
                </button>

                {/* LOGIN */}
                {!isAuthenticated && (
                  <button
                    onClick={openLoginModal}
                    className="text-white border border-white/40 px-4 py-1.5 rounded-lg hover:bg-white/10 transition"
                  >
                    Login
                  </button>
                )}

                {/* SIGNUP */}
                {!isAuthenticated && (
                  <button
                    onClick={openSignupModal}
                    className="bg-white text-[#007BFF] px-4 py-1.5 rounded-lg hover:bg-blue-50 transition"
                  >
                    Sign Up
                  </button>
                )}

                {/* IF LOGGED IN */}
                {isAuthenticated && (
                  <span className="text-white text-sm px-3 py-1 border border-white rounded-lg">
                    Logged In
                  </span>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* ---------------------- HERO SECTION ---------------------- */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1609868714484-2b2556006301"
              alt="World Map"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating languages */}
          {floatingTexts.map((item, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                top: item.top,
                left: item.left,
                right: item.right,
                animationDelay: item.delay,
              }}
            >
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
                <p className="text-white">{item.text}</p>
              </div>
            </div>
          ))}

          {/* Main hero content */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span className="text-white">Powered by Lingo CLI</span>
            </div>

            <h1 className="text-white text-4xl sm:text-5xl font-semibold mb-4">
              Talk to anyone, anywhere — in your language.
            </h1>

            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              AI-powered multilingual support for global businesses. Break language barriers and provide exceptional customer service.
            </p>

            {/* 🚫 Start Chat button LOCKED until authentication */}
            <Button
              size="lg"
              onClick={() => isAuthenticated && onNavigate('chat')}
              disabled={!isAuthenticated}
              className={
                "bg-white text-[#007BFF] " +
                (!isAuthenticated
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-50")
              }
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              {isAuthenticated ? "Start Chat" : "Login to Start Chat"}
            </Button>

            {/* Try Demo always allowed */}
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('chat')}
              className="bg-transparent border-white text-white hover:bg-white/10 ml-4"
            >
              Try Demo
            </Button>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <Globe className="w-8 h-8 text-white mx-auto mb-2" />
                <p className="text-white">100+ Languages</p>
                <p className="text-blue-100">Real-time translation</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <Users className="w-8 h-8 text-white mx-auto mb-2" />
                <p className="text-white">50K+ Users</p>
                <p className="text-blue-100">Trusted worldwide</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <Shield className="w-8 h-8 text-white mx-auto mb-2" />
                <p className="text-white">Enterprise Security</p>
                <p className="text-blue-100">SOC 2 compliant</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------- FEATURES ---------------------- */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-gray-900 text-3xl font-semibold mb-4">Why Choose LinguaConnect?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to provide world-class multilingual support
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[MessageSquare, BarChart3, Globe, Zap, Shield, Users].map((Icon, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-md"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#007BFF] to-[#00B5AD] rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-gray-900 font-semibold mb-2">Feature</h3>
                  <p className="text-gray-600">Description</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-18px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
      </div>

      {/* ---------------------- AUTH MODAL ---------------------- */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onSuccess={() => {
          setIsAuthenticated(true);  // 🔥 unlock Start Chat
          setAuthModalOpen(false);
        }}
      />
    </>
  );
}
