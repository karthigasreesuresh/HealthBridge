/**
 * Smart Support Assistant Form Classifier
 * Analyzes patient requests to generate structured summaries.
 */

export const classifyRequest = (age, description, selectedSupportType) => {
  const ageNum = parseInt(age, 10);
  const text = (description || '').toLowerCase();
  
  // 1. Determine Age Group
  let ageGroup = 'Adult (18-64)';
  if (isNaN(ageNum)) {
    ageGroup = 'Unknown';
  } else if (ageNum <= 12) {
    ageGroup = 'Pediatric (0-12)';
  } else if (ageNum <= 17) {
    ageGroup = 'Teen (13-17)';
  } else if (ageNum >= 65) {
    ageGroup = 'Senior/Geriatric (65+)';
  }

  // 2. Classify/Verify Support Type (uses form selection, but validates against text keywords)
  let supportType = selectedSupportType || 'General Assistance';
  
  const keywords = {
    'Medical Supplies': ['nebulizer', 'oxygen', 'wheelchair', 'crutches', 'insulin', 'meds', 'medicine', 'prescription', 'supplies', 'device', 'gauge', 'strip', 'inhaler', 'mask'],
    'Logistics & Transport': ['drive', 'ride', 'transport', 'pickup', 'drop', 'travel', 'appointment', 'clinic', 'chemo', 'dialysis', 'hospital visit', 'bus', 'car', 'ambulance'],
    'Psychological Support': ['depressed', 'anxiety', 'counseling', 'therapist', 'mental', 'lonely', 'suicidal', 'emotional', 'postpartum', 'support group', 'trauma', 'grief', 'psychologist'],
    'Financial Aid': ['bills', 'cost', 'afford', 'financial', 'money', 'expensive', 'insurance', 'co-pay', 'rent', 'payment', 'voucher', 'fund', 'charity'],
    'Food & Nutrition': ['food', 'meals', 'groceries', 'eat', 'hungry', 'diet', 'nutrition', 'pantry', 'soup kitchen']
  };

  // If no support type is selected, or we want to double check, do keyword mapping
  if (supportType === 'Other' || !selectedSupportType) {
    let bestType = 'General Assistance';
    let maxMatches = 0;
    
    Object.entries(keywords).forEach(([type, words]) => {
      const matches = words.filter(word => text.includes(word)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        bestType = type;
      }
    });
    
    supportType = bestType;
  }

  // 3. Priority Level Determination
  let priorityLevel = 'Low';
  
  const highPriorityKeywords = [
    'urgent', 'emergency', 'severe', 'critical', 'bleeding', 'cancer', 'chemo', 'dialysis',
    'suicide', 'suicidal', 'depression', 'broken', 'accident', 'dying', 'breathe', 'breathing',
    'asthma', 'heart', 'stroke', 'diabetic', 'insulin', 'immediate', 'pain', 'severe pain',
    '4-day', 'out of', 'run out', 'danger', 'respiratory'
  ];
  
  const mediumPriorityKeywords = [
    'need help', 'schedule', 'appointment', 'unable', 'difficulty', 'support group',
    'post-surgery', 'recovering', 'elderly', 'child', 'son', 'daughter', 'mother', 'father'
  ];

  const highMatches = highPriorityKeywords.filter(word => text.includes(word)).length;
  const mediumMatches = mediumPriorityKeywords.filter(word => text.includes(word)).length;

  if (highMatches >= 1 || (supportType === 'Medical Supplies' && text.includes('emergency')) || text.includes('immediate')) {
    priorityLevel = 'High';
  } else if (mediumMatches >= 1 || highMatches > 0 || ageGroup.includes('Senior') || ageGroup.includes('Pediatric')) {
    priorityLevel = 'Medium';
  }

  // 4. Extract Key Requirement
  let keyRequirement = '';
  // Try to grab the first sentence, or clean it up
  const sentences = description.split(/[.!?]/).map(s => s.trim()).filter(s => s.length > 0);
  if (sentences.length > 0) {
    // Look for phrases like "I need...", "looking for...", "requires..."
    const needSentence = sentences.find(s => 
      s.toLowerCase().includes('need') || 
      s.toLowerCase().includes('require') || 
      s.toLowerCase().includes('want') || 
      s.toLowerCase().includes('looking for')
    );
    keyRequirement = needSentence || sentences[0];
  } else {
    keyRequirement = 'General patient care coordination';
  }
  
  // Truncate keyRequirement if it is too long
  if (keyRequirement.length > 80) {
    keyRequirement = keyRequirement.substring(0, 77) + '...';
  }

  // 5. Formulate Suggested Action
  let suggestedAction = 'Schedule phone assessment to detail patient constraints.';
  
  if (supportType === 'Medical Supplies') {
    if (priorityLevel === 'High') {
      suggestedAction = 'Match with equipment inventory immediately; dispatch courier within 12 hours.';
    } else {
      suggestedAction = 'Verify medical prescription & size/specifications; match with available donor stock.';
    }
  } else if (supportType === 'Logistics & Transport') {
    if (priorityLevel === 'High') {
      suggestedAction = 'Coordinate emergency transport volunteer with first-aid training. Set up recurring calendar booking.';
    } else {
      suggestedAction = 'Search volunteer database for active drivers within a 15-mile radius of the patient location.';
    }
  } else if (supportType === 'Psychological Support') {
    suggestedAction = 'Connect with licensed telehealth counseling volunteers; offer free anxiety/depression online circle.';
  } else if (supportType === 'Financial Aid') {
    suggestedAction = 'Route to financial screening manager; cross-reference local pharmaceutical co-pay discount databases.';
  } else if (supportType === 'Food & Nutrition') {
    suggestedAction = 'Schedule grocery bundle home delivery; provide locations of local partner community kitchens.';
  } else {
    suggestedAction = 'Contact patient to gather specific support requirements and perform medical intake.';
  }

  return {
    ageGroup,
    supportType,
    priorityLevel,
    keyRequirement,
    suggestedAction
  };
};
