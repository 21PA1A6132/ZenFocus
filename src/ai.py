import json
import google.generativeai as genai

# Step 2: Configure the Gemini AI API with your API key
genai.configure(api_key="AIzaSyBAJ2p2QFtH3fWb8PufBGQvKfLD45uMaKs")



class UserThresholdSetter:
    def __init__(self):
        self.model =  genai.GenerativeModel("gemini-1.5-flash")  # Initialize the Gemini AI model

        # Step 1: Define thresholds for different categories
        self.categories = {
            "Shopping": {"max_time": None},  # in minutes
            "Education": {"max_time": None},
            "Social Media": {"max_time":None},
            "Coding/Development": {"max_time": None},
            "News": {"max_time": None},
            "Entertainment": {"max_time": None},
            "Work/Productivity": {"max_time": None},
            "Gaming": {"max_time": None},
            "Video Streaming": {"max_time": None},
            "Health & Fitness": {"max_time": None},
            "Unknown": {"max_time": None},
        }

    def set_thresholds(self, user_responses):
        """
        Set app usage thresholds based on user responses.

        Parameters:
            user_responses (dict): The user's responses.

        Returns:
            dict: A dictionary with the categories and their thresholds.
        """
        # Step 3: Extract relevant information from user responses
        screen_time = user_responses.get("screenTime", "4-6")
        primary_goal = user_responses.get("primaryGoal to install our app", "")

        # Step 4: Set thresholds based on screen time and goals
        screen_time_range = self._parse_screen_time(screen_time)

        # Set thresholds based on the screen time range
        if screen_time_range:
            for category in self.categories.keys():
                if category in ["Coding/Development", "Education"]:
                    self.categories[category]["max_time"] = screen_time_range[1] / 2  # E.g., half of max screen time
                elif category in ["Entertainment", "Shopping"]:
                    self.categories[category]["max_time"] = screen_time_range[1] * 0.3  # 30% of max screen time
                else:  # Distracting apps (Social Media, Gaming)
                    self.categories[category]["max_time"] = screen_time_range[1] * 0.2  # 20% of max screen time

        return self.categories
    
    def _parse_screen_time(self, screen_time):
        """
        Parse the screen time range string and return minimum and maximum values.
        
        Parameters:
            screen_time (str): The screen time range (e.g., "4-6").
        
        Returns:
            tuple: A tuple containing the minimum and maximum screen time in minutes.
        """
        try:
            min_time, max_time = map(int, screen_time.split('-'))
            return (min_time * 60, max_time * 60)  # Convert to minutes
        except ValueError:
            return None  # Return None if parsing fails
        
    # Load onboarding data
    def load_onboarding_data(file_path):
        with open(file_path, 'r') as file:
            return json.load(file)


if __name__ == "__main__":
    with open('onboardingData.json', 'r') as file:
        user_data = json.load(file)

    onboarding_file = 'onboardingData.json'
    threshold_setter = UserThresholdSetter()
    user_thresholds = threshold_setter.set_thresholds(user_data)

    print(f"User App Usage Thresholds: {user_thresholds}")