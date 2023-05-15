import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from credentials import email, password

class LoginAndAddHouseTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome(executable_path=ChromeDriverManager().install())
        self.driver.get("http://localhost:3000/login")
        self.wait = WebDriverWait(self.driver, 10)

    def test_login_and_add_house(self):
        driver = self.driver

        # Login
        email_input = driver.find_element(By.ID,"login-email")
        password_input = driver.find_element(By.ID, "login-password")

        email_input.send_keys(email)
        password_input.send_keys(password)

        submit_button = driver.find_element(By.ID, "login-submit")
        submit_button.click()

        self.wait.until(EC.url_contains("/dashboard"))

        # Go to Add House page
        driver.get("http://localhost:3000/add-house")

        # Wait for elements to become available
        self.wait.until(EC.presence_of_element_located((By.ID, "name")))
        self.wait.until(EC.presence_of_element_located((By.ID, "address")))

        # Fill the form and submit
        name_input = driver.find_element(By.ID, "name")
        address_input = driver.find_element(By.ID, "address")
        description_input = driver.find_element(By.ID, "description")
        images_input = driver.find_element(By.ID, "images")
        maxPeople_input = driver.find_element(By.ID, "maxPeople")
        amenities_input = driver.find_element(By.ID, "amenities")
        availableDate_input = driver.find_element(By.XPATH, "//input[@type='date']")
        price_input = driver.find_element(By.ID, "price-input")

        name_input.send_keys("Test House")
        address_input.send_keys("123 Test Street, Test City")
        description_input.send_keys("This is a test house.")
        images_input.send_keys("https://img.freepik.com/free-vector/sticker-template-with-mini-house-isolated_1308-60687.jpg")
        maxPeople_input.send_keys("4")
        amenities_input.send_keys("WiFi")
        availableDate_input.send_keys("2023-01-01") # Date format should be YYYY-MM-DD
        price_input.send_keys("100")

        submit_button = driver.find_element(By.ID, "addHouse-submit")
        submit_button.click()

        self.wait.until(EC.url_contains("/dashboard"))

        current_url = driver.current_url
        self.assertTrue("dashboard" in current_url)

    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
