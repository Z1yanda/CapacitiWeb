class PortfolioChatbot {
    constructor() {
        this.portfolioData = {
            name: "CAPACITI",
            profession: "AI Associate, Aspiring AI Engineer, Software Developer, Digital Marketing, Hospitality Management",
            projects: [
                {
                    name: "CAPACITI CHATBOT",
                    description: "An interactive chatbot project",
                    link: "https://landbot.online/v3/H-2887235-4OBEO6RDVQYT9AHU/index.html"
                },
                {
                    name: "Job Portal",
                    description: "A job portal website",
                    link: "https://68414cd9009171a8732cf424--deluxe-beijinho-7e5471.netlify.app/"
                }
            ],
            skills: ["AI Development", "Software Development", "Digital Marketing", "Hospitality Management"],
            resume: "/img/resume.pdf.pdf",
            socialLinks: {
                twitter: "#",
                facebook: "#",
                linkedin: "#"
                
            }
        };
        
        this.responses = {
            greeting: [
                "Hello! I'm CAPACITI's portfolio assistant. How can I help you learn about their work?",
                "Hi there! I can tell you about CAPACITI. What would you like to know?",
                "Welcome! I'm here to help you explore CAPACITI. Ask me anything!"
            ],
            about: [
                "Capaciti is a work-readiness and digital skills development program aimed at equipping young South Africans with in-demand skills in tech, data, and business analysis, helping them transition into meaningful employment"
            ],
            application: [
                ' You can apply on our website by filling out the online application form here: [Insert link]'
                
            ],
            documents: [
                ' You need your certified ID, academic transcripts, CV, and proof of residence'
                
            ],
            training: [
                'The training usually lasts between 12 and 18 months, depending on the track.'
                
            ],
            online: [   
                ' We offer a hybrid model – some sessions are in person, while others are virtual. It depends on your assigned track and location'
        
            ],
            placement: [
                `Yes! After completing the program, we connect you with partner companies for internships or job placements`
                
            ],
             courses: [
                ` We offer training in Data Science, Software Development, Business Analysis, Cloud Computing, Cybersecurity, and more.`
            ],
            certificate: [
                " Yes, upon successful completion of the program, you will receive a certificate and may be eligible for an industry-recognized credential as well"
                
            ],
            skills: [
                `My key skills include: ${this.portfolioData.skills.join(", ")}.`,
                `I specialize in ${this.portfolioData.skills.join(", ")}.`
            ],
            stipend: [
                " Yes, participants usually receive a monthly stipend to help cover basic costs like transport and data"
                
            ],
            troubleshooting: [
                " Please email our support team at support@capaciti.org.za"
                
            ],
            mentor: [
                " Yes, every participant is assigned a mentor to support your personal and professional development throughout the program"
                
            ],
            programend: [
                " You’ll join our growing network of alumni and be supported in your journey to secure meaningful employment"
                
            ],
            default: [
                "I'm not sure about that. You can ask me about my projects, skills, experience, or how to contact me.",
                "Could you rephrase that? I can help with questions about my portfolio, projects, or background.",
                "I'd be happy to help! Try asking about my projects, skills, or professional background."
            ]
        };
        
        this.initializeChatbot();
    }
    
    initializeChatbot() {
        this.createChatInterface();
        this.bindEvents();
    }
    
    createChatInterface() {
        const chatHTML = `
            <div id="portfolio-chatbot" class="chatbot-container">
                <div class="chatbot-header">
                    <h3>Portfolio Assistant</h3>
                    <button id="chatbot-toggle">💬</button>
                </div>
                <div id="chatbot-messages" class="chatbot-messages"></div>
                <div class="chatbot-input">
                    <input type="text" id="chatbot-input" placeholder="Ask me about CAPACITI..." />
                    <button id="chatbot-send">Send</button>
                </div>
            </div>
            
            <style>
                .chatbot-container {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    width: 320px;
                    height: 450px;
                    background: white;
                    border: 2px solid #FF6F61;
                    border-radius: 10px;
                    display: flex;
                    flex-direction: column;
                    z-index: 9999;
                    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
                }
                
                .chatbot-header {
                    background: #FF6F61;
                    color: white;
                    padding: 10px;
                    border-radius: 8px 8px 0 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .chatbot-header h3 {
                    margin: 0;
                    font-size: 16px;
                }
                
                #chatbot-toggle {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                }
                
                .chatbot-messages {
                    flex: 1;
                    padding: 10px;
                    overflow-y: auto;
                    background: #f9f9f9;
                }
                
                .message {
                    margin: 10px 0;
                    padding: 8px 12px;
                    border-radius: 15px;
                    max-width: 80%;
                }
                
                .user-message {
                    background: #FF6F61;
                    color: white;
                    margin-left: auto;
                    text-align: right;
                }
                
                .bot-message {
                    background: white;
                    color: #333;
                    border: 1px solid #ddd;
                }
                
                .chatbot-input {
                    display: flex;
                    padding: 10px;
                    border-top: 1px solid #ddd;
                }
                
                #chatbot-input {
                    flex: 1;
                    padding: 8px;
                    border: 1px solid #ddd;
                    border-radius: 20px;
                    outline: none;
                }
                
                #chatbot-send {
                    margin-left: 10px;
                    padding: 8px 15px;
                    background: #FF6F61;
                    color: white;
                    border: none;
                    border-radius: 20px;
                    cursor: pointer;
                }
                
                #chatbot-send:hover {
                    background: #e55a4f;
                }
                
                .chatbot-minimized {
                    height: 50px;
                }
                
                .chatbot-minimized .chatbot-messages,
                .chatbot-minimized .chatbot-input {
                    display: none;
                }
            </style>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatHTML);
        
        // Add welcome message
        setTimeout(() => {
            this.addMessage(this.getRandomResponse('greeting'), 'bot');
        }, 1000);
    }
    
    bindEvents() {
        const chatbotInput = document.getElementById('chatbot-input');
        const chatbotSend = document.getElementById('chatbot-send');
        const chatbotToggle = document.getElementById('chatbot-toggle');
        const chatbotContainer = document.getElementById('portfolio-chatbot');
        
        chatbotSend.addEventListener('click', () => this.handleUserInput());
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleUserInput();
        });
        
        chatbotToggle.addEventListener('click', () => {
            chatbotContainer.classList.toggle('chatbot-minimized');
        });
    }
    
    handleUserInput() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (message) {
            this.addMessage(message, 'user');
            input.value = '';
            
            setTimeout(() => {
                const response = this.generateResponse(message);
                this.addMessage(response, 'bot');
            }, 500);
        }
    }
    
    addMessage(message, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = message;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (this.containsKeywords(lowerMessage, ['hello', 'hi', 'hey', 'greetings'])) {
            return this.getRandomResponse('greeting');
        }
        
        if (this.containsKeywords(lowerMessage, ['application'])) {
            return this.getRandomResponse('application');
        }
        if (this.containsKeywords(lowerMessage, ['about'])) {
            return this.getRandomResponse('about');
        }
        
        
          if (this.containsKeywords(lowerMessage, ['courses'])) {
            return this.getRandomResponse('courses');
        }
         if (this.containsKeywords(lowerMessage, ['documents'])) {
            return this.getRandomResponse('documents');
        }
         if (this.containsKeywords(lowerMessage, ['training'])) {
            return this.getRandomResponse('training');
        }
        if (this.containsKeywords(lowerMessage, ['online'])) {
            return this.getRandomResponse('online');
        }
        if (this.containsKeywords(lowerMessage, ['certificate'])) {
            return this.getRandomResponse('certificate');
        }
        if (this.containsKeywords(lowerMessage, ['placement'])) {
            return this.getRandomResponse('placement');
        }
        if (this.containsKeywords(lowerMessage, ['stipend'])) {
            return this.getRandomResponse('stipend');
        }
         if (this.containsKeywords(lowerMessage, ['troubleshooting'])) {
            return this.getRandomResponse('troubleshooting');
        }
        
        if (this.containsKeywords(lowerMessage, ['programend'])) {
            return this.getRandomResponse('programend');
        }
        
        if (this.containsKeywords(lowerMessage, ['projects', 'portfolio', 'work samples', 'chatbot', 'job portal'])) {
            if (this.containsKeywords(lowerMessage, ['chatbot', 'capaciti'])) {
                return `The CAPACITI CHATBOT is one of my key projects. It's an interactive chatbot that you can try here: ${this.portfolioData.projects[0].link}`;
            }
            if (this.containsKeywords(lowerMessage, ['job portal', 'job', 'portal'])) {
                return `I developed a Job Portal website. You can check it out here: ${this.portfolioData.projects[1].link}`;
            }
            return this.getRandomResponse('projects');
        }
        
        if (this.containsKeywords(lowerMessage, ['skills', 'abilities', 'expertise', 'technologies'])) {
            return this.getRandomResponse('skills');
        }
        
        if (this.containsKeywords(lowerMessage, ['resume', 'cv', 'download'])) {
            return this.getRandomResponse('resume');
        }
        
        if (this.containsKeywords(lowerMessage, ['contact', 'reach', 'email', 'hire', 'connect'])) {
            return this.getRandomResponse('contact');
        }
        
        if (this.containsKeywords(lowerMessage, ['experience', 'background'])) {
            return `I have experience in ${this.portfolioData.profession}. My portfolio showcases projects in AI development, web development, and digital marketing.`;
        }
        
        return this.getRandomResponse('default');
    }
    
    containsKeywords(message, keywords) {
        return keywords.some(keyword => message.includes(keyword));
    }
    
    getRandomResponse(category) {
        const responses = this.responses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioChatbot();
});
