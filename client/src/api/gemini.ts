import { GoogleGenerativeAI } from "@google/generative-ai";
export async function getNutriPlan(purchasedProducts: any[]) {
  const GEMINI_API_KEY = "AIzaSyCXDBYAExCmIh6tVwkXj5YbdoskcLxQ9ac"; //process.env.GEMINI_API_KEY; 

  if (!GEMINI_API_KEY) {
    throw new Error("❌ Missing Gemini API key! Please add it to your .env file.");
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const profileData = JSON.parse(localStorage.getItem("profileData") || "{}");

  const prompt = `
    You are an AI Grocery Shopping List Agent that assists users in creating efficient and tailored grocery shopping lists. 
    Your primary goal is to help users plan their shopping by generating lists based on preferences, dietary needs, and seasonal availability. 
    Your role is to facilitate a seamless shopping experience that saves time and resources while ensuring healthy and enjoyable meals for the user.
    You provide nutritional information for purchased items, and suggest recipes to make the best use of the shopping list from the following purchased products: 

    ${JSON.stringify(purchasedProducts, null, 2)}

    Analyze this data and generate:
    - The key nutrient deficiencies they have. 
    - Formatted grocery list to make diet more balanced in a way that is easy to copy and paste, organized by common grocery store sections for an efficient shopping experience.
    - Balanced meal ideas using the new grocery items.

    Start by saying that you are analyzing the inventory data, dietary restrictions/allergens from profile data. 
    The user has provided the following details:

    Age: ${profileData.age || "Not specified"}
    Height: ${profileData.height || "Not specified"}
    Weight: ${profileData.weight || "Not specified"}
    Sex: ${profileData.sex || "Not specified"}
    Dietary Restriction: ${profileData.dietaryRestriction || "None"}
    Allergies: ${profileData.allergies?.length ? profileData.allergies.join(", ") : "None"}

    Example Nutrient Deficiencies Formatting:
    1. Protein: Bananas and almond milk are relatively low in protein. 
    2. Healthy Fats: While almond milk contains some healthy fats, the overall fat intake from these two items alone is insufficient. 
    3. Iron: Bananas are a poor source of iron. 
    4. Fiber: Although bananas provide some fiber, more variety is needed for optimal fiber intake. 
    5. Vitamins and Minerals: Many vitamins and minerals are lacking, including Vitamin D, Vitamin B12, Calcium, and various others.

    Example Grocery List Formatting:
    1. Produce: Apples, spinach, onions, garlic
    2. Meat and Seafood: Chicken breast, ground beef (included/not included based on dietary restrictions)
    3. Dairy: Eggs, shredded cheese, heavy cream (included/not included based on dietary restrictions)
    4. Pantry: Olive oil, almond flour, spices (paprika, cumin)
    5. Frozen: Frozen cauliflower rice, frozen broccoli
    6. Miscellaneous: Baking parchment, ziplock bags

    Example Balanced Meal Ideas Formatting:
    1. Quinoa Salad with Chicken and Veggies
      Cooked quinoa as a base.
      Grilled or pan-fried chicken breast (cubed).
      Chopped bell peppers, spinach, and broccoli.
      Dressing: Olive oil, lime juice, cumin, salt, and pepper.
    2. Salmon with Roasted Vegetables
      Baked salmon fillet seasoned with salt, pepper, and lemon.
      Roasted broccoli and bell peppers tossed with olive oil, salt, and pepper.

    Keep it concise and easy to read. 
    **Format the response clean:**  
    - Convert *bold text* to <strong>bold text</strong>  
    - Convert list items (* item) into proper <ol><li>item</li></ol> format  
    - Ensure there is at least 1 line breaks between deficiencies, grocery list, and meal ideas sections
    - Ensure spacing is correct and consistent
  `;

  try {
    console.log("Sending request to Google Gemini...");

    const result = await model.generateContent(prompt);
    // const response = result.response.text();
    let response = result.response.text();

    // response = response.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    // response = response.replace(/\n\* (.*?)/g, "\n<li>$1</li>");
    // response = response.replace(/(<li>.*?<\/li>)+/gs, "<ul>$&</ul>");
    // response = response.replace(/\n{2,}/g, "<br/>");

    response = response.replace(/\*(.*?)\*\*/g, "<strong>$1</strong>");
    response = response.replace(/\n\* (.*?)/g, "\n<li>$1</li>");
    response = response.replace(/(<li>.*?<\/li>)+/gs, "<ul>$&</ul>");
    response = response.replace(/\n{2,}/g, "<br/>");

    console.log("Gemini API Response:", response);

    return response.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to fetch NutriPlan. Please try again later.");
  }
}
