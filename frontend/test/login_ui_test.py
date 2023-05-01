import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager

class LoginUITest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome(executable_path=ChromeDriverManager().install())
        self.driver.get("http://localhost:3000/login")

    def test_login_form(self):
        driver = self.driver

        email_input = driver.find_element(By.ID,"login-email")
        password_input = driver.find_element(By.ID, "login-password")

        email_input.send_keys("testuserr8@email.com")
        password_input.send_keys("testuserr8")

        submit_button = driver.find_element(By.ID, "login-submit")
        submit_button.click()

        WebDriverWait(driver, 10).until(
            EC.url_contains("/dashboard")
        )
        current_url = driver.current_url
        self.assertTrue("dashboard" or "login" in current_url)

    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
