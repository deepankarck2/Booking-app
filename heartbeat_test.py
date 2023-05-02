from selenium import webdriver
from selenium.common.exceptions import TimeoutException, WebDriverException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

try:
    # Create a new instance of the Firefox driver
    driver = webdriver.Edge()

    # Open the website in the browser
    driver.get("http://localhost:3000/")

    # Wait for the page to load
    WebDriverWait(driver, 20).until(EC.title_contains("React App"))

    # If the element is found, print a success message
    print("Website loaded successfully!")

except TimeoutException:
    # If the page doesn't load within 10 seconds, print an error message
    print("Timed out waiting for page to load")

except WebDriverException:
    # If the website fails to load, print an error message
    print("Failed to load website")

finally:
    # Quit the driver
    driver.quit()

