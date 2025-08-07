import axios from 'axios';

// OpenAI API service to handle all AI-related operations
class OpenAIService {
  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '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';
    this.baseURL = 'https://api.openai.com/v1';
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      }
    });
  }

  // Generate a vehicle recommendation based on user preferences
  async getVehicleRecommendation(preferences) {
    try {
      console.log('Generating vehicle recommendation for preferences:', preferences);
      const systemPrompt = `You are an expert automotive advisor at Premier Auto Halifax. Your task is to recommend the best vehicle based on the customer's preferences. Provide a detailed explanation of why this vehicle is a good match, including specific features that align with their needs. Include make, model, year, and approximate price range. Ensure recommendations are realistic and available in the Canadian market, particularly in Halifax, Nova Scotia.`;
      
      const userPrompt = `Based on these preferences:
- Budget: ${preferences.budget || 'Not specified'}
- Primary use: ${preferences.primaryUse || 'Not specified'}
- Passengers: ${preferences.passengers || 'Not specified'}
- Must-have features: ${preferences.features?.join(',') || 'Not specified'}
- Fuel preference: ${preferences.fuelType || 'Not specified'}
- Body style preference: ${preferences.bodyStyle || 'Not specified'}

What vehicle would you recommend for me? Please explain your recommendation.`;
      
      const response = await this.client.post('/chat/completions', {
        model: "gpt-4o",
        messages: [
          {role: "system", content: systemPrompt},
          {role: "user", content: userPrompt}
        ],
        temperature: 0.7,
        max_tokens: 500
      });
      
      return {
        recommendation: response.data.choices[0].message.content,
        error: null
      };
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return {
        recommendation: null,
        error: error.response?.data?.error?.message || 'Failed to generate recommendation'
      };
    }
  }

  // Generate a personalized vehicle description
  async generateVehicleDescription(vehicleDetails) {
    try {
      console.log('Generating vehicle description for:', vehicleDetails);
      const systemPrompt = `You are a professional automotive copywriter for Premier Auto Halifax dealership. Create an engaging, detailed, and persuasive vehicle description that highlights the key features, benefits, and selling points. Use a friendly, professional tone that would appeal to potential car buyers in Halifax, Nova Scotia. Focus on creating vivid imagery and emotional connection while maintaining accuracy.`;
      
      const userPrompt = `Write a compelling description for this vehicle:
- ${vehicleDetails.year} ${vehicleDetails.make} ${vehicleDetails.model}
- Condition: ${vehicleDetails.condition}
- Mileage: ${vehicleDetails.mileage} miles
- Key features: ${vehicleDetails.features?.join(',')}
- Color: ${vehicleDetails.exteriorColor} exterior, ${vehicleDetails.interiorColor} interior
- Engine: ${vehicleDetails.engine}
- Transmission: ${vehicleDetails.transmission}
- Drivetrain: ${vehicleDetails.drivetrain}
- Fuel economy: ${vehicleDetails.combinedMPG} MPG combined

The description should be about 150-200 words and highlight why this is a great vehicle choice.`;
      
      const response = await this.client.post('/chat/completions', {
        model: "gpt-4o",
        messages: [
          {role: "system", content: systemPrompt},
          {role: "user", content: userPrompt}
        ],
        temperature: 0.7,
        max_tokens: 300
      });
      
      return {
        description: response.data.choices[0].message.content,
        error: null
      };
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return {
        description: null,
        error: error.response?.data?.error?.message || 'Failed to generate description'
      };
    }
  }

  // Answer customer questions about a specific vehicle
  async answerVehicleQuestion(vehicleDetails, question) {
    try {
      console.log('Answering question about vehicle:', vehicleDetails);
      const systemPrompt = `You are a knowledgeable automotive sales advisor at Premier Auto Halifax dealership. You have deep knowledge about all vehicles in the inventory and can provide accurate, helpful answers to customer questions. Be friendly, professional, and concise while providing detailed information. If you don't know something specific, suggest contacting the dealership for more details rather than making up information. Focus on being helpful and accurate.`;
      
      const userPrompt = `Vehicle: ${vehicleDetails.year} ${vehicleDetails.make} ${vehicleDetails.model}
Details: ${vehicleDetails.condition} condition, ${vehicleDetails.mileage} miles, ${vehicleDetails.exteriorColor} exterior
Features: ${vehicleDetails.features?.join(',')}

Customer question: "${question}"

Please provide a helpful answer to this question about the vehicle.`;
      
      const response = await this.client.post('/chat/completions', {
        model: "gpt-4o",
        messages: [
          {role: "system", content: systemPrompt},
          {role: "user", content: userPrompt}
        ],
        temperature: 0.7,
        max_tokens: 250
      });
      
      return {
        answer: response.data.choices[0].message.content,
        error: null
      };
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return {
        answer: null,
        error: error.response?.data?.error?.message || 'Failed to answer question'
      };
    }
  }

  // Generate financing options based on vehicle and customer info
  async generateFinancingOptions(vehiclePrice, customerInfo) {
    try {
      console.log('Generating financing options for vehicle price:', vehiclePrice);
      const systemPrompt = `You are a financial advisor at Premier Auto Halifax specializing in auto loans. Provide realistic financing scenarios based on the vehicle price and customer information. Include monthly payment estimates, interest rates, loan terms, and down payment recommendations. Be accurate, helpful, and focus on providing options that would be realistic in Halifax, Nova Scotia, Canada. Present the information in a clear, structured format that's easy to understand.`;
      
      const userPrompt = `Vehicle price: $${vehiclePrice}
Customer information:
- Credit score range: ${customerInfo.creditScore || 'Not provided'}
- Down payment available: $${customerInfo.downPayment || 0}
- Preferred loan term: ${customerInfo.loanTerm || 'Not specified'} months
- Annual income: $${customerInfo.income || 'Not provided'}

Please provide 3 realistic financing options with monthly payments, interest rates, and terms. Include one conservative option, one balanced option, and one option that minimizes the monthly payment.`;
      
      const response = await this.client.post('/chat/completions', {
        model: "gpt-4o",
        messages: [
          {role: "system", content: systemPrompt},
          {role: "user", content: userPrompt}
        ],
        temperature: 0.7,
        max_tokens: 600
      });
      
      return {
        options: response.data.choices[0].message.content,
        error: null
      };
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return {
        options: null,
        error: error.response?.data?.error?.message || 'Failed to generate financing options'
      };
    }
  }

  // Generate trade-in value estimate
  async estimateTradeInValue(vehicleInfo) {
    try {
      console.log('Estimating trade-in value for vehicle:', vehicleInfo);
      const systemPrompt = `You are an experienced vehicle appraiser at Premier Auto Halifax with deep knowledge of the used car market in Nova Scotia. Provide a realistic trade-in value estimate range based on the vehicle information provided. Consider market trends, vehicle condition, mileage, features, and local factors. Explain your reasoning for the estimate. Be realistic and provide ranges rather than specific values. All values should be in Canadian dollars (CAD).`;
      
      const userPrompt = `Please estimate the trade-in value for this vehicle:
- Make: ${vehicleInfo.make}
- Model: ${vehicleInfo.model}
- Year: ${vehicleInfo.year}
- Mileage: ${vehicleInfo.mileage} km
- Condition: ${vehicleInfo.condition}
- Accident history: ${vehicleInfo.accidents || 'Not specified'}
- Features: ${vehicleInfo.features || 'Standard features'}
- Location: Halifax, Nova Scotia

Provide a realistic trade-in value range and explain your reasoning. Include any factors that significantly impact the value and what the owner might do to potentially increase the value.`;
      
      const response = await this.client.post('/chat/completions', {
        model: "gpt-4o",
        messages: [
          {role: "system", content: systemPrompt},
          {role: "user", content: userPrompt}
        ],
        temperature: 0.7,
        max_tokens: 500
      });
      
      return {
        estimate: response.data.choices[0].message.content,
        error: null
      };
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return {
        estimate: null,
        error: error.response?.data?.error?.message || 'Failed to estimate trade-in value'
      };
    }
  }

  // Match vehicles from inventory based on natural language description
  async matchVehiclesFromInventory(userDescription, availableVehicles) {
    try {
      console.log('Matching vehicles based on description:', userDescription);
      
      // Prepare vehicle inventory data in a compact format for the prompt
      const inventoryData = availableVehicles.map(v => ({
        id: v.id,
        make: v.make,
        model: v.model,
        year: v.year,
        price: v.price,
        condition: v.condition,
        mileage: v.mileage,
        fuelType: v.fuelType,
        transmission: v.transmission,
        drivetrain: v.drivetrain,
        engine: v.engine,
        features: v.features?.slice(0, 5) || [],
        bodyType: v.model.toLowerCase().includes('truck') ? 'Truck' : 
                 v.model.toLowerCase().includes('suv') ? 'SUV' : 'Sedan'
      }));
      
      const systemPrompt = `You are an AI vehicle matching assistant at Premier Auto Halifax. Your task is to match the customer's requirements with vehicles from our inventory. 

1. Analyze the customer's description to identify key preferences (price range, vehicle type, features, etc.)
2. Find the best matches from our inventory data
3. Provide a list of the top 3 vehicle matches with their IDs
4. Provide a brief rationale explaining why these vehicles match the customer's needs

Be accurate and helpful. Only suggest vehicles that are good matches for the customer's needs.`;
      
      const userPrompt = `Customer description: "${userDescription}"

Available inventory (JSON format):
${JSON.stringify(inventoryData)}

Please provide:
1. A list of the top 3 vehicle matches with their IDs
2. A brief explanation of why these vehicles match the customer's needs`;
      
      const response = await this.client.post('/chat/completions', {
        model: "gpt-4o",
        messages: [
          {role: "system", content: systemPrompt},
          {role: "user", content: userPrompt}
        ],
        temperature: 0.7,
        max_tokens: 1000
      });
      
      const aiResponse = response.data.choices[0].message.content;
      
      // Parse the response to extract vehicle IDs
      const idRegex = /\b(\d+)\b/g;
      const matchedIds = [...new Set([...aiResponse.matchAll(idRegex)].map(match => parseInt(match[0])))];
      
      // Find the actual vehicle objects
      const matchedVehicles = matchedIds
        .map(id => availableVehicles.find(v => v.id === id))
        .filter(Boolean);
      
      // Extract rationale (everything after the vehicle IDs)
      const rationale = aiResponse.split(/\d+\./).pop()?.trim() || 
        "These vehicles best match your requirements based on price, features, and specifications.";
      
      return {
        matches: matchedVehicles.slice(0, 3),
        rationale,
        error: null
      };
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return {
        matches: [],
        rationale: null,
        error: error.response?.data?.error?.message || 'Failed to match vehicles from inventory'
      };
    }
  }

  // Compare multiple vehicles
  async compareVehicles(vehiclesToCompare) {
    try {
      console.log('Comparing vehicles:', vehiclesToCompare);
      
      // Prepare vehicle data in a compact format for the prompt
      const vehiclesData = vehiclesToCompare.map(v => ({
        make: v.make,
        model: v.model,
        year: v.year,
        price: v.price,
        condition: v.condition,
        mileage: v.mileage,
        fuelType: v.fuelType,
        transmission: v.transmission,
        drivetrain: v.drivetrain,
        engine: v.engine,
        mpg: v.combinedMPG,
        features: v.features?.slice(0, 10) || [],
      }));
      
      const systemPrompt = `You are an automotive comparison expert at Premier Auto Halifax. Your task is to provide a detailed, unbiased comparison of the vehicles provided. Focus on:

1. Key differences in specifications and features
2. Value for money assessment
3. Pros and cons of each vehicle
4. Which types of buyers each vehicle might be best suited for

Be objective and thorough. Present the information in a clear, structured format that's easy to understand. Use bullet points where appropriate. Don't be overly verbose - focus on the most important comparison points.`;
      
      const userPrompt = `Please compare these vehicles:
${JSON.stringify(vehiclesData, null, 2)}

Provide a comprehensive comparison focusing on the key differences, value proposition, and which type of buyer each vehicle might be best suited for.`;
      
      const response = await this.client.post('/chat/completions', {
        model: "gpt-4o",
        messages: [
          {role: "system", content: systemPrompt},
          {role: "user", content: userPrompt}
        ],
        temperature: 0.7,
        max_tokens: 1000
      });
      
      return {
        comparison: response.data.choices[0].message.content,
        error: null
      };
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return {
        comparison: null,
        error: error.response?.data?.error?.message || 'Failed to generate vehicle comparison'
      };
    }
  }

  // Explain car features
  async explainCarFeature(featureName) {
    try {
      console.log('Explaining car feature:', featureName);
      const systemPrompt = `You are an automotive technology expert at Premier Auto Halifax. Your task is to explain car features and technologies in simple, easy-to-understand terms. Your explanations should be:

1. Concise (about 150 words maximum)
2. Free of technical jargon where possible
3. Focused on the benefits to the driver/owner
4. Accurate and educational

If the feature is a comparison (e.g., "AWD vs 4WD"), provide a clear comparison of both options.`;
      
      const userPrompt = `Please explain this car feature or technology in simple terms: "${featureName}"

Focus on what it does, how it benefits the driver, and why it might be important when considering a vehicle purchase.`;
      
      const response = await this.client.post('/chat/completions', {
        model: "gpt-4o",
        messages: [
          {role: "system", content: systemPrompt},
          {role: "user", content: userPrompt}
        ],
        temperature: 0.7,
        max_tokens: 300
      });
      
      return {
        explanation: response.data.choices[0].message.content,
        error: null
      };
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return {
        explanation: null,
        error: error.response?.data?.error?.message || 'Failed to explain car feature'
      };
    }
  }

  // Get AI-powered ownership cost analysis
  async getOwnershipCost(details) {
    try {
      console.log('Generating ownership cost analysis for:', details);
      const systemPrompt = `You are an expert automotive cost analyst for Premier Auto Halifax. Your task is to provide a detailed 5-year ownership cost analysis for a given vehicle. The analysis should be broken down into the following components:

1.  **Depreciation**: The estimated loss in value over 5 years.
2.  **Fuel**: Estimated cost based on mileage, driving style, and location. Assume current average fuel prices for the location.
3.  **Insurance**: A realistic estimated annual insurance cost based on the vehicle and location.
4.  **Maintenance**: Estimated routine maintenance costs (oil changes, tire rotations, etc.).
5.  **Repairs**: Estimated cost for potential common repairs for this type of vehicle.

Provide the output in a structured JSON format. All values should be in Canadian Dollars (CAD). Be realistic and use current market data for Halifax, Nova Scotia, where applicable.`;

      const userPrompt = `Please provide a 5-year ownership cost analysis for the following vehicle:
- Vehicle: ${details.vehicle}
- Estimated Annual Mileage: ${details.annualMileage} miles
- Primary Driving Style: ${details.drivingStyle}
- Location: ${details.location}

Return the data in the following JSON format:
{
  "vehicle": "${details.vehicle}",
  "totalCost": "CAD $XX,XXX",
  "depreciation": "CAD $XX,XXX",
  "fuel": "CAD $X,XXX",
  "insurance": "CAD $X,XXX",
  "maintenance": "CAD $X,XXX",
  "repairs": "CAD $X,XXX"
}`;

      const response = await this.client.post('/chat/completions', {
        model: "gpt-4o",
        messages: [
          {role: "system", content: systemPrompt},
          {role: "user", content: userPrompt}
        ],
        temperature: 0.7,
        max_tokens: 500,
        response_format: { type: "json_object" }
      });

      const costAnalysis = JSON.parse(response.data.choices[0].message.content);

      return {
        costAnalysis,
        error: null
      };
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return {
        costAnalysis: null,
        error: error.response?.data?.error?.message || 'Failed to generate ownership cost analysis'
      };
    }
  }
}

// Export singleton instance
export const openaiService = new OpenAIService();
export default openaiService;