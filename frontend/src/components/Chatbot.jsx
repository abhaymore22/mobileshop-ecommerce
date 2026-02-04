import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  sendChatMessage,
  toggleChatbot,
  closeChatbot,
  setSessionID,
  clearMessages,
  addUserMessage
} from '../redux/slices/chatbotSlice';

const Chatbot = () => {
  const dispatch = useDispatch();
  const { messages, loading, isOpen, sessionID } = useSelector((state) => state.chatbot);
  const { userInfo } = useSelector((state) => state.auth);

  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Generate session ID on mount
  useEffect(() => {
    if (!sessionID) {
      const newSessionID = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      dispatch(setSessionID(newSessionID));
    }
  }, [sessionID, dispatch]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputMessage.trim()) return;

    const message = inputMessage.trim();
    setInputMessage('');

    // Add user message to UI immediately
    dispatch(addUserMessage(message));

    // Send message to backend
    dispatch(sendChatMessage({ message, sessionID }));
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  const quickQuestions = [
    'How can I track my order?',
    'What is your return policy?',
    'What payment methods do you accept?',
    'How long does shipping take?',
    'How do I create an account?'
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1049
        }}
        onClick={() => dispatch(closeChatbot())}
      ></div>

      {/* Chat Modal */}
      <div
        className="position-fixed chatbot-window"
        style={{
          bottom: '2rem',
          right: '2rem',
          maxHeight: '650px',
          zIndex: 1050,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div className="card border-0 shadow-lg h-100 d-flex flex-column">
          {/* Header with Gradient */}
          <div
            className="card-header text-white border-0 d-flex justify-content-between align-items-center"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '1rem 1.25rem'
            }}
          >
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle bg-success me-2"
                style={{ width: '10px', height: '10px' }}
              ></div>
              <div>
                <h6 className="mb-0 fw-bold">
                  <i className="bi bi-robot me-2"></i>
                  AI Assistant
                </h6>
                <small className="opacity-75">Online - Here to help!</small>
              </div>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => dispatch(closeChatbot())}
              aria-label="Close"
            ></button>
          </div>

          {/* Messages Area */}
          <div
            className="card-body bg-light overflow-auto chatbot-messages"
            style={{ 
              flex: '1 1 auto',
              minHeight: '300px',
              maxHeight: '450px'
            }}
          >
            {/* Welcome Message */}
            {messages.length === 0 && (
              <div className="chatbot-welcome">
                {/* Welcome Greeting */}
                <div className="bg-white rounded shadow-sm p-2 mb-2">
                  <div className="d-flex align-items-start">
                    <div
                      className="flex-shrink-0 rounded-circle text-white d-flex align-items-center justify-content-center fw-bold me-2"
                      style={{
                        width: '30px',
                        height: '30px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        fontSize: '0.7rem'
                      }}
                    >
                      <i className="bi bi-robot"></i>
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-1 fw-semibold small">
                        Hello! {userInfo ? `Welcome back, ${userInfo.name}!` : 'Welcome!'} 👋
                      </p>
                      <p className="mb-0 small text-muted">
                        I'm your virtual assistant. How can I help you today?
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Questions */}
                <div>
                  <p className="small text-muted fw-semibold mb-1 px-1">
                    <i className="bi bi-lightning-fill me-1"></i>Quick Questions
                  </p>
                  <div className="d-grid gap-2">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickQuestion(question)}
                        className="btn btn-sm btn-outline-secondary text-start"
                        style={{ fontSize: '0.85rem' }}
                      >
                        <i className="bi bi-chevron-right me-1"></i>
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Chat Messages */}
            {messages.map((msg, index) => (
              <div key={index} className={`d-flex mb-3 ${msg.type === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                {msg.type === 'bot' && (
                  <div
                    className="flex-shrink-0 rounded-circle text-white d-flex align-items-center justify-content-center fw-bold me-2"
                    style={{
                      width: '35px',
                      height: '35px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      fontSize: '0.75rem'
                    }}
                  >
                    <i className="bi bi-robot"></i>
                  </div>
                )}
                <div
                  className={`p-3 rounded ${msg.type === 'user' ? 'text-white' : 'bg-white shadow-sm'}`}
                  style={{
                    maxWidth: '75%',
                    background: msg.type === 'user' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '',
                    wordWrap: 'break-word'
                  }}
                >
                  <p className="mb-1 small" style={{ whiteSpace: 'pre-line' }}>{msg.content}</p>
                  {msg.timestamp && (
                    <p className={`mb-0 ${msg.type === 'user' ? 'text-white-50' : 'text-muted'}`} style={{ fontSize: '0.7rem' }}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="d-flex mb-3">
                <div
                  className="flex-shrink-0 rounded-circle text-white d-flex align-items-center justify-content-center fw-bold me-2"
                  style={{
                    width: '35px',
                    height: '35px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    fontSize: '0.75rem'
                  }}
                >
                  <i className="bi bi-robot"></i>
                </div>
                <div className="bg-white p-3 rounded shadow-sm">
                  <div className="d-flex gap-1">
                    <div className="spinner-grow spinner-grow-sm text-secondary" role="status" style={{ width: '0.5rem', height: '0.5rem' }}>
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow spinner-grow-sm text-secondary" role="status" style={{ width: '0.5rem', height: '0.5rem', animationDelay: '0.1s' }}>
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow spinner-grow-sm text-secondary" role="status" style={{ width: '0.5rem', height: '0.5rem', animationDelay: '0.2s' }}>
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="card-footer bg-white border-0 p-3">
            <form onSubmit={handleSendMessage}>
              <div className="input-group">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="form-control border-end-0"
                  disabled={loading}
                  style={{ fontSize: '0.9rem' }}
                />
                <button
                  type="submit"
                  disabled={loading || !inputMessage.trim()}
                  className="btn text-white"
                  style={{
                    background: loading || !inputMessage.trim() ? '#6c757d' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none'
                  }}
                >
                  <i className="bi bi-send-fill"></i>
                </button>
              </div>
            </form>
            <p className="text-center text-muted mb-0 mt-2" style={{ fontSize: '0.75rem' }}>
              <i className="bi bi-shield-check me-1"></i>
              Your conversation is secure
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
