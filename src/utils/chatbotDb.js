/**
 * Chatbot Knowledge Base & Matcher Engine
 */

export const CHATBOT_RESPONSES = [
  {
    id: 'hello',
    triggers: ['hello', 'hi', 'hey', 'greetings', 'morning', 'evening', 'anyone there'],
    keywords: ['hello', 'hi', 'hey'],
    response: "Hello! I am the HealthBridge Smart Assistant. I'm here to answer your questions about requesting healthcare support, volunteering with our platform, or learning about our NGO services. How can I help you today?",
    quickReplies: [
      { text: 'How do I request support?', payload: 'request_support' },
      { text: 'How do I volunteer?', payload: 'become_volunteer' },
      { text: 'What services do you offer?', payload: 'services_info' }
    ]
  },
  {
    id: 'request_support',
    triggers: ['request support', 'get help', 'need help', 'patient assistance', 'apply for support', 'submit a request', 'how to get aid'],
    keywords: ['request', 'support', 'help', 'patient', 'assistance', 'apply', 'need', 'aid'],
    response: "To request support, simply click on the **'Request Support'** link in the navigation menu. Fill out the Patient Support Request Form with your contact details, location, and the type of assistance you require (Medical Supplies, Logistics, Psychological, Financial, etc.). Once submitted, our AI Classifier will prioritize your case, and a coordinator will contact you shortly.",
    quickReplies: [
      { text: 'What support is available?', payload: 'services_info' },
      { text: 'How does it get processed?', payload: 'process_info' }
    ]
  },
  {
    id: 'become_volunteer',
    triggers: ['become a volunteer', 'how to volunteer', 'sign up to help', 'register as volunteer', 'join as volunteer', 'want to help'],
    keywords: ['volunteer', 'join', 'register', 'sign up', 'help', 'skills', 'availability'],
    response: "We are always looking for passionate volunteers! You can register by clicking on **'Volunteer Registration'** in the navigation bar. You will need to provide your location, skills (e.g., medical consultation, driving, nursing, administration), and availability. We match your profile with local patient requests.",
    quickReplies: [
      { text: 'What skills are needed?', payload: 'skills_info' },
      { text: 'Is there a screening process?', payload: 'screening_info' }
    ]
  },
  {
    id: 'services_info',
    triggers: ['what kind of help', 'what services', 'types of support', 'what help is available', 'what do you do', 'services offered'],
    keywords: ['services', 'support', 'types', 'help', 'available', 'supplies', 'transport', 'counseling', 'financial'],
    response: "HealthBridge coordinates five primary types of support:\n\n1. **Medical Supplies**: Helping secure inhalers, nebulizers, diagnostics, and mobility aids.\n2. **Logistics & Transport**: Driving patients to chemotherapy, dialysis, or outpatient visits.\n3. **Psychological Support**: Connecting patients with licensed counselors and recovery groups.\n4. **Financial Aid**: Assisting with prescription co-pays and medicine vouchers.\n5. **Food & Nutrition**: Coordinating grocery bundle deliveries for patients with special diets.",
    quickReplies: [
      { text: 'Request Support now', payload: 'request_support' },
      { text: 'How do I volunteer?', payload: 'become_volunteer' }
    ]
  },
  {
    id: 'process_info',
    triggers: ['how does NGO process', 'how is request processed', 'what happens after', 'processing time', 'steps after submit', 'how does it work'],
    keywords: ['process', 'processed', 'submit', 'after', 'steps', 'timeline', 'contact', 'triage'],
    response: "After you submit a support request:\n1. Our **Smart Support Assistant** immediately analyzes the urgency, age category, and type of assistance to create an automated summary.\n2. The request is queued on our internal coordinator dashboard.\n3. A local volunteer or coordinator reviews the case details and matches it with a registered volunteer in your area.\n4. We contact you via phone or email within 12 to 24 hours to coordinate delivery.",
    quickReplies: [
      { text: 'How is priority decided?', payload: 'priority_info' },
      { text: 'Is it confidential?', payload: 'privacy_info' }
    ]
  },
  {
    id: 'skills_info',
    triggers: ['what skills are needed', 'volunteer skills', 'can i volunteer without background', 'skills required'],
    keywords: ['skills', 'experience', 'background', 'training', 'cpr', 'driver', 'licensed', 'admin', 'translation'],
    response: "We welcome all skills! Active medical professionals (doctors, nurses, therapists) provide counseling and wellness checks. Drivers help with patient transport. Non-medical volunteers can assist with administrative tasks, translation, phone check-ins, or organizing food supply drives.",
    quickReplies: [
      { text: 'Register as Volunteer', payload: 'become_volunteer' },
      { text: 'Contact Us', payload: 'contact_info' }
    ]
  },
  {
    id: 'screening_info',
    triggers: ['screening process', 'background check', 'do you verify volunteers', 'volunteer training'],
    keywords: ['screening', 'background', 'check', 'verify', 'verification', 'police', 'reference', 'credentials'],
    response: "Yes, to ensure patient safety, all healthcare volunteers must upload credentials or professional licenses (verified by our team). Logistics/transport volunteers must have a valid driver's license and pass a basic background check. General volunteers attend a brief online orientation session before matching.",
    quickReplies: [
      { text: 'How do I volunteer?', payload: 'become_volunteer' }
    ]
  },
  {
    id: 'cost_info',
    triggers: ['is it free', 'does it cost money', 'charges', 'fees', 'do patients pay'],
    keywords: ['free', 'cost', 'money', 'charges', 'fees', 'pay', 'charge', 'price'],
    response: "All services coordinated through HealthBridge are **100% free of charge** for patients. We are funded by individual donations, corporate sponsors, and grants. Volunteers are never asked to pay fees, and they offer their time on a purely altruistic basis.",
    quickReplies: [
      { text: 'Make a donation', payload: 'donation_info' },
      { text: 'Request Support', payload: 'request_support' }
    ]
  },
  {
    id: 'donation_info',
    triggers: ['donate', 'how to support ngo', 'make a donation', 'financial support', 'funding'],
    keywords: ['donate', 'donation', 'support', 'funding', 'give', 'money', 'contribution'],
    response: "Thank you for your generosity! You can make a secure contribution on our website's donation page, or partner with us as a corporate sponsor. 100% of direct donations go toward purchasing medical supplies, transit vouchers, and urgent patient food packages.",
    quickReplies: [
      { text: 'Contact NGO', payload: 'contact_info' }
    ]
  },
  {
    id: 'priority_info',
    triggers: ['how is priority decided', 'priority levels', 'high priority cases', 'triage system'],
    keywords: ['priority', 'decided', 'levels', 'high', 'medium', 'triage', 'urgent', 'ranking'],
    response: "Priority is classified into three levels:\n- **High**: Urgent medical conditions, active oncology treatments, missing critical medications (e.g. insulin, inhalers), or emergencies.\n- **Medium**: Post-operative care assistance, scheduled physical therapy transport, or mental support groups.\n- **Low**: General health inquiries, non-time-critical supplies, or routine health education.",
    quickReplies: [
      { text: 'How does it process?', payload: 'process_info' }
    ]
  },
  {
    id: 'privacy_info',
    triggers: ['is my data safe', 'privacy policy', 'confidentiality', 'hipaa', 'gdpr', 'secure data'],
    keywords: ['safe', 'privacy', 'confidentiality', 'secure', 'hipaa', 'gdpr', 'data', 'information'],
    response: "We take patient confidentiality very seriously. All patient data is encrypted and stored securely. We only share contact information with the specific volunteer matched to your request after receiving your consent. We never sell or share patient information for commercial purposes.",
    quickReplies: [
      { text: 'How does it process?', payload: 'process_info' }
    ]
  },
  {
    id: 'contact_info',
    triggers: ['contact info', 'phone number', 'email address', 'where are you located', 'office hours'],
    keywords: ['contact', 'phone', 'email', 'location', 'address', 'office', 'number', 'hours'],
    response: "You can reach the HealthBridge NGO Headquarters at:\n- **Phone**: +1 (800) 555-BRIDGE (274-3433)\n- **Email**: support@healthbridge-ngo.org\n- **Address**: 450 Healing Way, Suite 100, Metro City, NY 10001\n- **Hours**: Monday to Friday, 8:00 AM - 6:00 PM EST (Emergency lines open 24/7).",
    quickReplies: [
      { text: 'Send a message', payload: 'send_message_direct' }
    ]
  },
  {
    id: 'send_message_direct',
    triggers: ['send a message direct', 'write to you', 'contact form'],
    keywords: ['message', 'contact', 'write', 'form', 'send'],
    response: "To send a direct query, scroll down to the **'Contact Us'** section at the bottom of our homepage. Enter your name, email, and message, and our admin team will reply to you within 24 hours.",
    quickReplies: [
      { text: 'What services do you offer?', payload: 'services_info' }
    ]
  },
  {
    id: 'thanks',
    triggers: ['thank you', 'thanks', 'ty', 'appreciate it', 'great help', 'awesome'],
    keywords: ['thank', 'thanks', 'appreciate', 'helpful', 'great', 'awesome'],
    response: "You're very welcome! Helping our community is our core mission. Let me know if you need any other information, and have a wonderful day!",
    quickReplies: [
      { text: 'Main Menu', payload: 'hello' }
    ]
  }
];

export const getChatbotResponse = (userInput) => {
  if (!userInput) return null;
  const inputClean = userInput.toLowerCase().replace(/[^\w\s]/g, ' ').trim();
  const inputWords = inputClean.split(/\s+/).filter(w => w.length > 1);

  if (inputWords.length === 0) {
    return {
      response: "I didn't quite catch that. Could you please rephrase your question or select one of the topics below?",
      quickReplies: [
        { text: 'How do I request support?', payload: 'request_support' },
        { text: 'How do I volunteer?', payload: 'become_volunteer' },
        { text: 'What kind of help is available?', payload: 'services_info' }
      ]
    };
  }

  let bestMatch = null;
  let highestScore = 0;

  CHATBOT_RESPONSES.forEach(item => {
    let score = 0;

    // Check triggers first (exact or partial phrases)
    item.triggers.forEach(trigger => {
      if (inputClean.includes(trigger)) {
        score += 15; // Heavy weight for matching standard query phrases
      }
    });

    // Check individual keyword matches
    item.keywords.forEach(keyword => {
      if (inputWords.includes(keyword)) {
        score += 5;
      } else if (inputClean.includes(keyword)) {
        score += 2;
      }
    });

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  });

  // Threshold check
  if (highestScore >= 3) {
    return bestMatch;
  }

  // Fallback response
  return {
    response: "I'm sorry, I'm still learning and I couldn't find a direct answer to that. You can ask me about requesting support, how to volunteer, types of aid we offer, or the NGO process. Or, pick one of the options below:",
    quickReplies: [
      { text: 'How do I request support?', payload: 'request_support' },
      { text: 'How do I volunteer?', payload: 'become_volunteer' },
      { text: 'What services do you offer?', payload: 'services_info' },
      { text: 'Contact details', payload: 'contact_info' }
    ]
  };
};

export const getResponseByPayload = (payload) => {
  const match = CHATBOT_RESPONSES.find(item => item.id === payload);
  if (match) return match;
  
  // Custom actions
  if (payload === 'hello') {
    return CHATBOT_RESPONSES.find(item => item.id === 'hello');
  }
  
  return {
    response: "I'm processing your request...",
    quickReplies: [{ text: 'Back to Menu', payload: 'hello' }]
  };
};
