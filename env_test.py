from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

TEST_USERNAME = os.getenv('TEST_USERNAME')
TEST_PASSWORD = os.getenv('TEST_PASSWORD')